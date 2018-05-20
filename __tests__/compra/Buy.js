import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
jest.mock('../../components/http_helper');

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Buy from '../../components/compra/buy';

const navigation = {
    navigate: jest.fn(),
    state: {
        params:{
            selectedEntity: {
                _id: 0
            }
        }
    },
    goBack: jest.fn()
};
let wrapper;
let instance;
let entity = {
    _id: 0,
    name: 'name',
    description: 'description',
    addressName: 'addressName',
    phone: '000000',
    email: 'aaa@bbb.com',
    coordinates: [0, 0],
    goods: []
};

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Buy navigation={navigation}/>);
        instance = wrapper.instance();
        instance.state.entity = {
            _id: 0,
            name: 'name',
            description: 'description',
            addressName: 'addressName',
            phone: '000000',
            email: 'aaa@bbb.com',
            coordinates: [0, 0],
            goods: [{_id:'555'}]
        };
        instance.map = {
            animateToRegion: jest.fn()
        }
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<Buy navigation={navigation}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('goBack is callable and returns nothing', () => {
        expect(instance.goBack()).toBe(undefined);
    });

    test('getEntity is callable and returns nothing', () => {
        expect(instance.getEntity()).toBe(undefined);
    });

    test('setEntity is callable and returns nothing', () => {
        expect(instance.setEntity(entity)).toBe(undefined);
    });

    test('renderGood renders an entity correctly', () => {

        let good = {
            _id: '1',
            productName: 'name',
            initialPrice: 24,
            category: 2,
        };
        expect(instance.renderGood(good)).toMatchSnapshot();
    });

    test('renderGood renders an entity correctly', () => {

        let good = {
            _id: '1',
            productName: 'name',
            initialPrice: 24,
            category: 2,
        };
        expect(instance.renderGood(good)).toMatchSnapshot();
    });

});
