import React from 'react';
import {Card, Button, Text, Input} from '@rneui/themed';
import {  useUser } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';

const RegisterForm = () => {
  //const {setIsLoggedIn} = useContext(MainContext);
  //const {postLogin} = useAuthentication();
  const { postUser,checkUsername } = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues:{username: '', password: '', email:'', full_name:''},
    mode:'onBlur',
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

  const checkUser = async(username) => {
    try {
      const userAvailable = await checkUsername(username);
      console.log('checkuser' + userAvailable);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkuser '+ error.message);
    }
  };

  return (
    <Card>
      <Card.Title>Registeration Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {
            value:true,
            message:'This is required'
          },
          minLength: {
            value:3,
            message:'Username min length is 3 characters'
          },
          validate: checkUser,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
            errorMessage={errors.username && errors.username.message}
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
        rules={{
          required: {
            value: true,
            message: 'min 5 characters, one number and one uppercase letter',
          },
          pattern: {
            value : /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'min 5 characters, one number and one uppercase letter',
          }
        }}

        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min. 5 chars) is required .</Text>}

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'min 5 characters, one number and one uppercase letter',
          },
          pattern: {
            value : /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'min 5 characters, one number and one uppercase letter',
          }
        }}

        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="Confirm Password"
      />

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
            autoCapitalize='words'
          />
        )}
        name="full_name"
      />
      {errors.full_name?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}

      <Button title="Register" onPress={handleSubmit(register)} />
    </Card>
  );
};


export default RegisterForm;
