
import { StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useMedia } from '../hooks/ApiHooks';
import {baseUrl} from '../utils/variables'
import ListItem from './ListItem';

const List = () => {
  const {mediaArray} = useMedia();

  return(
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem  singleMedia={item} /> }
    />
  )
}
export default List;
