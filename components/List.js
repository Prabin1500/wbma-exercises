import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ListItem from './ListItem';

const List = () => {

  const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const [mediaArray, setMediaArray] = useState([]);

  const loadmedia = async() => {
    try{
      const response = await fetch(url);
      const json = await response.json();
      setMediaArray(json);

    }catch(error){
      console.error('List, loadMedia', error)
    }

  }

  useEffect(() => {
    loadmedia();
  }, []);

  console.log('List, mediaArray', mediaArray);

  return(
    <FlatList style={styles.container}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem  singleMedia={item} /> }
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 30: 0,
  },
});
export default List;
