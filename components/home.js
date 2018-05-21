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

const BuscadorStack = StackNavigator({
    buscador: {
        screen: Buscador,
        navigationOptions: {
            drawerLabel: 'Buscador',
            drawerIcon: <Icon name="home" size={25}/>,
            gesturesEnabled: false
        }
    },
    detalls_entitat:{
        screen: DetallsEntitat
    }
}, {
    headerMode: 'none',
    disabledBackGesture: true,
});

const ValsStack = StackNavigator({
    llista_vals: {
        screen: LlistaVals,
        navigationOptions: {
            drawerLabel: 'Vals',
            drawerIcon: <Icon name="ticket-percent" size={25}/>,
        }
    },
}, {
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});

const ProfileStack = StackNavigator({
    settings: {
        screen: Information,
        navigationOptions: {
            drawerLabel: 'Profile settings',
            drawerIcon: <Icon name="settings" size={25}/>,
        }
    },
    changePassword:{
        screen: ChangePassword
    }
}, {
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});

const ConfigStack = StackNavigator({
    app: {screen: App},
}, {
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});

const DrawerStack = DrawerNavigator({
    Buscador: {screen: BuscadorStack},
    Vals: {screen: ValsStack},
    Logout: {
        screen: Logout,
        navigationOptions: {
            drawerLabel: 'Log Out',
            drawerIcon: <Icon name="logout-variant" size={25}/>,
        }
    },
    Validar: {screen: Validar},
    Profile: {screen: ProfileStack}
}, {
    headerMode: 'none',
    disabledBackGesture: true,
    gesturesEnabled: false
});


const DrawerNavigation = StackNavigator({
    DrawerStack: {screen: DrawerStack}
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
