import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {baseUrl} from '../utils/variables'
import ListItem from './ListItem';

const List = () => {

  const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const [mediaArray, setMediaArray] = useState([]);

  const loadmedia = async() => {
    try{
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      setMediaArray(media);

    }catch(error){
      console.error('List, loadMedia', error)
    }

  }

  useEffect(() => {
    loadmedia();
  }, []);

  console.log('List, mediaArray', mediaArray);

  return(
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem  singleMedia={item} /> }
    />
  )
}
export default List;
