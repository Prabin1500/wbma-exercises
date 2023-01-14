import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Dimensions } from 'react-native'

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image
          style={styles.modalImage}
          source={{uri: item.filename}}
          ></Image>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Image</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.row}
        onPress={() => setModalVisible(true)}>

        <Image
          style={styles.image}
          source={{uri: item.thumbnails.w160}}
        ></Image>

        <View style={styles.box}>
          <Text style={styles.listTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor : '#333232',
    margin:10,
  },
  box : {
    flex : 1,
    padding:10,
  },
  image :{
    flex:1,
    minHeight:150,
    margin:10,
    borderRadius:30,
    borderWidth: 3,
    borderColor: "black"
  },
  listTitle : {
    fontSize : 20,
    paddingBottom:15,
    color:'white',
  },
  description:{
    color:'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  modalImage :{
    width: Dimensions.get('window').width-30,
    height:300,
  },
  buttonClose: {
    top:15,
    backgroundColor: 'rgb(153, 153, 255)',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    fontFamily:'',
    cursor:'pointer',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
