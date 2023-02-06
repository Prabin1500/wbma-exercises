import React, { useEffect, useRef, useState } from 'react';
import {Text, Card, ListItem} from '@rneui/themed';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';
import { ScrollView } from 'react-native';
import { Icon } from '@rneui/base';
import { useFavourite, useUser } from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  } = route.params;

  const video = useRef(null);
  const [owner, setOwner] = useState({});
  const {getUserById} = useUser();
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} = useFavourite();

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = setOwner(getUserById(userId, token));
    console.log(owner)
    setOwner(owner);
  };

  const getLikes = async() => {
    const likes = await getFavouritesByFileId(fileId)
    console.log('likes ' + likes)
    setLikes(likes);
  };

  const likeFile = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(fileId, token);
      getLikes();
    } catch (error) {
      console.error(error);
    }

  };

  const dislikeFile = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(fileId, token);
      getLikes();
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    getOwnerInfo();
    getLikes();
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        {type === 'image' ? (
          <Card.Image  source={{uri: uploadsUrl + filename}} />
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
          <ListItem>
          <Text>{description}</Text>
        </ListItem>
        )}

        <ListItem>
          <Icon name="schedule" />
          <Text> Uploaded at: {new Date(timeAdded).toLocaleString('fi-FI')}</Text>
        </ListItem>

        <ListItem>
          <Icon name="person" />
          <Text>
            Prabin
          </Text>
        </ListItem>
        <ListItem>
          {userLike ? (
            <Icon name="favorite" onPress={dislikeFile} />
          ) :(
            <Icon name="favorite-border" onPress={likeFile} />
          )}

          <Text>Like: {likes.length} </Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

Single.prototype = {
  route : PropTypes.object,
};

export default Single;
