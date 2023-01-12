import List from "../components/List"
import {Platform, StyleSheet, SafeAreaView} from "react-native";
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return(
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Home.propTypes = {
  navigation : PropTypes.object,
}

export default Home;
