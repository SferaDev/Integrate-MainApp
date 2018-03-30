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
        <Maps />
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
