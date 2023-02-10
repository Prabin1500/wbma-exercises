import React, { useContext, useEffect, useRef, useState } from 'react';
import {Text, Card, ListItem} from '@rneui/themed';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';
import { Modal, ScrollView } from 'react-native';
import { Icon } from '@rneui/base';
import { useFavourite, useUser } from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Image} from '@rneui/base';
import { MainContext } from '../contexts/MainContext';

const Single = ({route}) => {
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id : userId,
    media_type : type,
    screenshot,
    file_id: fileId,
    filesize,
  } = route.params;

  const video = useRef(null);
  const [owner, setOwner] = useState({});
  const {getUserById} = useUser();
  const {user} = useContext(MainContext);
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} = useFavourite();

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(userId, token);
    console.log(owner.full_name)
    setOwner(owner);
  };

  const getLikes = async() => {
    const likes = await getFavouritesByFileId(fileId)
    setLikes(likes);

    for (const like of likes) {
      if (like.user_id === user.user_id) {
        setUserLike(true);
        break;
      }
    }
  };

  const likeFile = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(fileId, token);
      setUserLike(true)
      getLikes();
    } catch (error) {
      console.error(error);
    }

  };

  const dislikeFile = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(fileId, token);
      setUserLike(false);
      getLikes();
    } catch (error) {
      console.error(error);
    }

  };

  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error('unlock', error.message);
    }
  };

  const lock = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      console.error('lock', error.message);
    }
  };

  useEffect(() => {
    getOwnerInfo();
    getLikes();
    unlock();

    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('orientation', evt);
      if (evt.orientationInfo.orientation > 2) {
        // show video in fullscreen
        if (video.current) showVideoInFullScreen();
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lock();
    };
  }, []);

  const showVideoInFullScreen = async () => {
    try {
      if (video) await video.presentFullscreenPlayer();
    } catch (error) {
      console.error('showVideoInFullScreen', error.message);
    }
  };

  return (
    <>
      <ScrollView>
        <Card>
          <Card.Title>{title}</Card.Title>
          <Card.Divider />
          {type === 'image' ? (
            <Card.Image
              onPress={() => setModalVisible(true)}
              source={{uri: uploadsUrl + filename}} />
          ): (
            <Video
              ref={video}
              source={{uri: uploadsUrl + filename}}
              style={{width:'100%', height:200}}
              useNativeControls
              resizeMode="contain"
              onError={(error) => {
                console.log(error);
              }}
              isLooping
              usePoster
              posterSource={{uri: uploadsUrl + screenshot}}
            />
        )}

          <Card.Divider />
          {description && (
            <ListItem onPress={showVideoInFullScreen}>
            <Text>{description}</Text>
          </ListItem>
          )}

          <ListItem>
            <Icon name="schedule" />
            <Text>{new Date(timeAdded).toLocaleString('fi-FI')}</Text>
            <Icon name="save" />
            <Text>{(filesize / 1000000).toFixed(2)} MB</Text>
          </ListItem>

          <ListItem>
            <Icon name="person" />
            <Text>
            {owner.username} ({owner.full_name})
            </Text>
          </ListItem>
          <ListItem>
            {userLike ? (
              <Icon name="favorite" color="red" onPress={dislikeFile} />
            ) :(
              <Icon name="favorite-border" onPress={likeFile} />
            )}

            <Text>Like: {likes.length} </Text>
          </ListItem>
        </Card>
      </ScrollView>
      <Modal
        visible={modalVisible}
        style={{flex: 1}}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        supportedOrientations={['portrait', 'landscape']}
      >
        <Image
          resizeMode="contain"
          onPress={() => setModalVisible(false)}
          style={{height: '100%'}}
          source={{uri: uploadsUrl + filename}}
        />
      </Modal>
    </>
  );
};

Single.prototype = {
  route : PropTypes.object,
};

export default Single;
