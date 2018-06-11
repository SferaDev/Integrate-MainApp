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
        params: {}
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
            reusePeriod: 1,
            isUsable: false
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
                onPress={jest.fn()}
            />
        );
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    describe("selectGood() tests", () => {

        test('selectGood is callable and returns nothing', () => {
            expect(instance.selectGood()).toBe(undefined);
        });

        test('selectGood is callable and returns nothing where isUsable = true', () => {
            instance.props.item.isUsable = true;
            expect(instance.selectGood()).toBe(undefined);
        });
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

    describe("toggleFavourite() tests", () => {

        test('toggleFavourite is callable and returns nothing', async () => {
            expect(await instance.toggleFavourite()).toBe(false);
        });

        test('toggleFavourite is callable and returns nothing where props.toggleFavourite = undefined ', async () => {
            wrapper = shallow(
                <Good
                    type={0}
                    item={good}
                    context={this}
                    isEntityDisplay={true}
                    isFav={true}
                    isSelected={true}
                    navigation={navigation}
                    onPress={jest.fn()}
                />
            );
            instance = wrapper.instance();
            expect(await instance.toggleFavourite()).toBe(false);
        });

        test('toggleFavourite is callable and returns nothing where state.isFav = false', async () => {
            instance.state.isFav = false;
            expect(await instance.toggleFavourite()).toBe(true);
        });

        test('toggleFavourite is callable and returns nothing where props.toggleFavourite = undefined ', async () => {
            wrapper = shallow(
                <Good
                    type={0}
                    item={good}
                    context={this}
                    isEntityDisplay={true}
                    isFav={true}
                    isSelected={true}
                    navigation={navigation}
                    onPress={jest.fn()}
                    refreshLists={jest.fn()}
                />
            );
            instance = wrapper.instance();
            expect(await instance.toggleFavourite()).toBe(false);
        });
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
            let good_copy = good;
            good_copy.isUsable = false;
            wrapper = shallow(
                <Good
                    type={0}
                    item={good_copy}
                    context={this}
                    isEntityDisplay={true}
                    isFav={true}
                    isSelected={true}
                    toggleFavourite={jest.fn()}
                    navigation={navigation}
                    onPress={jest.fn()}
                />
            );
            instance = wrapper.instance();

            expect(instance.renderBuyGood()).toMatchSnapshot();
        });

        test('renderBuyGood when isUsable = true and isSelected = true ', () => {
            let good_copy = good;
            good_copy.isUsable = true;
            wrapper = shallow(
                <Good
                    type={0}
                    item={good_copy}
                    context={this}
                    isEntityDisplay={true}
                    isFav={true}
                    isSelected={true}
                    toggleFavourite={jest.fn()}
                    navigation={navigation}
                    onPress={jest.fn()}
                />
            );
            instance = wrapper.instance();

            expect(instance.renderBuyGood()).toMatchSnapshot();
        });

    });
});
