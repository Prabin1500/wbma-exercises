import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native'

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity style={styles.row}>
      <Image
        style={styles.image}
        source={{uri: item.thumbnails.w160}}
      ></Image>
      <View style={styles.box}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor : '#ccc',
    marginBottom:10,
    width: Dimensions.get('window').width,
  },
  box : {
    flex : 1,
    marginTop:20,
  },
  image :{
    width:160,
    height:250,
    margin:10,
  },
  listTitle : {
    fontWeight : 'bold',
    fontSize : 20,
  },

});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
