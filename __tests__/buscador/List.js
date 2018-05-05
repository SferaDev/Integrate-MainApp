import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EntityList from '../../components/buscador/list';

let wrapper;
let instance;

const mockNavigator = {
    geolocation: {
        getCurrentPosition: jest.fn()
    }
}

global.navigator = mockNavigator;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<EntityList entities={[]}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders list correctly', () => {
        const tree = renderer.create(<EntityList entities={[]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renderEntity renders an entity correctly', () => {
        expect(instance.renderEntity({item: {id: 1}})).toMatchSnapshot();
    });
});

