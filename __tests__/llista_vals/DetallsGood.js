import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../components/http_helper');

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetallsGood from '../../components/llista_vals/detalls_good';

const navigation = {navigate: jest.fn()};
const good = {
    _id: 1,
    productName: 'name',
    initialPrice: 24,
    category: 2,
    owner: {
        name: 'NAME'
    }
}

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<DetallsGood navigation={navigation} good={good} isFav={true} showGoodsList={jest.fn()} toggleFavourite={jest.fn()} context={this} />);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<DetallsGood good={good} isFav={true} showGoodsList={jest.fn()} toggleFavourite={jest.fn()} context={this} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<DetallsGood good={good} isFav={false} showGoodsList={jest.fn()} toggleFavourite={jest.fn()} context={this} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('showEntity is callable and returns nothing', () => {
        expect(instance.showEntity()).toBe(undefined);
    });

});
