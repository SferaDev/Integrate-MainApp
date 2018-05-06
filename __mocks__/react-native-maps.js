import React from 'react';
import {Text, View} from 'react-native';

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
};

global.navigator = {};
global.navigator.geolocation = mockGeolocation;

const Marker = class Marker extends React.Component {

    render() {
        return React.createElement(Text, this.props, this.props.children);
    }
};

class MapView extends React.Component {

    //static Marker = '';

    render() {
        return React.createElement(View, this.props, this.props.children);
    }
}

export default MapView;