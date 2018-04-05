import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';

export default class Maps extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return (
      <MapView
        ref={ map => this.map = map }
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsPointsOfInterest={false}
        showsMyLocationButton={false}
        showsCompass={false}
        style={{...StyleSheet.absoluteFillObject,paddingTop: 100}}
      />
    );
  }
}