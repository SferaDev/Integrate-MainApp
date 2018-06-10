import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drawer from '../components/drawer';

jest.mock('../components/http_helper');

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
        global.lang = 'ca';
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Drawer navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders buscador correctly', () => {
        const tree = renderer.create(<Drawer navigation={navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('navigateToScreen() is callable and returns nothing', async () => {
        expect(await instance.updateAppLanguage('ca')).toBe(undefined);
    });

    test('navigateToScreen() is callable and returns nothing', async () => {
        expect(await instance.updateContentLanguage('ca')).toBe(undefined);
    });

    test('navigateToScreen() is callable and returns nothing', () => {
        expect(instance.navigateToScreen()).toBe(undefined);
    });

    test('logOut() is callable and returns nothing', () => {
        expect(instance.logOut()).toBe(undefined);
    });

});
