import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Information from '../../components/profile/information';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        wrapper = shallow(<Information navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        wrapper = null;
        instance = null;
    });

    test('renders Information correctly', () => {

        const tree = renderer.create(<Information/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('openMenu is callable and returns nothing', () => {
        expect(instance.openMenu()).toBe(undefined);
    });

    test('handleBackButton is callable and returns true', () => {
        expect(instance.handleBackButton()).toBe(true);
    });

    test('goToChangePassword() is callable and returns nothing', () => {
        expect(instance.goToChangePassword()).toBe(undefined);
    });

    test('selectAppLanguage() is callable and returns nothing', () => {
        instance.appLanguages = [{iso: 'es'}];
        expect(instance.selectAppLanguage('',0)).toBe(undefined);
    });

    test('selectGoodsLanguage() is callable and returns nothing', () => {
        expect(instance.selectGoodsLanguage()).toBe(undefined);
    });

});
