import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Input } from '@rneui/base';
import PropTypes from 'prop-types';
import { useState, useContext, useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useMedia, useTag } from '../hooks/ApiHooks';
import * as ImagePicker from 'expo-image-picker';
import { MainContext } from '../contexts/MainContext';
import { appId } from '../utils/variables';
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';

const Upload = ({navigation}) => {
  const video = useRef(null);
  const {postMedia} = useMedia();
  const [mediaFile, setMediaFile] = useState({});
  const [loading, setLoading] = useState(false);
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    reset,
  } = useForm({
    defaultValues: {title: '', description: ''},
    mode:'onChange',
  });

  const uploadFile = async(data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const fileName = mediaFile.uri.split('/').pop();
    const fileExtension = fileName.split('.').pop();

    if(fileExtension === 'jpg') fileExtension='jpeg';
    const mimeType = mediaFile.type + '/' + fileExtension;

    formData.append('file', {
      uri: mediaFile.uri,
      name:fileName,
      type:mimeType,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const result =  await postMedia(formData, token);

      const appTag = {
        file_id:result.file_id,
        tag:appId
      };
      const tagResult = await postTag(appTag, token);
      console.log('tag result', tagResult);

      Alert.alert('Upload complete', 'Fild id : ' + result.file_id, [
        {
          text:'ok',
          onPress:() =>{
          console.log('Ok Pressed');
          setUpdate(!update);
          navigation.navigate('Home');
          },

        }
      ]);
    } catch (error) {
      console.error('File upload error', error);

    }finally{
      setLoading(false);
    }
    console.log('Upload a file');
  };

  const pickFile = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setMediaFile(result.assets[0]);
      trigger();
    }
    } catch (error) {
      console.error(error);
    }

  };

  const resetForm = () => {
    setMediaFile({});
    reset();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('leaving');
        resetForm();
      };
    }, [])
  );

  return(
    <Card>
        {mediaFile.type === 'video' ? (
          <Video
            ref={video}
            source={{uri: uploadsUrl + filename}}
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
              uri: mediaFile.uri || 'https://placekitten.com/g/200/300',
            }}
            onPress={pickFile}
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

      <Button title='Pick a file' onPress={pickFile} />

      <Button
        loading = {loading}
        disabled={!mediaFile.uri || errors.title || errors.description}
        title='upload'
        onPress={handleSubmit(uploadFile)}
      />
      <Button title={'Reset'} onPress={resetForm} type='outline' />

    </Card>
  );
};


Upload.propTypes = {
  navigation : PropTypes.object,
};

export default Upload;
