import React from 'react';
import {
  View
} from 'react-native';

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

global.navigator = {};
global.navigator.geolocation = mockGeolocation;

export default class MapView extends React.Component {

  static Marker = '';

  render() {
    return (null);
  }
}