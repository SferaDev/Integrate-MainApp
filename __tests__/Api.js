import {AsyncStorage} from 'react-native';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../components/http_helper');
import API from '../components/api';

configure({adapter: new Adapter()});


describe("API tests", () => {

    describe("login() tests", () => {
        it('login() return a token', () => {
            API.login('12334', '1234').then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('login() when nifnie is missing', () => {
            API.login('', '1234').catch((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('login() when password is missing', () => {
            API.login('12334', '').catch((s) => {
                expect(typeof s).toBe('string');
            });
        });
    });
    
    describe("restoreCredentials() tests", () => {
        it('restoreCredentials() is callable and returns nothing', () => {
            API.restoreCredentials(0).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('restoreCredentials() is callable and returns nothing', () => {
            API.restoreCredentials().catch((s) => {
                expect(s).toBe(null);
            });
        });
    });

    describe("getEntity() tests", () => {

        it('getEntity() returns entities', () => {
            API.getEntity(5).then(data => {
                expect(typeof data).toBe('object');
            });
        });

        it('getEntity() returns entities', () => {
            API.getEntity(null).catch(data => {
                expect(data).toBe(undefined);
            });
        });

        it('getEntity() when token is not defined', async () => {

            await AsyncStorage.removeItem('token');
            API.getEntity(null).catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('getEntity() when token is defined', async () => {

            await AsyncStorage.setItem('token', 'SOME_TOKEN');
            API.getEntity(null).then((s) => {
                expect(typeof s).toBe("string");
            });
        });
    });

    describe("getEntities() tests", () => {

        it('getEntities() returns entities', () => {
            API.getEntities().then(data => {
                expect(typeof data).toBe('object');
            });
        });
    });

    describe("getGoods() tests", () => {

        it('getGoods() is callable and returns nothing', () => {
            API.getGoods(0, 0, null).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('getGoods() is callable and returns nothing', () => {
            API.getGoods(0, 0, {coords: {latitude: 0, longitude: 0}}).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('getGoodsFav() is callable and returns nothing', () => {
            API.getGoodsFav(0, 0, null).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('getGoodsFav() is callable and returns nothing', () => {
            API.getGoodsFav(0, 0, {coords: {latitude: 0, longitude: 0}}).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('getGoods() when token is not defined', async () => {

            await AsyncStorage.removeItem('token');
            API.getGoods(0, 0, null).catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('getGoods() when token is defined', async () => {

            await AsyncStorage.setItem('token', 'SOME_TOKEN');
            API.getGoods(0, 0, null).then((s) => {
                expect(typeof s).toBe("string");
            });
        });

        it('getGoodsFav() when token is not defined', async () => {

            await AsyncStorage.removeItem('token');
            API.getGoodsFav(0, 0, null).catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('getGoodsFav() when token is defined', async () => {

            await AsyncStorage.setItem('token', 'SOME_TOKEN');
            API.getGoodsFav(0, 0, null).then((s) => {
                expect(typeof s).toBe("string");
            });
        });
    });

    describe("addGoodFav() tests", () => {
        it('addGoodFav() is callable and returns nothing', () => {
            API.addGoodFav(0).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('addGoodFav() is callable and returns nothing', () => {
            API.addGoodFav().catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('addGoodFav() when token is not defined', async () => {

            await AsyncStorage.removeItem('token');
            API.addGoodFav(0, 0, null).catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('addGoodFav() when token is defined', async () => {

            await AsyncStorage.setItem('token', 'SOME_TOKEN');
            API.addGoodFav(0, 0, null).then((s) => {
                expect(typeof s).toBe("string");
            });
        });
    });

    describe("deleteGoodFav() tests", () => {
        it('deleteGoodFav() is callable and returns nothing', () => {
            API.deleteGoodFav(0).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('deleteGoodFav() is callable and returns nothing', () => {
            API.deleteGoodFav().catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('deleteGoodFav() when token is not defined', async () => {

            await AsyncStorage.removeItem('token');
            API.deleteGoodFav(0).catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('deleteGoodFav() when token is defined', async () => {

            await AsyncStorage.setItem('token', 'SOME_TOKEN');
            API.deleteGoodFav(0).then((s) => {
                expect(typeof s).toBe("string");
            });
        });
    });
});
