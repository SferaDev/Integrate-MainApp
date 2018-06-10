import React, {Component} from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './login/login';
import RestoreCredentials from "./restore_credentials/restore_credentials";

import Buscador from './buscador/buscador';
import DetallsEntitat from './compra/detalls_entitat';

import LlistaVals from './llista_vals/llista_vals';
import Validar from './compra/validar';
import Buy from "./compra/buy";

import Profile from "./profile/profile";

import DRAWER from './drawer';
import language_settings from './language_settings';

const BuscadorStack = StackNavigator({
    buscador: { screen: Buscador },
    detalls_entitat: { screen: DetallsEntitat },
    buy: { screen: Buy },
    validar: { screen: Validar }
}, {
    headerMode: 'none',
    disabledBackGesture: true,
});

const ValsStack = StackNavigator({
    llista_vals: { screen: LlistaVals }, 
    detalls_entitat: { screen: DetallsEntitat },
    buy: { screen: Buy },
    validar: { screen: Validar }
}, {
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});

const DrawerNavigation = DrawerNavigator({
    Buscador: {screen: BuscadorStack},
    Vals: {screen: ValsStack},
    Profile: {screen: Profile}
}, {
    contentComponent: DRAWER,
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});

const LoginStack = StackNavigator({
    Login: {screen: Login},
    RestoreCredentials: {screen: RestoreCredentials}
}, {
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };

        global.logIn = this.logIn.bind(this);
        global.logOut = this.logOut.bind(this);
    }

    logIn(){
        this.setState({isLoggedIn: true});
    }

    logOut(){
        this.setState({isLoggedIn: false});
    }

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'red'}} >
                {(this.state.isLoggedIn) ? <DrawerNavigation /> : <LoginStack />}
            </View>
        )
    }
}