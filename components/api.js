import {AsyncStorage} from 'react-native';

const BASEURL = 'http://integrate-backend-staging.herokuapp.com';

const API = {
    login: (nifnie = '', password = '') => {
        return new Promise((resolve, reject) => {
            if (nifnie.length == 0 || password.length == 0) reject();
            else {
                fetch(BASEURL + '/login?nif=' + nifnie + '&password=' + password).then((response) => {
                    //Resolve
                    if( response.status === 401 ){
                        reject();
                    }else if( response.status === 200 ){
                        AsyncStorage.setItem('token', JSON.parse(response._bodyText).token)
                        resolve(JSON.parse(response._bodyText).token);
                    }
                    
                }).catch(() => {
                    //Reject
                    reject();
                })
            }
        });
    },
    getEntities: () => {

        return new Promise(function (resolve, reject) {

            AsyncStorage.getItem('token').then( (token) => {

                if(token){
                    fetch(BASEURL+'/me/entities?token='+token)
                        .then(function (response) {
                            if( response.status === 404 ){
                                reject();
                            }else if( response.status === 200 ){
                                resolve( JSON.parse(response._bodyText) );
                            }
                        })
                        .catch(function (myJson) {
                            reject();
                        });
                }else{
                    reject();
                }

            } ).catch( () => {
            } );
        });
    }
};

export default API
