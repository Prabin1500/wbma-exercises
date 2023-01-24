import React, { useContext, useEffect } from 'react';
import {
  Keyboard,
  Platform,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const { getUserByToken } = useUser();

  const checkToken = async () => {
    try{
      const userToken = await AsyncStorage.getItem('userToken');

      //If token is not available, do nothing.
      if(userToken === null){
        return;
      }
      const userData = getUserByToken(userToken);
      setUser(userData);
      setIsLoggedIn(true);
    }catch (error){
      console.log('no valid token available');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LoginForm />
        <RegisterForm />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};


Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
