import {AsyncStorage} from 'react-native';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import API from '../components/api';

jest.mock('../components/http_helper');

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

        test('getGoods() is callable and returns nothing', async () => {

            let r = await API.getGoods(0, 0, {coords: {latitude: 0, longitude: 0}});
            expect(JSON.stringify(r)).toBe('{"something":"Hello World"}');
        });

        test('getGoods() is callable and returns nothing', async () => {

            let r = await API.getGoods(0, 0);
            expect(JSON.stringify(r)).toBe('{"something":"Hello World"}');
        });

        test('getGoods() is callable and returns nothing', async () => {

            let r = await API.getGoods(null, null);
            expect(r).toBe(null);
        });

        test('getGoodsFav() is callable and returns nothing', async () => {

            let r = await API.getGoodsFav(0, 0, {coords: {latitude: 0, longitude: 0}});
            expect(JSON.stringify(r)).toBe('{"something":"Hello World"}');
        });

        test('getGoodsFav() is callable and returns nothing', async () => {

            let r = await API.getGoodsFav(0, 0);
            expect(JSON.stringify(r)).toBe('{"something":"Hello World"}');
        });

        test('getGoodsFav() is callable and returns nothing', async () => {

            let r = await API.getGoodsFav(null, null);
            expect(r).toBe(null);
        });
    });

    describe("addGoodFav() tests", () => {

        test('addGoodFav() is callable and returns nothing', async () => {

            let r = await API.addGoodFav(undefined);
            expect(r).toBe(null);
        });

        test('addGoodFav() is callable and returns nothing', async () => {

            let r = await API.addGoodFav(5);
            expect(JSON.stringify(r)).toEqual('{"something":"Hello World"}');
        });
    });

    describe("deleteGoodFav() tests", () => {

        test('deleteGoodFav() is callable and returns nothing', async () => {

            let r = await API.deleteGoodFav(undefined);
            expect(r).toBe(null);
        });

        test('deleteGoodFav() is callable and returns nothing', async () => {

            let r = await API.deleteGoodFav(5);
            expect(JSON.stringify(r)).toEqual('{"something":"Hello World"}');
        });
    });

    describe("checkOrder() tests", () => {

        test('checkOrder() is callable and returns nothing', async () => {

            let r = await API.checkOrder(['555']);
            expect(JSON.stringify(r)).toBe('{"status":200,"body":{"something":"Hello World"}}');
        });
    });

    describe("newOrder() tests", () => {

        test('newOrder() is callable and returns nothing', async () => {

            let r = await API.newOrder(['555'], 1, '5555');
            expect(JSON.stringify(r)).toBe('{"status":200,"body":{"something":"Hello World"}}');
        });
    });
});
