
import {ListItem as RNEListItem} from '@rneui/themed';
import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';
import { Avatar } from '@rneui/base/dist/Avatar/Avatar';
import { ListItemBase } from '@rneui/base/dist/ListItem/ListItem';
import { ListItemButtonGroup } from '@rneui/base/dist/ListItem/ListItem.ButtonGroup';
import {ButtonGroup } from '@rneui/base';

const ListItem = ({singleMedia, navigation}) =>{
  const item = singleMedia;
  return(
    <RNEListItem topDivider
      onPress={() =>
        navigation.navigate('Single', item)
    }>
      <Avatar source={{uri: uploadsUrl + item.thumbnails?.w160}} />

      <RNEListItem.Content>
        <RNEListItem.Title>{item.title}</RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={2}>
          {item.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>

    </RNEListItem>

  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation : PropTypes.object,
}

export default ListItem;
