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
            owner: {
                name: 'NAME'
            }
        };
        global.lang = 'ca';
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Good item={good} onToggleFav={jest.fn()} onPress={jest.fn()} context={this} id={0}
                                isFav={true}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders normal good correctly', () => {
        good.isUsable = true;
        const tree = renderer.create(<Good item={good} onToggleFav={jest.fn()} onPress={jest.fn()} context={this} id={0}
                                           isFav={false}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders normal unsuable good correctly', () => {
        good.isUsable = false;
        const tree = renderer.create(<Good item={good} onToggleFav={jest.fn()} onPress={jest.fn()} context={this} id={0}
                                           isFav={false}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders fav good correctly', () => {
        const tree = renderer.create(<Good item={good} onToggleFav={jest.fn()} onPress={jest.fn()} context={this} id={0}
                                           isFav={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders fav good correctly', () => {
        const tree = renderer.create(<Good item={good} onToggleFav={jest.fn()} onPress={jest.fn()} context={this} id={0}
                                           isFav={true} isEntityDisplay={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

});
