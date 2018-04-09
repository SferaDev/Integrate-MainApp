import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';

export default class Maps extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  mapAnimateToMe(loc){

    this.map.animateToRegion({latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.01,longitudeDelta: 0.01});
  }

  pointNorth(e){

    this.map.animateToBearing(0);
  }

  goToMe(e){
    navigator.geolocation.getCurrentPosition(this.mapAnimateToMe.bind(this));
  }

  render() {
    return (
      <View style={{...StyleSheet.absoluteFillObject}} >
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
        <TouchableHighlight 
          underlayColor="rgba(0,0,0,0.3)"
          style={styles.pointNorth} 
          onPress={this.pointNorth.bind(this)}
        >
          <Text>NO</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor="rgba(0,0,0,0.3)"
          style={styles.goToMeButton} 
          onPress={this.goToMe.bind(this)}
        >
          <Text>ME</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pointNorth:{
    position: 'absolute', 
    bottom: 15, 
    left: 15, 
    height: 30, 
    width: 30, 
    borderRadius: 15, 
    backgroundColor: 'red',
  },
  goToMeButton:{
    position: 'absolute', 
    bottom: 15, 
    right: 15, 
    height: 45, 
    width: 45, 
    borderRadius: 22.5, 
    backgroundColor: 'red'
  }
});