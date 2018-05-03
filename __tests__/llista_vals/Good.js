import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Good from '../../components/llista_vals/good';

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
        }
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Good item={good}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders good correctly', () => {
        const tree = renderer.create(<Good item={good}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('addFavourites() when token is null is callable and returns nothing', () => {
        expect(instance.addFavourites(null)).toBe(undefined);
    });
});
