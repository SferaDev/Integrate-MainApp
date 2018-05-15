import {AsyncStorage} from 'react-native';
import http_helper from './http_helper';

const getToken = async () => {
    return await AsyncStorage.getItem('token');
};

const API = {
    login: (nifnie = '', password = '') => {
        return new Promise(async (resolve, reject) => {
            if (nifnie.length === 0 || password.length === 0) reject();
            else {
                let url = 'login';
                let params = [{key: 'nif', value: nifnie}, {key: 'password', value: password}];

                let response = await http_helper.callApi(url, params);
                if (!response || response.status === 401) {
                    reject();
                } else if (response.status === 200) {
                    AsyncStorage.setItem('token', JSON.parse(response._bodyText).token);
                    resolve(JSON.parse(response._bodyText).token);
                }
            }
        });
    },
    getEntity: (id = null) => {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');

            let url = 'me/entity/'+id;
            let params = [{key: 'token', value: token}];

            let response = await http_helper.callApi(url, params);
            if (response.status === 404) {
                reject();
            } else if (response.status === 200) {
                resolve(JSON.parse(response._bodyText));
            }
        });
    },
    getEntities: (loc = null) => {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');

            let url = 'me/entities';
            let params = [{key: 'token', value: token}, {
                key: 'latitude',
                value: loc.coords.latitude
            }, {key: 'longitude', value: loc.coords.longitude}];

            let response = await http_helper.callApi(url, params);
            if (response.status === 404) {
                reject();
            } else if (response.status === 200) {
                resolve(JSON.parse(response._bodyText));
            }
        });
    },
    getGoods: (category = 0, order = 0, loc = null) => {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');

            let url = 'me/goods';
            let params = [{key: 'token', value: token}, {key: 'category', value: category}, {
                key: 'order',
                value: order
            }];
            if (loc != null) {
                params.push({key: 'latitude', value: loc.coords.latitude});
                params.push({key: 'longitude', value: loc.coords.longitude});
            }

            let response = await http_helper.callApi(url, params);
            if (response.status === 404) {
                reject();
            } else if (response.status === 200) {
                resolve(JSON.parse(response._bodyText));
            }
        });
    },
    getGoodsFav: (category = 0, order = 0, loc = null) => {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');

            let url = 'me/goods/favourites';
            let params = [{key: 'token', value: token}, {key: 'category', value: category}, {
                key: 'order',
                value: order
            }];
            if (loc != null) {
                params.push({key: 'latitude', value: loc.coords.latitude});
                params.push({key: 'longitude', value: loc.coords.longitude});
            }

            let response = await http_helper.callApi(url, params);
            if (response.status === 404) {
                reject();
            } else if (response.status === 200) {
                resolve(JSON.parse(response._bodyText));
            }
        });
    },
    addGoodFav: (good_id = null) => {
        return new Promise(async (resolve, reject) => {
            if (!good_id) reject();
            else {
                const token = await AsyncStorage.getItem('token');

                let url = 'me/goods/favourites/' + good_id;
                let params = [{key: 'token', value: token}, {key: 'good_id', value: good_id}];

                let response = await http_helper.callApi(url, params, "POST");
                if (response.status === 404) {
                    reject();
                } else if (response.status === 200) {
                    resolve(JSON.parse(response._bodyText));
                }
            }
        });
    },
    deleteGoodFav: (good_id = null) => {
        return new Promise(async (resolve, reject) => {
            if (!good_id) reject();
            else {
                const token = await getToken();

                let url = 'me/goods/favourites/' + good_id;
                let params = [{key: 'token', value: token}, {key: 'good_id', value: good_id}];

                let response = await http_helper.callApi(url, params, "DELETE");
                if (response.status === 404) {
                    reject();
                } else if (response.status === 200) {
                    resolve(JSON.parse(response._bodyText));
                }
            }
        });
    }
};

export default API
