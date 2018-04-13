import {AsyncStorage} from 'react-native';

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
    },
    getEntities: () => {

        return new Promise(function (resolve, reject) {

            let entities = [
                {
                    id: 1,
                    nif: '12345678A',
                    salesmanFirstName: 'John',
                    salesmanLastName: 'Doe',
                    email: 'email@email.com',
                    name: 'UPC',
                    description: 'Universitat Politecnica de Catalunya',
                    addressName: 'C/ Jordi Girona',
                    addressLatitude: 41.391501,
                    addressLongitude: 2.113283,
                    phone: '963852741',
                    picture: ''
                }
            ];

            fetch('http://localhost:8081')
                .then(function (response) {
                    resolve(entities);
                })
                .catch(function (myJson) {
                    reject();
                });
        });
    }
};

export default API
