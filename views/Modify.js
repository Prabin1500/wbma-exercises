import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Input } from '@rneui/base';
import PropTypes from 'prop-types';
import { useState, useContext, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useMedia } from '../hooks/ApiHooks';
import { MainContext } from '../contexts/MainContext';
import { uploadsUrl } from '../utils/variables';
import { Video } from 'expo-av';

const Modify = ({navigation, route}) => {
  const {file} = route.params;
  const video = useRef(null);
  const {putMedia} = useMedia();
  const [loading, setLoading] = useState(false);
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {title: file.title, description: file.description},
    mode:'onChange',
  });

  const modifyFile = async(data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log("FIle id " + file.file_id);
      const result =  await putMedia(file.file_id, data, token);

      Alert.alert('Modify complete', 'Fild id : ' + result.message, [
        {
          text:'ok',
          onPress: () =>{
            setUpdate(!update);
            navigation.navigate('MyFiles');
          },

        },
      ]);

    } catch (error) {
      console.error('File Modify error', error);

    }finally{
      setLoading(false);
    }
  };

  return(
    <Card>
        {file.media_type === 'video' ? (
          <Video
            ref={video}
            source={{uri: uploadsUrl + file.filename}}
            style={{width:'100%',height:200}}
            useNativeControls
            resizeMode="contain"
            onError={(error) => {
              console.log(error);
            }}
          />
        ):(
          <Card.Image
            source={{
              uri: uploadsUrl + file.filename,
            }}
           />
        )}

      <Controller
        rules = {{
          required:{
            value: true,
            message:'is required'
          },
          minLength:{
            value:3,
            message:'Length should be 3 characters'
          }
        }}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title && errors.title.message}
          />
        )}
        name="title"
      />

      <Controller
        rules={{
          minLength:{
            value:5,
            message:'Length should be 5 characters'
          }
        }}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description && errors.description.message}

          />
        )}
        name="description"
      />

      <Button
        loading = {loading}
        title="Modify"
        onPress={handleSubmit(modifyFile)}
      />

    </Card>
  );
};


Modify.propTypes = {
  navigation : PropTypes.object,
};

export default Modify;
