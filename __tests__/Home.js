import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from '../components/home';

jest.mock('react-navigation', () => require.requireActual('../__mocks__/react-navigation').default);
configure({adapter: new Adapter()});

describe('Test group for Login', function () {
    beforeAll(() => {

    });

    beforeEach(function () {
        wrapper = shallow(<Home/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        wrapper = null;
        instance = null;
    });

    test('renders Home correctly', () => {

        const tree = renderer.create(<Home/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('logIn() is callable and returns nothing', () => {
        expect(instance.logIn()).toBe(undefined);
    });

    it('logOut() is callable and returns nothing', () => {
        expect(instance.logOut()).toBe(undefined);
    });
});
