import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Input } from '@rneui/base';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert } from 'react-native';
import { useMedia } from '../hooks/ApiHooks';

const Upload = ({navigation}) => {
  const {postMedia} = useMedia();
  const [mediaFile, setMediaFile] = useState({});
  const [loading, setLoading] = useState(false);
  const {update, setUpdate} = useState(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {title: '', description: ''}
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
      const result =  await postMedia(formData, await AsyncStorage.getItem('userToken'));
      console.log('Upload result', result)
      Alert.alert('Upload complete', 'Fild id : ' + result.file_id, [
        {text:'ok', onPress:() => console.log('Ok Pressed')},
      ]);
    } catch (error) {
      console.error('File upload error', error);

    }finally{
      setLoading(false);
    }
    console.log('Upload a file');
  };

  const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return(
    <Card>
      <Card.Image source={{uri:image.uri || 'http://placekitten.com/200/300'}} />
      <Controller
        control={control}
        rules={{required: {value : true, message: 'Title cannot be empty'}}}
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
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
      {loading && <ActivityIndicator size='large'/>}
      <Button title='Pick a file' onPress={pickFile} />
      <Button disabled={!mediaFile.uri} title='upload' onPress={handleSubmit(uploadFile)} />
    </Card>
  );
};


Upload.propTypes = {
  navigation : PropTypes.object,
}

export default Upload;
