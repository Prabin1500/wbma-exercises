import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';
import { Dimensions } from 'react-native'

const ListItem = ({singleMedia, navigation}) =>{
  const item = singleMedia;
  return(
    <TouchableOpacity
      style={styles.row}
      onPress={() =>
        navigation.navigate('Single', item)
    }>
      <View style = {styles.box}>
        <Image
          style={styles.image}
          source={{uri: uploadsUrl + item.thumbnails?.w160}}>
        </Image>
      </View>
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
    padding:10,
  },
  image :{
    flex: 1,
    minHeight: 150,
  },
  listTitle : {
    fontWeight : 'bold',
    fontSize : 20,
    paddingBottom: 15,
  },

});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation : PropTypes.object,
}

export default ListItem;
