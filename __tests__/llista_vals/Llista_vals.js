import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LlistaVals from '../../components/llista_vals/llista_vals';

jest.mock('../../components/http_helper');

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

            instance.state.selectedIndex = 0;
            expect(await instance.getAllGoods()).toBe(undefined);
        });

        test('getAllGoods is callable and returns nothing', async () => {

            instance.state.selectedIndex = 1;
            expect(await instance.getAllGoods()).toBe(undefined);
        });

    });

    test('handleBackButton is callable and returns true', () => {
        expect(instance.handleBackButton()).toBe(true);
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

    test('showGoodDetails is callable and returns nothing', () => {
        expect(instance.showGoodDetails({_id: 0})).toBe(undefined);
    });

    test('showGoodsList is callable and returns nothing', () => {
        expect(instance.showGoodsList()).toBe(undefined);
    });

    test('renderGood renders an entity correctly', () => {

        expect(instance.renderGood({item: {id: 1}})).toMatchSnapshot();
    });

    describe("toggleFavourite() tests", () => {

        test('toggleFavourite to normal good', async () => {
            expect(await instance.toggleFavourite(1, true)).toBe(undefined);
        });

        test('toggleFavourite to fav good', async () => {
            expect(await instance.toggleFavourite(1, false)).toBe(undefined);
        });
    });

    test('setIndexChange select fav goods', () => {

        expect(instance.setIndexChange(0)).toBe(undefined);
    });

    test('setIndexChange select normal goods', () => {

        expect(instance.setIndexChange(1)).toBe(undefined);
    });

    describe("isFav() tests", () => {

        test('isFav to normal good', () => {

            instance.state.goodsFav = [
                {
                    _id: 1,
                    productName: 'name',
                    initialPrice: 24,
                    category: 2,
                    owner: {
                        name: 'NAME'
                    }
                }
            ];
            expect(instance.isFav(1)).toBe(true);
        });

        test('isFav to fav good', () => {

            instance.state.goodsFav = [
                {
                    _id: 1,
                    productName: 'name',
                    initialPrice: 24,
                    category: 2,
                    owner: {
                        name: 'NAME'
                    }
                }
            ];
            expect(instance.isFav(2)).toBe(false);
        });
    });
});
