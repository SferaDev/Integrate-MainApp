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
    headerMode: 'none'
});

const ValsStack = StackNavigator({
    llista_vals: {screen: LlistaVals},
}, {
    headerMode: 'none'
});

const ProfileStack = StackNavigator({
    app: {screen: App},
}, {
    headerMode: 'none'
});

const ConfigStack = StackNavigator({
    app: {screen: App},
}, {
    headerMode: 'none'
});

const DrawerStack = DrawerNavigator({
    Vals: {screen: ValsStack},
    Buscador: {screen: BuscadorStack},
    Logout: {screen: Logout}
});


const DrawerNavigation = StackNavigator({
    DrawerStack: {screen: DrawerStack}
}, {
    headerMode: 'none'
});

const LoginStack = StackNavigator({
    Login: {screen: Login}
}, {
    headerMode: 'none',
});

// Manifest of possible screens
const Home = StackNavigator({
    LoginStack: {screen: LoginStack},
    DrawerNavigation: {screen: DrawerNavigation}
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginStack'
});

export default Home;