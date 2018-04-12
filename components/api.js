import {
    AsyncStorage
} from 'react-native';

const BASEURL = 'http://integrate-backend-staging.herokuapp.com';

const API = {
    login: (nifnie = '', password = '') => {
        return new Promise((resolve, reject) => {
            if (nifnie.length == 0 || password.length == 0) reject();
            else {
                fetch(BASEURL + '/login?email=' + nifnie + '&password=' + password).then((response) => {
                    //Resolve
                    AsyncStorage.setItem('token', JSON.parse(response._bodyText).token)
                    resolve(JSON.parse(response._bodyText).token);
                }).catch(() => {
                    //Reject
                    reject();
                })
            }
        });
    }
}

export default API