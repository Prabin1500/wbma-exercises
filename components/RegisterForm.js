import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {Card, Button, Text, Input} from '@rneui/themed';
import {  useUser } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';

const RegisterForm = () => {
  //const {setIsLoggedIn} = useContext(MainContext);
  //const {postLogin} = useAuthentication();
  const {postUser} = useUser();

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{username: '', password: '', email:'', full_name:''},
  });

  const register = async (registerData) => {
    console.log('Register data', registerData);
    try{
      const registerResult = await postUser(registerData);
      console.log('registeration result: ' +registerResult);
    } catch (error){
      console.error('Registeration result: ', error);
    }

  };
  return (
    <Card>
      <Card.Title>Registeration Form</Card.Title>
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
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' && <Text>is required</Text>}
      <Controller
        control={control}
        rules={{minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="full_name"
      />
      {errors.full_name?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}

      <Button title="Sign in!" onPress={handleSubmit(register)} />
    </Card>
  );
};


export default RegisterForm;
