import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import {AsyncStorage} from 'react-native';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        AsyncStorage.removeItem('token');
        this.props.navigation.navigate('LoginStack');
    }

    render(){
        return(<View><Text>!!!</Text></View>);
    }
}
