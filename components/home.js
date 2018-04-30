import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

import Login from './login/login';
import Buscador from './buscador/buscador';
import LlistaVals from './llista_vals/llista_vals';
import App from '../App';
import Logout from "./login/logout";

const BuscadorStack = StackNavigator({
    buscador: {screen: Buscador},
}, {
    headerMode: 'none',
    disabledBackGesture: true
});

const ValsStack = StackNavigator({
    llista_vals: {screen: LlistaVals},
}, {
    headerMode: 'none',
    disabledBackGesture: true
});

const ProfileStack = StackNavigator({
    app: {screen: App},
}, {
    headerMode: 'none',
    disabledBackGesture: true
});

const ConfigStack = StackNavigator({
    app: {screen: App},
}, {
    headerMode: 'none',
    disabledBackGesture: true
});

const DrawerStack = DrawerNavigator({
    Buscador: {screen: BuscadorStack},
    Vals: {screen: ValsStack},
    Logout: {screen: Logout}
}, {
    headerMode: 'none',
    disabledBackGesture: true
});


const DrawerNavigation = StackNavigator({
    DrawerStack: {screen: DrawerStack}
}, {
    headerMode: 'none',
    disabledBackGesture: true
});

const LoginStack = StackNavigator({
    Login: {screen: Login}
}, {
    headerMode: 'none',
    disabledBackGesture: true
});

// Manifest of possible screens
const Home = StackNavigator({
    LoginStack: {screen: LoginStack},
    DrawerNavigation: {screen: DrawerNavigation}
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginStack',
    disabledBackGesture: true
});

export default Home;