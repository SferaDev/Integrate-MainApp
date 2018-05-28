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
import {AsyncStorage} from "react-native";

let loadLang = async () => {
    return await AsyncStorage.getItem('lang');
}

//console.warn(JSON.stringify(loadLang));
//console.warn(JSON.parse(AsyncStorage.getItem('lang')));

let searcher = language_settings['en'].home.searcher;
let goods = language_settings['en'].home.goods;
let log_out = language_settings['en'].home.log_out;
let validate = language_settings['en'].home.validate;
let settings = language_settings['en'].home.settings;

const BuscadorStack = StackNavigator({
        buscador: {
            screen: Buscador,
            navigationOptions: {
                drawerLabel: searcher,
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
            drawerLabel: goods,
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
            drawerLabel: settings,
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
    Buscador: {screen: BuscadorStack},
    Vals: {screen: ValsStack},
    Profile: {screen: ProfileStack},
    Logout: {
        screen: Logout,
        navigationOptions: {
            drawerLabel: log_out,
            drawerIcon: <Icon name="logout-variant" size={25}/>,
        }
    },
    Validar: {
        screen: Validar,
        navigationOptions: {
            drawerLabel: validate,
            drawerIcon: <Icon name="check" size={25}/>,
            gesturesEnabled: false
        }
    },
    Profile: {screen: ProfileStack}
}, {
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
