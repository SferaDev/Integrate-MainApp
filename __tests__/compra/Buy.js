import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
jest.mock('../../components/http_helper');
jest.mock('../../components/api');

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

    test('updateToast is callable and returns nothing', () => {
        expect(instance.updateToast()).toBe(undefined);
    });

    test('updateErrorState is callable and returns nothing', () => {
        let body = {soldOutGoods: [], nonUsableGoods: []};
        expect(instance.updateErrorState(body)).toBe(undefined);
    });

    describe("goValidar() tests", () => {

        test('goValidar when selected_goods length is 0 ', async () => {
            instance.state.selected_goods = [];
            expect(await instance.goValidar()).toBe(undefined);
        });

        test('goValidar when typeError is 200 ', async () => {
            instance.state.selected_goods = ['555'];
            expect(await instance.goValidar()).toBe(undefined);
        });

        test('goValidar when typeError is 409 ', async () => {
            instance.state.selected_goods = ['777'];
            expect(await instance.goValidar()).toBe(undefined);
        });
    });

    describe("onClose() tests", () => {

        test('onClose when typeError is 409 ', () => {
            instance.state.typeError = 409;
            expect(instance.onClose()).toBe(undefined);
        });

        test('onClose when typeError is default ', () => {
            instance.state.typeError = 200;
            expect(instance.onClose()).toBe(undefined);
        });
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

    describe("renderConflictGood() tests", () => {

        test('renderConflictGood does not render a good', () => {
            expect(instance.renderConflictGood(1)).toMatchSnapshot();
        });

        test('renderConflictGood renders a good correctly', () => {
            instance.state.entity.goods = [{_id: 1, productName: 'GoodTest'}];
            expect(instance.renderConflictGood(1)).toMatchSnapshot();
        });
    });


    describe("displayToastContent() tests", () => {

        test('displayToastContent to unselected good', () => {
            instance.state.typeError = 409;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });

        test('displayToastContent to selected good', () => {
            instance.state.typeError = 403;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
    });

});
