import React, { useContext } from 'react'
import {Card, Button, Text, Input} from '@rneui/themed';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''}
  });

  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    //const data = {username: 'prabin1500', password: '@1212prabind1212'};
    try{
      const loginResult = await postLogin(loginData);
      console.log('login', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error){
      console.error('logIn:', error);
    }

  };
  return (
    <Card>
      <Card.Title>Login Form</Card.Title>
      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}
      <Controller
        control={control}
        rules={{required: true, minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min. 5 chars) is required .</Text>}
      <Button title="Sign in!" onPress={handleSubmit(logIn)} />
    </Card>
  );
};


export default LoginForm;
