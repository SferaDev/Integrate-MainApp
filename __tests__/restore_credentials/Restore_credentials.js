import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RestoreCredentials from '../../components/restore_credentials/restore_credentials';

const navigation = {navigate: jest.fn(),goBack: jest.fn()};
let wrapper;
let instance;

describe('Test group for RestoreCredentials', function () {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the RestoreCredentials component
        wrapper = shallow(<RestoreCredentials navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders RestoreCredentials correctly', () => {

        const tree = renderer.create(<RestoreCredentials/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('restoreCredentials() is callable and returns nothing', () => {
        expect(instance.restoreCredentials()).toBe(undefined);
    });

    it('updateText() is callable and returns nothing', () => {
        expect(instance.updateText('')).toBe(undefined);
    });

    it('showError() is callable and returns nothing', () => {
        expect(instance.showError()).toBe(undefined);
    });

    it('updateError() is callable and returns nothing', () => {
        expect(instance.updateError()).toBe(undefined);
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

    it('restoreCredentials() is callable and returns nothing', () => {
        expect(instance.restoreCredentials()).toBe(undefined);
    });

    it('goToLogIn() is callable and returns nothing', () => {
        expect(instance.goToLogIn()).toBe(undefined);
    });

    describe("isEmpty() tests", () => {
        it('isEmpty() when NifNie is empty then returns true', () => {
            instance.state.nifnie = '';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when NifNie is filled then returns false', () => {
            instance.state.nifnie = '123456789';
            expect(instance.isEmpty()).toBe(false);
        });
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

    it('updateError() is callable and returns nothing', () => {
        expect(instance.showError()).toBe(undefined);
    });

});
