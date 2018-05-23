import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Validar from '../../components/compra/validar';

jest.mock('../../components/http_helper');
jest.mock('../../components/api');

const navigation = {
    navigate: jest.fn(),
    state: {
        params: {
            entity: {
                _id: 0,
                goods: []
            },
            selected_goods: ['555'],
            total_discount: 0
        }
    },
    goBack: jest.fn(),
    pop: jest.fn()
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

describe('Test group for Validar', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Validar visible={true} onClose={jest.fn()} navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders Validar correctly when visible', () => {
        const tree = renderer.create(<Validar visible={true} onClose={jest.fn()} navigation={navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });


    test('renders Validar correctly when hidden', () => {
        const tree = renderer.create(<Validar visible={false} onClose={jest.fn()} navigation={navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('updateCode() is callable and returns nothing', () => {
        expect(instance.updateCode('')).toBe(undefined);
    });

    test('isEmpty() when Code empty then returns true', () => {
        instance.state.code = '';
        expect(instance.isEmpty()).toBe(true);
    });

    test('isEmpty() when Code is not empty then returns false', () => {
        instance.state.code = 'QWERTY';
        expect(instance.isEmpty()).toBe(false);
    });

    describe("getButtonBackground() and getButtonColor() tests", () => {
        test('getButtonBackground() is callable and returns a color code', () => {
            expect(typeof instance.getButtonBackground()).toBe("string");
        });

        test('getButtonBackground() is callable and returns a color code', () => {
            instance.state.code = 'QWERTY';
            expect(typeof instance.getButtonBackground()).toBe("string");
        });

        test('getButtonColor() is callable and returns a color code', () => {
            expect(typeof instance.getButtonColor()).toBe("string");
        });

        test('getButtonColor() is callable and returns a color code', () => {
            instance.state.code = 'QWERTY';
            expect(typeof instance.getButtonColor()).toBe("string");
        });
    });

    test('goBack is callable and returns nothing', () => {
        expect(instance.goBack()).toBe(undefined);
    });

    test('goDoubleBack is callable and returns nothing', () => {
        expect(instance.goDoubleBack()).toBe(undefined);
    });

    test('moveUp() is callable and returns nothing', () => {
        expect(instance.moveUp()).toBe(undefined);
    });

    test('moveDown() is callable and returns nothing', () => {
        expect(instance.moveDown()).toBe(undefined);
    });

    test('updateToast is callable and returns nothing', () => {
        expect(instance.updateToast()).toBe(undefined);
    });

    test('updateErrorState is callable and returns nothing', () => {
        let body = {soldOutGoods: [], nonUsableGoods: []};
        expect(instance.updateErrorState(body)).toBe(undefined);
    });

    describe("validar() tests", () => {

        test('validar when typeError is 201 ', async () => {
            const navigation = {
                navigate: jest.fn(),
                state: {
                    params: {
                        entity: {
                            _id: 0,
                            goods: []
                        },
                        selected_goods: ['555'],
                        total_discount: 0
                    }
                },
                goBack: jest.fn()
            };
            let wrapper = shallow(<Validar visible={true} onClose={jest.fn()} navigation={navigation}/>);
            let instance = wrapper.instance();
            expect(await instance.validar()).toBe(undefined);
        });

        test('validar when typeError is 403 ', async () => {
            instance.state.entity._id = undefined;
            instance.state.code = '';
            expect(await instance.validar()).toBe(undefined);
        });

        test('validar when typeError is 409 ', async () => {
            const navigation = {
                navigate: jest.fn(),
                state: {
                    params: {
                        entity: {
                            _id: 0,
                            goods: []
                        },
                        selected_goods: ['777'],
                        total_discount: 0
                    }
                },
                goBack: jest.fn()
            };
            let wrapper = shallow(<Validar visible={true} onClose={jest.fn()} navigation={navigation}/>);
            let instance = wrapper.instance();
            expect(await instance.validar()).toBe(undefined);
        });
    });

    describe("onClose()  tests", () => {
        test('onClose typeError = 201 renders toast correctly', () => {
            instance.state.typeError = 201;
            expect(instance.onClose()).toBe(undefined);
        });
        test('onClose typeError = 403 renders toast correctly', () => {
            instance.state.typeError = 403;
            expect(instance.onClose()).toBe(undefined);
        });
        test('onClose typeError = 409 renders toast correctly', () => {
            instance.state.typeError = 409;
            expect(instance.onClose()).toBe(undefined);
        });
        test('onClose typeError is default renders toast correctly', () => {
            instance.state.typeError = 500;
            expect(instance.onClose()).toBe(undefined);
        });
    });

    describe("renderGood() tests", () => {

        test('renderGood does not render a good', () => {
            instance.state.entity.goods = [{_id: 2, productName: 'GoodTest'}];
            expect(instance.renderGood({item: 1})).toMatchSnapshot();
        });

        test('renderGood renders a good correctly', () => {
            instance.state.entity.goods = [{_id: 1, productName: 'GoodTest'}];
            expect(instance.renderGood({item: 1})).toMatchSnapshot();
        });
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
        test('displayToastContent typeError = 201 renders toast correctly', () => {
            instance.state.typeError = 201;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
        test('displayToastContent typeError = 403 renders toast correctly', () => {
            instance.state.typeError = 403;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
        test('displayToastContent typeError = 409 renders toast correctly', () => {
            instance.state.typeError = 409;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
        test('displayToastContent typeError = default renders toast correctly', () => {
            instance.state.typeError = 500;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
    });

    test('extractKey is callable and returns item id', () => {
        expect(instance.extractKey(1)).toBe(1);
    });

});
