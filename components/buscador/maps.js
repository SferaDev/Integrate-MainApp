import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MarkerList from './marker_list';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Maps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: {
                lat: 0,
                long: 0
            },
        };
    }

    componentDidMount() {

        this.goToMe();
    }

    mapAnimateToMe(loc) {

        this.setState({location: {lat: loc.coords.latitude, long: loc.coords.longitude}});
        this.map.animateToRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        });
    }

    pointNorth(e) {

        this.map.animateToBearing(0);
    }

    goToMe() {
        navigator.geolocation.getCurrentPosition(this.mapAnimateToMe.bind(this), () => {
        });
    }

  render() {
    return (
      <View style={{...StyleSheet.absoluteFillObject}} >
        <MapView
          ref={ map => this.map = map }
          initialRegion={{
            latitude: this.state.location.lat,
            longitude: this.state.location.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          showsPointsOfInterest={false}
          showsMyLocationButton={false}
          showsCompass={false}
          style={{...StyleSheet.absoluteFillObject,paddingTop: 100}}
        >
          <MarkerList items={this.props.entities} />
        </MapView>
        <TouchableHighlight 
          underlayColor="rgba(0,0,0,0.3)"
          style={styles.pointNorth} 
          onPress={this.pointNorth.bind(this)}
        >
          <Icon name="compass-outline" size={20} style={{alignSelf: 'center',color: '#67ACB1'}} />
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor="rgba(0,0,0,0.3)"
          style={styles.goToMeButton} 
          onPress={this.goToMe.bind(this)}
        >
          <Icon name="crosshairs-gps" size={20} style={{alignSelf: 'center', color: '#67ACB1'}} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    pointNorth: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center'
    },
    goToMeButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        height: 45,
        width: 45,
        borderRadius: 22.5,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center'
    }
});
