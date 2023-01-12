
import { StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useMedia } from '../hooks/ApiHooks';
import {baseUrl} from '../utils/variables'
import ListItem from './ListItem';

const List = () => {
  const {mediaArray} = useMedia();

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
