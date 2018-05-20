import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../components/http_helper');

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetallsGood from '../../components/llista_vals/detalls_good';

const navigation = {
    navigate: jest.fn(),
    state: {
        params:{
            selectedGood: {
                _id: 1,
                productName: 'name',
                initialPrice: 24,
                category: 2,
                owner: {
                    name: 'NAME'
                }
            }
        }
    },
    goBack: jest.fn()
};
let wrapper;
let instance;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<DetallsGood navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<DetallsGood navigation={navigation}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('goBack is callable and returns nothing', () => {
        expect(instance.goBack()).toBe(undefined);
    });

    describe("toggleFavourite() tests", () => {

        test('toggleFavourite to normal good', async () => {
            expect(await instance.toggleFavourite(1, true)).toBe(undefined);
        });

        test('toggleFavourite to fav good', async () => {
            expect(await instance.toggleFavourite(1, false)).toBe(undefined);
        });
    });

    describe("isFav() tests", () => {

        test('isFav to normal good', () => {

            instance.state.goods = [
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

            instance.state.goods = [
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

        test('isFav when no fav goods', () => {

            expect(instance.isFav(2)).toBe(false);
        });
    });

});
