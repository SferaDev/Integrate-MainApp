import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GoodValidar from '../../components/compra/good_validar';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;
let good;

describe('Test group for good_validar', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
        good = {
            _id: 1,
            productName: 'name',
            initialPrice: 24,
        };
        global.lang = 'ca';
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<GoodValidar item={good}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders good_validar correctly', () => {
        const tree = renderer.create(<GoodValidar item={good}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

});
