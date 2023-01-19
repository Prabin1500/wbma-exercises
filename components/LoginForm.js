import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button, TextInput } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = (props) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{username: '', password: ''}
  });

  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    //const data = {username: 'prabin1500', password: '@1212prabind1212'};
    try{
      const loginResult = await postLogin(loginData);
      console.log('login', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setIsLoggedIn(true);
    } catch (error){
      console.error('logIn', error);
    }

  };
  return (
    <View>
      <Text>Login Form</Text>
      <Controller
        control={control}
        rules={{
          required:true, minLength:3
        }}
        render={({field: {onChange, onBlur, value}}) =>(
          <TextInput
            placeholder='Username'
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
        name='Username'
      />

      <Controller
        control={control}
        rules={{ required:true, minLength:5 }}
        render={({field: {onChange, onBlur, value}}) =>(
          <TextInput
            placeholder='Password'
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name='Password'
      />
      {errors.password && <Text>Password not valid</Text>}
      <Button title="Sign in" onPress={handleSubmit(logIn)}/>
    </View>
  );
};


export default LoginForm;
