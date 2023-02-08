import { View } from 'react-native'
import React from 'react'
import List from '../components/List'
import PropTypes from 'prop-types';

const MyFiles = ({navigation}) => {
  return (
    <View>
      <List navigation={navigation} myFilesOnly={true} />
    </View>
  )
};

MyFiles.prototype = {
  route : PropTypes.object,
};

export default MyFiles;
