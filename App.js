import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ImageBackground,View, Text } from 'react-native';
import { Menu, Settings } from 'react-native-feather';
import List from './components/List';


const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "darkgray" translucent = {true}/>
        <View style={styles.header}>
          <ImageBackground
            source={require('./assets/puppy.jpg')}
            style={styles.bgImage}
            imageStyle={{borderBottomRightRadius:70}}>
          </ImageBackground>

          <Menu stroke='white' width={32} height={32} style={styles.menu} />
          <Settings stroke='white' width={32} height={32} style={styles.settings} />
          <Text style={styles.hello}>Cute puppy List</Text>
        </View>
        <List />
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-around',
  },
  header:{
    height:270,
  },
  bgImage:{
    width:'100%',
    height: 270,
  },
  hello : {
    position: 'absolute',
    bottom:20,
    color:'white',
    backgroundColor: 'rgb(153, 153, 255)',
    padding:10,
    fontSize:25,
    fontWeight:'bold',
  },
  menu:{
    position:'absolute',
    top:40,
    left:20,
  },
  settings :{
    position:'absolute',
    top:40,
    right:20
  }
});

export default App;
