import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const ListItem = ({singleMedia}) =>{
  const item = singleMedia;
  return(
    <TouchableOpacity>
      <Image
        style={{width: 100, height: 100}}
        source={{uri: item.thumbnails.w160}}>
      </Image>
      <View>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
