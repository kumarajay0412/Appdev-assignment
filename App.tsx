import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import Model1 from './Model1'
import Model2 from './Model2'
import { Appbar } from 'react-native-paper';
import { Button } from 'react-native-paper';

export default function App() {

  const [mod1, setMod1] = useState(true);
  const [mod2, setMod2] = useState(false);
  const changeModel2 = () => {
    setMod1(false);
    setMod2(true);
  };

  const changeModel1 = () => {
    setMod1(true);
    setMod2(false);
  };

  return (
      <View style={styles.container}>
        <Appbar style={styles.header}>
          <Text style={styles.title}> My 3D object visualizer </Text>
        </Appbar>
        {!mod1? <Model1/> : (   
          <Model2/>
        )}
        <TouchableOpacity >
        <View style={styles.item}>
          <Button mode="contained" color="blanchedalmond" onPress={changeModel1}>
            Model 1
          </Button>
          <Button mode="contained" color="blanchedalmond" onPress={ changeModel2}>
            Model 2
          </Button>
        </View>
        </TouchableOpacity >
        <Appbar style={styles.footer}>
          <Text style={styles.title1}>Designed and developed by Ajay</Text>
        </Appbar>
      
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    paddingTop: 90,
    backgroundColor: 'coral',
  },
  title1: {
    textAlign: 'center',
    justifyContent:'center',
    paddingLeft:50,
    marginBottom:50,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    height: 50,
    paddingTop: 50,
    backgroundColor: 'coral',
  },
  title: {
    textAlign: 'center',
    justifyContent:'center',
    paddingLeft:70,
    marginBottom:70,
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    marginTop: 16,
    marginBottom:100,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
  },
  model:{
    flex:3,
    marginTop: 36,
    alignItems: 'center',
    // backgroundColor:"red"
  }
});