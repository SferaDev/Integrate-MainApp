import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ChangePassword from '../../components/profile/change_password';

const navigation = {navigate: jest.fn()};
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

    it('changePassword() is callable and returns nothing', () => {
        expect(instance.changePassword()).toBe(undefined);
    });

    it('changePassword() is callable and returns nothing', () => {
        instance.state.new_password1 = 'A';
        instance.state.new_password2 = 'B';
        expect(instance.changePassword()).toBe(undefined);
    });

    it('updatePassword() is callable and returns nothing', () => {
        expect(instance.updatePassword('')).toBe(undefined);
    });

    it('updateNewPassword1() is callable and returns nothing', () => {
        expect(instance.updateNewPassword1('')).toBe(undefined);
    });

    it('updateNewPassword2() is callable and returns nothing', () => {
        expect(instance.updateNewPassword2('')).toBe(undefined);
    });

    test('openMenu is callable and returns nothing', () => {
        expect(instance.openMenu()).toBe(undefined);
    });

    test('handleBackButton is callable and returns true', () => {
        expect(instance.handleBackButton()).toBe(true);
    });

    describe("getButtonBackground() and getButtonColor() tests", () => {

        it('getButtonBackground() is callable and returns a color code', () => {
            expect(typeof instance.getButtonBackground()).toBe("string");
        });

        it('getButtonBackground() is callable and returns a color code', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '1234';
            expect(typeof instance.getButtonBackground()).toBe("string");
        });

        it('getButtonColor() is callable and returns a color code', () => {
            expect(typeof instance.getButtonColor()).toBe("string");
        });

        it('getButtonColor() is callable and returns a color code', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '1234';
            expect(typeof instance.getButtonColor()).toBe("string");
        });
    });

    describe("isEmpty() tests", () => {
        it('isEmpty() when password, new_password1 and new_password2 are empty then returns true', () => {
            instance.state.password = '';
            instance.state.new_password1 = '';
            instance.state.new_password2 = '';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when password, new_password1 are empty and and new_password2 is filled then returns true', () => {
            instance.state.password = '';
            instance.state.new_password1 = '';
            instance.state.new_password2 = '1234';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when password, new_password2 are empty and and new_password1 is filled then returns true', () => {
            instance.state.password = '';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when new_password1, new_password2 are empty and and password is filled then returns true', () => {
            instance.state.password = '1234';
            instance.state.new_password1 = '';
            instance.state.new_password2 = '';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when password, new_password1 are filled and and new_password2 is empty then returns true', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when password, new_password2 are filled and and new_password1 is empty then returns true', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '';
            instance.state.new_password2 = '1234';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when new_password1, new_password2 are filled and and password is empty then returns true', () => {
            instance.state.password = '';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '1234';
            expect(instance.isEmpty()).toBe(true);
        });

        it('isEmpty() when password, new_password1 and new_password2 are filled then returns false', () => {
            instance.state.password = '28';
            instance.state.new_password1 = '1234';
            instance.state.new_password2 = '1234';
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

    it('showError() is callable and returns nothing', () => {
        expect(instance.showError()).toBe(undefined);
    });

    it('updateError() is callable and returns nothing', () => {
        expect(instance.updateError()).toBe(undefined);
    });
});
