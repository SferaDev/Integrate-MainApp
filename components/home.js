import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Buscador from './buscador/buscador';
import App from '../App';

const BuscadorStack = StackNavigator({
  buscador: { screen: Buscador },
}, {
  headerMode: 'none'
});

const ValsStack = StackNavigator({
  app: { screen: App },
}, {
  headerMode: 'none'
});

const ProfileStack = StackNavigator({
  app: { screen: App },
}, {
  headerMode: 'none'
});

const ConfigStack = StackNavigator({
  app: { screen: App },
}, {
  headerMode: 'none'
});

const DrawerStack = DrawerNavigator({
  screen1: { screen: BuscadorStack },
  screen2: { screen: ValsStack },
  screen3: { screen: BuscadorStack },
});


const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'none'
});

const LoginStack = StackNavigator({
  App: { screen: App }
}, {
  headerMode: 'none',
});

// Manifest of possible screens
const Home = StackNavigator({
  LoginStack: { screen: LoginStack },
  DrawerNavigation: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginStack'
});

export default Home;