import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Help from '../../components/profile/help';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;

describe('Test group for Help', function () {

    beforeAll(() => {
        configure({adapter: new Adapter()});
        global.lang = 'ca';
    });

    beforeEach(function () {
        wrapper = shallow(<Help navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        wrapper = null;
        instance = null;
    });

    test('renders Help correctly', () => {

        const tree = renderer.create(<Help/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('openMenu is callable and returns nothing', () => {
        expect(instance.openMenu()).toBe(undefined);
    });
});
