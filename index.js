import {AppRegistry, AsyncStorage} from 'react-native';
import App from './components/home';

global.lang = 'ca';
AppRegistry.registerComponent('Integrate', () => App);