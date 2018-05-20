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
            instance.state.isFav = true;
            expect(await instance.toggleFavourite(1)).toBe(undefined);
        });

        test('toggleFavourite to fav good', async () => {
            instance.state.isFav = false;
            expect(await instance.toggleFavourite(1)).toBe(undefined);
        });
    });

});
