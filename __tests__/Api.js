import {AsyncStorage} from 'react-native';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import API from '../components/api';

configure({adapter: new Adapter()});
jest.mock('../components/http_helper');

describe("API tests", () => {

    beforeAll(() => {
        
    });

    beforeEach(function () {

    });

    afterEach(function () {

    });

    describe("getEntities() tests", () => {

        test('getEntities() returns entities', () => {
            API.getEntities().then(data => {
                expect(typeof data).toBe('object');
            });
        });
    });

    describe("getEntities() tests", () => {

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

    describe("getGoods() tests", () => {

        it('getGoods() is callable and returns nothing', () => {
            API.getGoods(0,0,null).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('getGoodsFav() is callable and returns nothing', () => {
            API.getGoodsFav(0,0,null).then((s) => {
                expect(typeof s).toBe('string');
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
    });

    describe("deleteGoodFav() tests", () => {

        it('deleteGoodFav() is callable and returns nothing', () => {
            API.addGoodFav(0).then((s) => {
                expect(typeof s).toBe('string');
            });
        });

        it('deleteGoodFav() is callable and returns nothing', () => {
            API.deleteGoodFav().catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('deleteGoodFav() when token is not defined',async () => {

            AsyncStorage.removeItem('token');
            API.deleteGoodFav(0).catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('deleteGoodFav() when token is defined',async () => {

            AsyncStorage.setItem('token','SOME_TOKEN');
            API.deleteGoodFav(0).then((s) => {
                expect(typeof s).toBe("string");
            });
        });
    });

});