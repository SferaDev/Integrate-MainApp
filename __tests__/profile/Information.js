import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Information from '../../components/profile/information';

jest.mock('../../components/http_helper');
jest.mock('../../components/api');

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;


describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
        global.lang = 'ca';
        global.updateAppLanguage = jest.fn();
        global.updateContentLanguage = jest.fn();
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

    test('setAppLanguage() is callable and returns nothing', () => {
        expect(instance.setAppLanguage()).toBe(-1);
    });

    /*test('setUserInformation() is callable and returns nothing', async() => {

          expect(await instance.setUserInformation()).toBe(undefined);
      });

    test('getAllLanguages() is callable and returns nothing', async() => {
          expect(await instance.getAllLanguages('ca')).toBe(undefined);
      });*/

    test('selectAppLanguage() is callable and returns nothing', () => {
        instance.state.appLanguages = [{iso: 'ca'}];
        expect(instance.selectAppLanguage('ca', 0)).toBe(undefined);
    });

    test('selectGoodsLanguage() is callable and returns nothing', () => {
        instance.state.goodsLanguages = [{iso: 'ca'}];
        expect(instance.selectGoodsLanguage('ca', 0)).toBe(undefined);
    });

});
