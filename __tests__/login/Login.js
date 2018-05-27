import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LogIn from '../../components/login/login';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<LogIn navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders Login correctly', () => {

        const tree = renderer.create(<LogIn/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('login() is callable and returns nothing', () => {
        expect(instance.login()).toBe(undefined);
    });

    it('autologin() when token is null is callable and returns nothing', () => {
        expect(instance.autologin(null)).toBe(undefined);
    });

    it('autologin() when token is not null is callable and returns nothing', () => {
        expect(instance.autologin("MI_TOKEN")).toBe(undefined);
    });

    it('updateNifNie() is callable and returns nothing', () => {
        expect(instance.updateNifNie('')).toBe(undefined);
    });

    it('updatePassword() is callable and returns nothing', () => {
        expect(instance.updatePassword('')).toBe(undefined);
    });

    it('showError() is callable and returns nothing', () => {
        expect(instance.showError()).toBe(undefined);
    });

    it('updateError() is callable and returns nothing', () => {
        expect(instance.updateError()).toBe(undefined);
    });

    describe("isEmpty() tests", () => {
        it('isEmpty() when NifNie and Password are empty then returns true', () => {
            instance.state.nifnie = '';
            instance.state.password = '';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when NifNie is empty and Password is filled then returns true', () => {
            instance.state.nifnie = '';
            instance.state.password = 'QWERTY1234';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when Password is empty and NifNie is empty then returns true', () => {
            instance.state.nifnie = '123456789';
            instance.state.password = '';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when NifNie and Password are filled then returns false', () => {
            instance.state.nifnie = '123456789';
            instance.state.password = 'QWERTY1234';
            expect(instance.isEmpty()).toBe(false);
        });
    });

    it('moveUp() is callable and returns nothing', () => {
        expect(instance.moveUp()).toBe(undefined);
    });

    it('moveDown() is callable and returns nothing', () => {
        expect(instance.moveDown()).toBe(undefined);
    });

    it('componentWillUnmount() is callable and returns nothing', () => {
        expect(instance.componentWillUnmount()).toBe(undefined);
    });

    it('restorePassword() is callable and returns nothing', () => {
        expect(instance.restorePassword()).toBe(undefined);
    });

    it('navigateHome() is callable and returns nothing', () => {
        expect(instance.navigateHome()).toBe(undefined);
    });

    describe("getButtonBackground() and getButtonColor() tests", () => {

        it('getButtonBackground() is callable and returns a color code', () => {
            expect(typeof instance.getButtonBackground()).toBe("string");
        });

        it('getButtonBackground() is callable and returns a color code', () => {
            instance.state.nifnie = '123456789';
            instance.state.password = 'QWERTY1234';
            expect(typeof instance.getButtonBackground()).toBe("string");
        });

        it('getButtonColor() is callable and returns a color code', () => {
            expect(typeof instance.getButtonColor()).toBe("string");
        });

        it('getButtonColor() is callable and returns a color code', () => {
            instance.state.nifnie = '123456789';
            instance.state.password = 'QWERTY1234';
            expect(typeof instance.getButtonColor()).toBe("string");
        });
    });
});
