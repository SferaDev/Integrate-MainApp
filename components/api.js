import {AsyncStorage} from 'react-native';
import http_helper from './http_helper';

const API = {
    login: async (nifnie = '', password = '') => {

        if (nifnie.length === 0 || password.length === 0) return null;
        else {
            let url = 'login';
            let params = [{key: 'nif', value: nifnie}, {key: 'password', value: password}];

            let response = await http_helper.callApi(url, params);
            if (!response || response.status === 401) {
                return null;
            } else if (response.status === 200) {
                let {user, token} = JSON.parse(response._bodyText);

                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('user', JSON.stringify(user));
                if (global.lang == null) global.lang = user != null ? user.interfaceLanguage : 'en';

                return JSON.parse(response._bodyText).token;
            }
        }
    },
    restoreCredentials: (nifnie = null) => {
        return new Promise(async (resolve, reject) => {
            let url = 'register/reset';
            let params = [{key: 'nif', value: nifnie}];
            let response = await http_helper.callApi(url, params, "POST", true);
            if (response.status === 404) {
                reject();
            } else if (response.status === 200) {
                resolve(JSON.parse(response._bodyText));
            }
        });
    },
    getEntity: (id = null) => {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token');
            let url = 'me/entity/' + id;
            let params = [{key: 'token', value: token}];

            let response = await http_helper.callApi(url, params);
            if (response.status === 404) {
                reject();
            } else if (response.status === 200) {
                resolve(JSON.parse(response._bodyText));
            }
        });
    },
    getEntities: async (loc = null) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/entities';
        let params = [{key: 'token', value: token}];
        params.push({key: 'latitude', value: (loc && loc.coords) ? loc.coords.latitude : null});
        params.push({key: 'longitude', value: (loc && loc.coords) ? loc.coords.longitude : null});

        let response = await http_helper.callApi(url, params);

        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    getGoods: async (category = 0, order = 0, loc = null) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/goods';
        let params = [{key: 'token', value: token}, {key: 'category', value: category}, {key: 'order', value: order}];

        if (loc != null) {
            params.push({key: 'latitude', value: loc.coords.latitude});
            params.push({key: 'longitude', value: loc.coords.longitude});
        }

        let response = await http_helper.callApi(url, params);
        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    getGoodsFav: async (category = 0, order = 0, loc = null) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/goods/favourites';
        let params = [{key: 'token', value: token}, {key: 'category', value: category}, {key: 'order', value: order}];

        if (loc != null) {
            params.push({key: 'latitude', value: loc.coords.latitude});
            params.push({key: 'longitude', value: loc.coords.longitude});
        }

        let response = await http_helper.callApi(url, params);

        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    addGoodFav: async (good_id = null) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/goods/favourites/' + good_id;
        let params = [{key: 'token', value: token}];

        let response = await http_helper.callApi(url, params, "POST");

        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    deleteGoodFav: async (good_id = null) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/goods/favourites/' + good_id;
        let params = [{key: 'token', value: token}];

        let response = await http_helper.callApi(url, params, "DELETE");

        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    checkOrder: async (selected_goods = []) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/orders?token=' + token;
        let params = [{key: 'goodIds', value: selected_goods}];

        let response = await http_helper.callApi(url, params, "POST", true);

        return {status: response.status, body: JSON.parse(response._bodyText)};
    },
    newOrder: async (selected_goods = [], entityId = null, validationCode = null) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/orders?token=' + token + '&entityId=' + entityId + '&validationCode=' + validationCode;
        let params = [{key: 'goodIds', value: selected_goods}];
        let response = await http_helper.callApi(url, params, "POST", true);
        if (response.body === 409)
            return {status: response.status, body: JSON.parse(response._bodyText)};
        else return {status: response.status}
    },
    getLanguages: async () => {

        let url = 'language';
        let params = [];

        let response = await http_helper.callApi(url, params);

        if (response.status === 200) return JSON.parse(response._bodyText);
    },
    setAppLanguage: async (language = '') => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/language/interface';
        let params = [{key: 'token', value: token}, {key: 'interfaceLanguage', value: language}];

        let response = await http_helper.callApi(url, params, "PUT", true);

        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    setGoodLanguage: async (language = '') => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/language/goods';
        let params = [{key: 'token', value: token}, {key: 'goodLanguage', value: language}];

        let response = await http_helper.callApi(url, params, "PUT", true);
        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    changePassword: async (oldPassword = '', newPassword = '') => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/password';
        let params = [{key: 'token', value: token}, {key: 'oldPassword', value: oldPassword}, {
            key: 'newPassword',
            value: newPassword
        }];

        let response = await http_helper.callApi(url, params, "PUT", true);
        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    likeEntity: async (entity_id = null) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/entities/likes/' + entity_id;
        let params = [{key: 'token', value: token}];

        let response = await http_helper.callApi(url, params, "POST");

        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
    dislikeEntity: async (entity_id = null) => {

        const token = await AsyncStorage.getItem('token');

        let url = 'me/entities/likes/' + entity_id;
        let params = [{key: 'token', value: token}];

        let response = await http_helper.callApi(url, params, "DELETE");

        if (response.status === 200) return JSON.parse(response._bodyText);
        return null;
    },
};

export default API
