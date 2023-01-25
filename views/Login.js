import React, { useContext, useEffect, useState } from 'react';
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
import { Button, Text} from '@rneui/base';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const { getUserByToken } = useUser();

  const [toggleForm, setToggleForm] = useState(true);

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
        {toggleForm ? <LoginForm /> : <RegisterForm />}
        <Text>{toggleForm ? 'Don\'t have an accout. Register here.' : 'Already have an account. Go to login.'}</Text>
        <Button
          title={toggleForm ? 'Register' : 'Login'}
          onPress={() => {
            setToggleForm(!toggleForm);
          }}
        ></Button>

      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};


Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
