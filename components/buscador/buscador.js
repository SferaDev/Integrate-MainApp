import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Maps from './maps';

export default class Buscador extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 60,backgroundColor: 'blue'}}>
          <Text style={{color: 'white'}} >GG</Text>
        </View>
        <View style={{flex: 8,justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',width: '100%',height: '100%'}} >
          <Maps />
        </View>
        <View style={{height: 100}}>
          <Text>GG</Text>
        </View>

        <View style={{display: 'none',position: 'absolute',top:0,left: 0,width: '100%', height: '100%',backgroundColor: 'rgba(0,0,0,0.5)'}} >
          <View style={{position: 'absolute',top: 0,left: 0, width: '75%', height: '100%', backgroundColor: 'white'}} >
            
          </View>
        </View>
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
  }
});
