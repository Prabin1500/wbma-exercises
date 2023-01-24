import React from 'react';
import {Text, Card, ListItem} from '@rneui/themed';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';

const Single = ({route}) => {
  const {title, description, filename, time_added: timeAdded, user_id:userId} = route.params;
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Card.Image  source={{uri: uploadsUrl + filename}} />
      <ListItem>
        <Text> Uploaded at: {timeAdded}</Text>
      </ListItem>
      <ListItem>
        <Text>{description}</Text>
      </ListItem>
      <ListItem>
        <Text>User: {userId}</Text>
      </ListItem>
    </Card>
  );
};

Single.prototype = {
  route : PropTypes.object,
};

export default Single;
