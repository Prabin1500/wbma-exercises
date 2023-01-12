import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const ListItem = ({singleMedia}) =>{
  const item = singleMedia;
  return(
    <TouchableOpacity style={styles.row}>
      <View style = {styles.box}>
        <Image
          style={styles.image}
          source={{uri: item.thumbnails.w160}}>
        </Image>
      </View>
      <View style={styles.box}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor : '#ccc',
    marginBottomf : 10,
  },
  box : {
    flex : 1,
    padding:10,
  },
  image :{
    flex : 1,
    minHeight: 100,
  },
  listTitle : {
    fontWeight : 'bold',
    fontSize : 20,
    paddingBottom:15,
  }
});

export default ListItem;
