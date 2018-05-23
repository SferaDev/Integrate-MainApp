import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ChangePassword from '../../components/profile/change_password';

const navigation = {navigate: jest.fn(), goBack: jest.fn()};
let wrapper;
let instance;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        wrapper = shallow(<ChangePassword navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        wrapper = null;
        instance = null;
    });

    test('renders ChangePassword correctly', () => {

        const tree = renderer.create(<ChangePassword/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('changePassword() is callable and returns nothing', () => {
        expect(instance.changePassword()).toBe(undefined);
    });

    test('changePassword() is callable and returns nothing', () => {
        instance.state.new_password1 = 'A';
        instance.state.new_password2 = 'B';
        expect(instance.changePassword()).toBe(undefined);
    });

    test('changePassword() is callable and returns nothing', () => {
        instance.state.new_password1 = 'A';
        instance.state.new_password2 = 'A';
        expect(instance.changePassword()).toBe(undefined);
    });

    test('changePassword() is callable and returns nothing', () => {
        instance.state.new_password1 = 'aaabbbccc1';
        instance.state.new_password2 = 'aaabbbccc1';
        expect(instance.changePassword()).toBe(undefined);
    });

    test('updatePassword() is callable and returns nothing', () => {
        expect(instance.updatePassword('')).toBe(undefined);
    });

    test('updateNewPassword1() is callable and returns nothing', () => {
        expect(instance.updateNewPassword1('')).toBe(undefined);
    });

    test('updateNewPassword2() is callable and returns nothing', () => {
        expect(instance.updateNewPassword2('')).toBe(undefined);
    });

    test('goBack is callable and returns nothing', () => {
        expect(instance.goBack()).toBe(undefined);
    });

    test('handleBackButton is callable and returns true', () => {
        expect(instance.handleBackButton()).toBe(true);
    });

    describe("getButtonBackground() and getButtonColor() tests", () => {

        test('getButtonBackground() is callable and returns a color code', () => {
            expect(typeof instance.getButtonBackground()).toBe("string");
        });

        test('getButtonBackground() is callable and returns a color code', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '1234';
            expect(typeof instance.getButtonBackground()).toBe("string");
        });

        test('getButtonColor() is callable and returns a color code', () => {
            expect(typeof instance.getButtonColor()).toBe("string");
        });

        test('getButtonColor() is callable and returns a color code', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '1234';
            expect(typeof instance.getButtonColor()).toBe("string");
        });
    });

    describe("isEmpty() tests", () => {
        test('isEmpty() when password, new_password1 and new_password2 are empty then returns true', () => {
            instance.state.password = '';
            instance.state.new_password1 = '';
            instance.state.new_password2 = '';
            expect(instance.isEmpty()).toBe(true);
        });

        test('isEmpty() when password, new_password1 are empty and and new_password2 is filled then returns true', () => {
            instance.state.password = '';
            instance.state.new_password1 = '';
            instance.state.new_password2 = '1234';
            expect(instance.isEmpty()).toBe(true);
        });

        test('isEmpty() when password, new_password2 are empty and and new_password1 is filled then returns true', () => {
            instance.state.password = '';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '';
            expect(instance.isEmpty()).toBe(true);
        });

        test('isEmpty() when new_password1, new_password2 are empty and and password is filled then returns true', () => {
            instance.state.password = '1234';
            instance.state.new_password1 = '';
            instance.state.new_password2 = '';
            expect(instance.isEmpty()).toBe(true);
        });

        test('isEmpty() when password, new_password1 are filled and and new_password2 is empty then returns true', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '';
            expect(instance.isEmpty()).toBe(true);
        });

        test('isEmpty() when password, new_password2 are filled and and new_password1 is empty then returns true', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '';
            instance.state.new_password2 = '1234';
            expect(instance.isEmpty()).toBe(true);
        });

        test('isEmpty() when new_password1, new_password2 are filled and and password is empty then returns true', () => {
            instance.state.password = '';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '1234';
            expect(instance.isEmpty()).toBe(true);
        });

        test('isEmpty() when password, new_password1 and new_password2 are filled then returns false', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '1234';
            expect(instance.isEmpty()).toBe(false);
        });
    });

    test('moveUp() is callable and returns nothing', () => {
        expect(instance.moveUp()).toBe(undefined);
    });

    test('moveDown() is callable and returns nothing', () => {
        expect(instance.moveDown()).toBe(undefined);
    });

    test('componentWillUnmount() is callable and returns nothing', () => {
        expect(instance.componentWillUnmount()).toBe(undefined);
    });

    test('showError() is callable and returns nothing', () => {
        expect(instance.showError()).toBe(undefined);
    });

    test('updateError() is callable and returns nothing', () => {
        expect(instance.updateError()).toBe(undefined);
    });

    describe("hasNumber() tests", () => {
        test('hasNumber() when new password not contains a number then returns false', () => {
            instance.state.new_password1 = 'aaa';
            expect(instance.hasNumber()).toBe(false);
        });

        test('hasNumber() when new password contains a number then returns true', () => {
            instance.state.new_password1 = '123';
            expect(instance.hasNumber()).toBe(true);
        });
    });

    describe("isPasswordOk() tests", () => {
        test('isPasswordOk() when new password length is less than 8 returns false', () => {
            instance.state.new_password1 = 'aaa';
            expect(instance.isPasswordOk()).toBe(false);
        });

        test('isPasswordOk() when new password length is more or equal than 8 and not contains a number returns false', () => {
            instance.state.new_password1 = 'aaabbbccc';
            expect(instance.isPasswordOk()).toBe(false);
        });

        test('isPasswordOk() when new password length is more or equal than 8 and contains a number returns true', () => {
            instance.state.new_password1 = 'aaabbbccc1';
            expect(instance.isPasswordOk()).toBe(true);
        });
    });

    describe("displayToastContent() tests", () => {
        test('displayToastContent typeError = 1 renders toast correctly', () => {
            instance.state.typeError = 1;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
        test('displayToastContent typeError = 2 renders toast correctly', () => {
            instance.state.typeError = 2;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
        test('displayToastContent typeError = default renders toast correctly', () => {
            instance.state.typeError = 0;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
        test('displayToastContent typeError = default renders toast correctly', () => {
            instance.state.typeError = 3;
            expect(instance.displayToastContent()).toMatchSnapshot();
        });
    });

});
