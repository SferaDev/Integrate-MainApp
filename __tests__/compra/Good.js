import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../components/http_helper');

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Good from '../../components/compra/good';

const navigation = {
    navigate: jest.fn(),
    state: {
        params: {

        }
    },
    goBack: jest.fn()
};
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
            },
            reusePeriod: 1
        };
        global.lang = 'ca';
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(
            <Good
                type={0}
                item={good}
                context={this}
                isEntityDisplay={true}
                isFav={true}
                isSelected={false}
                toggleFavourite={jest.fn()}
                navigation={navigation}
            />
        );
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

    test('getPeriodText is callable and returns nothing', () => {
        expect(typeof instance.getPeriodText()).toBe("string");
    });

    test('getDiscountText is callable and returns nothing', () => {
        expect(typeof instance.getDiscountText()).toBe("string");
    });

    test('showGoodDetails is callable and returns nothing', () => {
        expect(instance.showGoodDetails()).toBe(undefined);
    });

    test('toggleFavourite is callable and returns nothing',async () => {
        expect(await instance.toggleFavourite()).toBe(false);
    });

    describe("renderGood() tests", () => {

        test('renderGood when type = 1 ', () => {
            expect(instance.renderGood(1)).toMatchSnapshot();
        });

        test('renderGood when type = 2 ', () => {
            expect(instance.renderGood(2)).toMatchSnapshot();
        });

        test('renderGood when type is != 1 and != 2 ', () => {
            expect(instance.renderGood(0)).toMatchSnapshot();
        });
    });

    describe("renderBuyGood() tests", () => {

        test('renderBuyGood when isUsable = false ', () => {
            instance.props.item.isUsable = true;
            expect(instance.renderBuyGood()).toMatchSnapshot();
        });

        test('renderBuyGood when isUsable = true and isSelected = true ', () => {
            instance.props.item.isUsable = true;
            instance.props.isSelected = true;
            expect(instance.renderBuyGood()).toMatchSnapshot();
        });

        test('renderBuyGood when isUsable = true and isSelected = false', () => {
            instance.props.item.isUsable = true;
            instance.props.isSelected = false;
            expect(instance.renderBuyGood()).toMatchSnapshot();
        });
    });
});
