
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import { useState } from 'react/cjs/react.development';
import { MainContext } from '../contexts/MainContext';
import { useTag } from '../hooks/ApiHooks';
import { uploadsUrl } from '../utils/variables';

const Profile = () => {

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
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Image style={styles.image} source={{uri: uploadsUrl + avatar}} />
      <Text>Username: {user.username}</Text>
      <Text>email: {user.email}</Text>
      <Text>Full name: {user.full_name}</Text>
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

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width : 350,
    height: 300,
  },
});

export default Profile;
