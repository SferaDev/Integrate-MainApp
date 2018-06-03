import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Profile from '../../components/profile/profile';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;

describe('Test group for Profile', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
        global.lang = 'ca';
    });

    beforeEach(function () {
        wrapper = shallow(<Profile navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        wrapper = null;
        instance = null;
    });

    test('renders Information correctly', () => {

        const tree = renderer.create(<Profile/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('componentWillUnmount() is callable and returns nothing', () => {
        expect(instance.componentWillUnmount()).toBe(undefined);
    });

    test('moveUp() is callable and returns nothing', () => {
        expect(instance.moveUp()).toBe(undefined);
    });

    test('moveDown() is callable and returns nothing', () => {
        expect(instance.moveDown()).toBe(undefined);
    });

    test('openMenu is callable and returns nothing', () => {
        expect(instance.openMenu()).toBe(undefined);
    });

    test('setActiveTab is callable and returns nothing', () => {
        instance.sv = {scrollTo: jest.fn()};
        expect(instance.setActiveTab()).toBe(undefined);
    });

    describe("activeTabStyles() tests", () => {
        test('activeTabStyles() when is active tab then returns true', () => {
            instance.state.tabActive = 1;
            expect( JSON.stringify(instance.activeTabStyles(1)) ).toBe( JSON.stringify({color:'white',backgroundColor:'#094671'}) );
        });

        test('activeTabStyles() when is not active tab then returns true', () => {
            instance.state.tabActive = 1;
            expect( JSON.stringify(instance.activeTabStyles(2)) ).toBe( JSON.stringify({color:'#98B353',backgroundColor:'#F4F3F2'}) );
        });
    });

});
