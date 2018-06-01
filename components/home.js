import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './login/login';
import Buscador from './buscador/buscador';
import LlistaVals from './llista_vals/llista_vals';
import DetallsEntitat from './compra/detalls_entitat';
import App from '../App';
import Logout from "./login/logout";
import RestoreCredentials from "./restore_credentials/restore_credentials";
import Validar from './compra/validar';
import ChangePassword from "./profile/change_password";
import Information from "./profile/information";
import Buy from "./compra/buy";
import language_settings from './language_settings';

import DRAWER from './drawer';

const BuscadorStack = StackNavigator({
        buscador: {
            screen: Buscador,
            navigationOptions: {
                drawerLabel: language_settings[ 'en' ].home.searcher,
                drawerIcon: <Icon name="home" size={25}/>,
                gesturesEnabled: false
            }
        },
        detalls_entitat: {
            screen: DetallsEntitat
        },
        buy: {
            screen: Buy
        },
        validar: {
            screen: Validar
        }
    },
    {
        headerMode: 'none',
        disabledBackGesture: true,
    });

const ValsStack = StackNavigator({
    llista_vals: {
        screen: LlistaVals,
        navigationOptions: {
            drawerLabel: language_settings['en'].home.goods,
            drawerIcon: <Icon name="ticket-percent" size={25}/>,
        }
    }, detalls_entitat: {
        screen: DetallsEntitat
    }
}, {
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});

const ProfileStack = StackNavigator({
    settings: {
        screen: Information,
        navigationOptions: {
            drawerLabel: language_settings['en'].home.settings,
            drawerIcon: <Icon name="settings" size={25}/>,
        }
    }, change_password: {
        screen: ChangePassword
    }
}, {
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});

const DrawerNavigation = DrawerNavigator({
    Buscador: {screen: Buscador},
    Vals: {screen: LlistaVals},
    Profile: {screen: Information},
    Logout: { screen: Logout }
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

// Manifest of possible screens
const Home = StackNavigator({
    LoginStack: {screen: LoginStack},
    DrawerNavigation: {screen: DrawerNavigation}
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginStack',
    disabledBackGesture: true,
    gesturesEnabled: false
});

export default Home;
