import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';

const Single = ({route}) => {
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.listTitle}>{title}</Text>
      <Image style={styles.image} source={{uri: uploadsUrl + filename}} />
      <Text>{timeAdded}</Text>
      <Text>{description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  image: {
    width : 350,
    height: 300,
  },
  listTitle : {
    fontWeight : 'bold',
    fontSize : 20,
    marginBottom : 10,
  },
});

Single.prototype = {
  route : PropTypes.object,
};

export default Single;
