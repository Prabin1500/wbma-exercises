import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const { getUserByToken } = useUser();

  const checkToken = async () => {
    try{
      const userToken = await AsyncStorage.getItem('userToken');

      //If token is not available, do nothing.
      if(userToken === null){
        return;
      }
      const userData = getUserByToken(userToken);
      setIsLoggedIn(true);
    }catch (error){
      console.log('no valid token available');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <LoginForm  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
