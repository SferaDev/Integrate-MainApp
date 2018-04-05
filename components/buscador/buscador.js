import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Maps from './maps';

export default class Buscador extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  openMenu(){
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    const that = this;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} >MENU</Text>
          <Text style={styles.headerRightIco} >LIST</Text>
        </View>
        <View style={{flex: 8,justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',width: '100%',height: '100%'}} >
          <Maps />
        </View>
        <View style={{height: 100}}>
          <Text onPress={this.openMenu.bind(this)}>Menu</Text>
        </View>

        <View style={{position: 'absolute', top: 75, alignSelf: 'center', width: 345, height: 35, backgroundColor: 'white',borderRadius: 5,display: 'flex',flexDirection: 'row'}} >
          <Text style={{flex: 2,textAlign: 'center',alignSelf: 'center'}} >Q</Text>
          <TextInput style={{flex: 18}} placeholder="HELLO" />
        </View>
        <TouchableHighlight style={{position: 'absolute', bottom: 115, left: 15, height: 30, width: 30, borderRadius: 15, backgroundColor: 'red'}} >
          <Text>C</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{position: 'absolute', bottom: 115, right: 15, height: 45, width: 45, borderRadius: 22.5, backgroundColor: 'red'}} >
          <Text>C</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header:{
    height: 60,
    backgroundColor: '#094671',
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  headerLeftIco:{
    flex: 1 , 
    alignSelf: 'center', 
    paddingLeft: 20, 
    textAlign: 'left', 
    color: 'white'
  },
  headerRightIco:{
   flex: 1 , 
   alignSelf: 'center', 
   paddingRight: 20, 
   textAlign: 'right', 
   color: 'white' 
  }
});
