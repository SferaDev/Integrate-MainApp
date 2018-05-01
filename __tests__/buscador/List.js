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

    test('componentDidUpdate is callable and returns nothing', () => {
        
        expect(instance.componentDidUpdate({},{})).toBe(undefined);
    });

    test('calcDistance computes the euclidian distance between two coordinates', () => {
        let latitude = 4;
        let longitude = 3;
        instance.coords = {
            latitude: 0,
            longitude: 0
        };
        expect(instance.calcDistance(latitude,longitude)).toBe(5);
    });

    test('sortByCoords two entities by its distance when a is closer', () => {
        let a = {
            addressLatitude: 4,
            addressLongitude: 4
        };
        let b = {
            addressLatitude: 5,
            addressLongitude: 5
        };
        instance.coords = {
            latitude: 0,
            longitude: 0
        };
        expect(instance.sortByCoords(a,b)).toBe(-1);
    });

    test('sortByCoords two entities by its distance when b is closer', () => {
        let a = {
            addressLatitude: 4,
            addressLongitude: 4
        };
        let b = {
            addressLatitude: 3,
            addressLongitude: 3
        };
        instance.coords = {
            latitude: 0,
            longitude: 0
        };
        expect(instance.sortByCoords(a,b)).toBe(1);
    });

    test('sortEntities sorts the entities by proximity', () => {
        let loc = {
            coords: {
                latitude: 0,
                longitude: 0
            }
        }
        instance.props.entities = [
            {
                id: 1,
                name: 'UPC',
                addressLatitude: 41.391501,
                addressLongitude: 2.113283
            },
            {
                id: 2,
                name: 'NOT UPC',
                addressLatitude: 81.391501,
                addressLongitude: 8.113283,
            }
        ];
        expect(instance.sortEntities(loc)).toBe(undefined);
    });
});

