//import {AsyncStorage} from 'react-native';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import API from '../components/api';

configure({adapter: new Adapter()});
//global.sayHello = jest.fn();

const items = {};
describe("API tests", () => {

    beforeAll(() => {
        jest.mock('react-native', () => ({

            AsyncStorage: {        

                setItem: jest.fn((item, value) => {
                    return new Promise((resolve, reject) => {        
                        items[item] = value;
                        resolve(value);
                    });
                }),
                multiSet:  jest.fn((item, value) => {
                    return new Promise((resolve, reject) => {
                        items[item] = value;
                        resolve(value);
                    });
                }),
                getItem: jest.fn((item, value) => {
                    return new Promise((resolve, reject) => {
                        resolve(items[item]);
                    });
                }),
                multiGet: jest.fn((item) => {
                    return new Promise((resolve, reject) => {
                        resolve(items[item]);
                    });
                }),
                removeItem: jest.fn((item) => {
                    return new Promise((resolve, reject) => {
                        resolve(delete items[item]);
                    });
                }),
                getAllKeys: jest.fn((items) => {
                    return new Promise((resolve) => {
                        resolve(items.keys());
                    });
                })
            }
        }));
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

            API.deleteGoodFav(0).catch((s) => {
                expect(s).toBe(null);
            });
        });

        it('deleteGoodFav() when token is defined',async () => {

            API.deleteGoodFav(0).then((s) => {
                expect(typeof s).toBe("string");
            });
        });
    });

});