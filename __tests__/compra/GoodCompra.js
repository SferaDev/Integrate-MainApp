import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GoodCompra from '../../components/compra/good_compra';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;
let good;

describe('Test group for good_compra', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
        good = {
            _id: 1,
            productName: 'name',
            initialPrice: 24,
        }
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<GoodCompra item={good}
                                      onPress={jest.fn()}
                                      context={this}
                                      isSelected={true}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders good_compra correctly is Selected', () => {
        const tree = renderer.create(<GoodCompra item={good}
                                                 onPress={jest.fn()}
                                                 context={this}
                                                 isSelected={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders good_compra correctly is not Selected', () => {
        const tree = renderer.create(<GoodCompra item={good}
                                                 onPress={jest.fn()}
                                                 context={this}
                                                 isSelected={false}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('selectGood is callable and returns nothing', () => {
      instance.props.item.isUsable = true;
      expect(instance.selectGood()).toBe(undefined);
    });

    test('selectGood is callable and returns nothing', () => {
      instance.props.item.isUsable = false;
      expect(instance.selectGood()).toBe(undefined);
    });
});
