import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LlistaVals from '../../components/llista_vals/llista_vals';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;

const mockNavigator = {
    geolocation: {
        getCurrentPosition: jest.fn()
    }
}

global.navigator = mockNavigator;

describe('Test group for llista_vals', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
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

    test('getGoods is callable and returns nothing', () => {
        expect(instance.getGoods()).toBe(undefined);
    });

    test('setGoods is callable and returns nothing', () => {
        expect(instance.setGoods()).toBe(undefined);
    });

    test('handleBackButton is callable and returns true', () => {
        expect(instance.handleBackButton()).toBe(true);
    });

    describe("selectFilterOrder() tests", () => {

        test('selectFilterOrder is callable and returns nothing', () => {
            expect(instance.selectFilterOrder()).toBe(undefined);
        });

        test('selectFilterOrder is callable and returns nothing', () => {
            expect(instance.selectFilterOrder(0)).toBe(undefined);
        });

        test('selectFilterOrder is callable and returns nothing', () => {
            expect(instance.selectFilterOrder(1)).toBe(undefined);
        });

        test('selectFilterOrder is callable and returns nothing', () => {
            expect(instance.selectFilterOrder(1, 2)).toBe(undefined);
        });
    });

    test('renderGood renders an entity correctly', () => {

        expect(instance.renderGood({item: {id: 1}})).toMatchSnapshot();
    });

});
