import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../../components/api');
jest.mock('../../components/http_helper');

import LlistaVals from '../../components/llista_vals/llista_vals';


const navigation = {navigate: jest.fn(), addListener: jest.fn(), removeListener: jest.fn()};
let wrapper;
let instance;

const mockNavigator = {
    geolocation: {
        getCurrentPosition: jest.fn()
    }
};

global.navigator = mockNavigator;

describe('Test group for llista_vals', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
        global.lang = 'ca';
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<LlistaVals navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders llista_vals correctly', () => {
        const tree = renderer.create(<LlistaVals navigation={navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('openMenu is callable and returns nothing', () => {
        expect(instance.openMenu()).toBe(undefined);
    });

    describe("getAllGoods() tests", () => {

        test('getAllGoods is callable and returns nothing', async () => {
            expect(await instance.getAllGoods()).toBe(undefined);
        });

    });

    test('selectFilter is callable and returns nothing', () => {

        expect(instance.selectFilter(0, 0)).toBe(undefined);
    });

    describe("selectOrder() tests", () => {

        test('selectOrder is callable and returns nothing', () => {
            expect(instance.selectOrder(0, 0)).toBe(undefined);
        });

        test('selectOrder is callable and returns nothing', () => {
            expect(instance.selectOrder(0, 2)).toBe(undefined);
        });
    });

    test('renderGood renders an entity correctly', () => {

        expect(instance.renderGood({item: {id: 1}})).toMatchSnapshot();
    });

    test('setIndexChange select fav goods', () => {

        expect(instance.setIndexChange(0)).toBe(undefined);
    });

    test('extractKey is callable and returns item id', () => {
        expect(instance.extractKey({_id: 1})).toBe(1);
    });
});
