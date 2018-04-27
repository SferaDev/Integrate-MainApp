import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

import Login from './login/login';
import Buscador from './buscador/buscador';
import Vals from './llista_vals/vals';
import App from '../App';

const BuscadorStack = StackNavigator({
    buscador: {screen: Buscador},
}, {
    headerMode: 'none'
});

const ValsStack = StackNavigator({
    vals: {screen: Vals},
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
    Buscador2: {screen: BuscadorStack},
    Vals: {screen: ValsStack}
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