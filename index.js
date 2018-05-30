import {AppRegistry, AsyncStorage} from 'react-native';

import App from './components/home';

let loadLang = async () => {
    global.lang = await AsyncStorage.getItem('lang');
    if (global.lang == null) global.lang = 'en';
}

loadLang().then( () => { AppRegistry.registerComponent('Integrate', () => App); } );