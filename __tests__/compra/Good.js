import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Good from '../../components/compra/good';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;
let good;

describe('Test group for good', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
        good = {
            _id: 1,
            productName: 'name',
            initialPrice: 24,
            category: 2,
            owner: {
                name: 'NAME'
            }
        };
        global.lang = 'ca';
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Good
                                type={0}
                                item={good}
                                context={this}
                                isEntityDisplay={true}
                                isFav={true}
                                toggleFavourite={jest.fn()}
                                navigation={jest.fn()}  //No ho tinc clar
        />);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('selectGood is callable and returns nothing', () => {
        expect(instance.selectGood()).toBe(undefined);
    });

    /*test('getPeriodText is callable and returns nothing', () => {
        expect(instance.getPeriodText()).toBe(undefined);
    });

    test('getDiscountText is callable and returns nothing', () => {
        expect(instance.getDiscountText()).toBe(undefined);
    });*/

    test('showGoodDetails is callable and returns nothing', () => {
        expect(instance.showGoodDetails()).toBe(undefined);
    });

    test('toggleFavourite is callable and returns nothing', () => {
        expect(instance.toggleFavourite()).toBe(undefined);
    });

    /*describe("renderGood() tests", () => {

        test('renderGood when type = 1 ', () => {
            expect(instance.renderGood(1)).toBe(undefined);
        });

        test('renderGood when type = 2 ', () => {
            expect(instance.renderGood(2)).toBe(undefined);
        });

        test('renderGood when type is != 1 and != 2 ', () => {
            expect(instance.renderGood(3)).toBe(undefined);
        });
    });*/
});
