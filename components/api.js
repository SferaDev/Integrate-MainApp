import {AsyncStorage} from 'react-native';
import httpHelper from './http_helper';

const getToken = async () => {
    return await AsyncStorage.getItem('token');
}

const API = {
    login: (nifnie = '', password = '') => {
        return new Promise((resolve, reject) => {
            if (nifnie.length === 0 || password.length === 0) reject();
            else {
                let url = 'login';
                let params = [ {key: 'nif', value: nifnie} , {key: 'password', value: password} ];
                let success = (response) => {
                    if (response.status === 401) {
                        reject();
                    } else if (response.status === 200){
                        AsyncStorage.setItem('token', JSON.parse(response._bodyText).token)
                        resolve(JSON.parse(response._bodyText).token);
                    }
                }
                httpHelper.callApi(url,params,success,reject);
            }
        });
    },
    getEntities: (loc = null) => {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                let url = 'me/entities';
                let params = [ {key: 'token', value: token}, {key: 'latitude',value: loc.coords.latitude}, {key: 'longitude', value: loc.coords.longitude} ];
                let success = (response) => {
                    if (response.status === 404) {
                        reject();
                    } else if (response.status === 200) {
                        resolve(JSON.parse(response._bodyText));
                    }
                }
                httpHelper.callApi(url,params,success,reject);
            } else {
                reject();
            }
        });
    },
    getGoods: (category = 0, order = 0, loc = null) => {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                let url = 'me/goods';
                let params = [ {key: 'token', value: token}, {key: 'category', value: category}, {key: 'order', value: order}];
                if (loc != null) {
                    params.push({key: 'latitude', value: loc.coords.latitude});
                    params.push({key: 'longitude', value: loc.coords.longitude});
                }
                let success = (response) => {
                    if( response.status === 404 ){
                        reject();
                    }else if( response.status === 200 ){
                        resolve( JSON.parse(response._bodyText) );
                    }
                }
                httpHelper.callApi(url,params,success,reject);
            } else {
                reject();
            }
        });
    },
    getGoodsFav: (category = 0, order = 0, loc = null) => {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                let url = 'me/goods/favourites';
                let params = [ {key: 'token', value: token}, {key: 'category', value: category}, {key: 'order', value: order}];
                if (loc != null) {
                    params.push({key: 'latitude', value: loc.coords.latitude});
                    params.push({key: 'longitude', value: loc.coords.longitude});
                }
                let success = (response) => {
                    if( response.status === 404 ){
                        reject();
                    }else if( response.status === 200 ){
                        resolve( JSON.parse(response._bodyText) );
                    }
                }
                httpHelper.callApi(url,params,success,reject);
            } else {
                reject();
            }
        });
    },
    addGoodFav: (good_id = null) => {
        return new Promise(async (resolve, reject) => {
            if(!good_id)reject();
            else{
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    let url = 'me/goods/favourites/' + good_id;
                    let params = [{key: 'token', value: token}, {key: 'good_id', value: good_id}];
                    let success = (response) => {
                        if (response.status === 404) {
                            reject();
                        } else if (response.status === 200) {
                            resolve(JSON.parse(response._bodyText));
                        }
                    }
                    httpHelper.callApi(url, params, success, reject, "POST");
                } else {
                    reject();
                }
            }
        });
    },
    deleteGoodFav: (good_id = null) => {
        return new Promise(async (resolve, reject) => {
            if(!good_id)reject();
            else{
                const token = await getToken();
                if (token != null) {
                    let url = 'me/goods/favourites/' + good_id;
                    let params = [{key: 'token', value: token}, {key: 'good_id', value: good_id}];
                    let success = (response) => {
                        if (response.status === 404) {
                            reject();
                        } else if (response.status === 200) {
                            resolve(JSON.parse(response._bodyText));
                        }
                    }
                    httpHelper.callApi(url, params, success, reject, "DELETE");
                } else {
                    reject();
                }
            }
        });
    },
};

export default API
