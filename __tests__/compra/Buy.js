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

    describe("toggleSelected() tests", () => {

        test('toggleSelected to unselected good', () => {
            instance.flatList = {};
            instance.state.selected_goods = [1];
            instance.toggleSelected(1);
            expect(instance.state.selected_goods.length).toBe(0);
        });

        test('toggleSelected to selected good', () => {
            instance.flatList = {};
            instance.state.selected_goods = [];
            instance.toggleSelected(1);
            expect(instance.state.selected_goods.length).toBe(1);
        });
    });

    test('renderGood renders an entity correctly', () => {

        let good = {
            _id: '1',
            productName: 'name',
            initialPrice: 24,
            category: 2,
        };
        expect(instance.renderGood({item:good})).toMatchSnapshot();
    });

    test('renderGood renders an entity correctly', () => {

        let good = {
            _id: '1',
            productName: 'name',
            initialPrice: 24,
            category: 2,
        };
        expect(instance.renderGood({item:good})).toMatchSnapshot();
    });

    test('extractKey is callable and returns item id', () => {
        let good = {
            _id: '1'
        };
        expect(instance.extractKey(good)).toBe('1');
    });

    test('refreshfunction is callable and returns false', () => {
        expect(instance.refreshfunction()).toBe(false);
    });

});
