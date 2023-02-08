
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Card, Icon, ListItem} from '@rneui/themed';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { MainContext } from '../contexts/MainContext';
import { useTag } from '../hooks/ApiHooks';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import MyFiles from './MyFiles';

const Profile = ({navigation}) => {

  const{getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async() => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      console.log('avatarArray' + avatarArray);
      setAvatar(avatarArray.pop().filename);

    } catch (error) {
      console.error('User avatar fetch failed', error.message);
    }


  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <Card>
      <Card.Title>Username: {user.username}</Card.Title>
      <Card.Image source={{uri: uploadsUrl + avatar}} />

      <ListItem>
        <Icon name='email' />
        <ListItem.Title>email: {user.email}</ListItem.Title>
      </ListItem>

      <ListItem>
        <Icon name='badge' />
        <ListItem.Title>Full name: {user.full_name}</ListItem.Title>
      </ListItem>
      <Button
        title='Logout'
        onPress={async () =>{
          setUser({});
          setIsLoggedIn(false);
          try{
            await AsyncStorage.clear();
          } catch (error){
            console.error('clearing asyncstorage failed ', error);
          }
        }}
       />

       <Button
          title="MyFiles"
          onPress={() =>{
          navigation.navigate('MyFiles');
       }} />

    </Card>
  );
};

Profile.propTypes = {
  navigation : PropTypes.object,
};

export default Profile;
