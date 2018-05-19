import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Validar from '../../components/compra/validar';

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
        const tree = renderer.create(<Validar visible={true} onClose={jest.fn()}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });


    test('renders Validar correctly when hidden', () => {
        const tree = renderer.create(<Validar visible={false} onClose={jest.fn()}/>).toJSON();
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

    test('moveUp() is callable and returns nothing', () => {
        expect(instance.moveUp()).toBe(undefined);
    });

    test('moveDown() is callable and returns nothing', () => {
        expect(instance.moveDown()).toBe(undefined);
    });

    test('renderGood renders an entity correctly', () => {
        expect(instance.renderGood({item: {id: 1}})).toMatchSnapshot();
    });

    /*describe("isVisible() tests", () => {
        test('isVisible is callable and returns "flex"', () => {
            let wrapper = shallow(<Validar visible={true} onClose={jest.fn()}/>);
            let instance = wrapper.instance();
            expect(instance.isVisible()).toBe("flex");
        });

        test('isVisible is callable and returns "none"', () => {

            let wrapper = shallow(<Validar visible={false} onClose={jest.fn()}/>);
            let instance = wrapper.instance();
            expect(instance.isVisible()).toBe("none");
        });
    });*/

});
