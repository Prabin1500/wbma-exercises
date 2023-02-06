import React, { useEffect, useRef } from 'react';
import {Text, Card, ListItem} from '@rneui/themed';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';
import { ScrollView } from 'react-native';
import { Icon } from '@rneui/base';
import { useState } from 'react/cjs/react.development';
import { useUser } from '../hooks/ApiHooks';
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
  } = route.params;

  const video = useRef(null);
  const [owner, setOwner] = useState({});
  const {getUserById} = useUser();

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await setOwner(getUserById(userId, token));
    setOwner(owner);
  }
  useEffect(() => {
    getOwnerInfo();
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
            style={{width:'100%',height:200}}
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
            {owner.username}
            ({owner.full_name})
          </Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

Single.prototype = {
  route : PropTypes.object,
};

export default Single;
