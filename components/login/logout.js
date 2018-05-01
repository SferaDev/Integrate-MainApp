import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        drawerLabel: 'Log Out',
        drawerIcon:  <Icon name="logout-variant" size={25} />,
    };

    componentDidMount() {
        AsyncStorage.removeItem('token');
        this.props.navigation.navigate('LoginStack');
    }

    render(){
        return(<View><Text>!!!</Text></View>);
    }
}
