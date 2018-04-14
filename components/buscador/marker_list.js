import React, { Component } from 'react';
import {} from 'react-native';
import MapView from 'react-native-maps';

const MarkerList = props =>  props.items.map((e, i) => { return(<MapView.Marker key={e.id} identifier={''+e.id+''} coordinate={ {latitude: e.addressLatitude, longitude: e.addressLongitude, latitudeDelta: 0.01,longitudeDelta: 0.01} } pinColor="red" />)} );

export default MarkerList;