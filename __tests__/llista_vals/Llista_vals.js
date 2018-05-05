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

    test('openMenu is callable and returns nothing', () => {
        expect(instance.setIndexChange(0)).toBe(undefined);
    });

    test('getAllGoods is callable and returns nothing', () => {
        expect(instance.getAllGoods()).toBe(undefined);
    });

    describe("getGoods() and setGoods() tests", () => {

        test('getGoods is callable and returns nothing', () => {
            expect(instance.getGoods()).toBe(undefined);
        });

        test('setGoods when fav goods are displayed', () => {

            instance.state.selectedIndex = 0;
            expect(instance.setGoods()).toBe(undefined);
        });

        test('setGoods when normal goods are displayed', () => {

            instance.state.selectedIndex = 1;
            expect(instance.setGoods()).toBe(undefined);
        });
    });

    describe("getGoodsFav() and setGoods() tests", () => {

        test('getGoodsFav is callable and returns nothing', () => {
            expect(instance.getGoodsFav()).toBe(undefined);
        });

        test('setGoodsFav when fav goods are displayed', () => {

            instance.state.selectedIndex = 0;
            expect(instance.setGoodsFav()).toBe(undefined);
        });

        test('setGoodsFav when normal goods are displayed', () => {

            instance.state.selectedIndex = 1;
            expect(instance.setGoodsFav()).toBe(undefined);
        });
    });

    test('handleBackButton is callable and returns true', () => {
        expect(instance.handleBackButton()).toBe(true);
    });

    test('selectFilter is callable and returns nothing', () => {
        expect(instance.selectFilter(0,0)).toBe(undefined);
    });

    describe("selectOrder() tests", () => {

        test('selectOrder is callable and returns nothing', () => {
            expect(instance.selectOrder(0,0)).toBe(undefined);
        });

        test('selectOrder is callable and returns nothing', () => {
            expect(instance.selectOrder(0,2)).toBe(undefined);
        });
    });

    test('renderGood renders an entity correctly', () => {

        expect(instance.renderGood({item: {id: 1}})).toMatchSnapshot();
    });

    describe("toggleFavourite() tests", () => {

        test('toggleFavourite to normal good', () => {

            instance.state.selectedIndex = 0;
            expect(instance.toggleFavourite(1)).toBe(undefined);
        });

        test('toggleFavourite to fav good', () => {

            instance.state.selectedIndex = 1;
            expect(instance.toggleFavourite(1)).toBe(undefined);
        });
    });

    test('setIndexChange select fav goods', () => {

        expect(instance.setIndexChange(0)).toBe(undefined);
    });

    test('setIndexChange select normal goods', () => {

        expect(instance.setIndexChange(1)).toBe(undefined);
    });

});
