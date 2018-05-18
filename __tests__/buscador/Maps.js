import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Marker} from '../../__mocks__/react-native-maps';
import Maps from '../../components/buscador/maps';

let wrapper;
let instance;
let entity = {
            _id: 0,
            name: 'name',
            description: 'description',
            addressName: 'addressName',
            phone: '000000',
            email: 'aaa@bbb.com',
            coordinates: [0, 0],
            goods: []
        }

describe('Test group for Maps', function () {
    beforeAll(() => {

        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the Maps component
        wrapper = shallow(<Maps entities={[entity]}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders maps correctly', () => {
        const tree = renderer.create(<Maps entities={[entity]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('goToMe is callable and returns nothing', () => {
        expect(instance.goToMe()).toBe(undefined);
    });

    test('mapAnimateToMe is callable and returns nothing', () => {
        instance.map = {animateToRegion: jest.fn()};
        expect(instance.mapAnimateToMe({
            coords: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            }
        })).toBe(undefined);
    });

    test('pointNorth is callable and returns nothing', () => {
        instance.map = {animateToBearing: jest.fn()};
        expect(instance.pointNorth({
            coords: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            }
        })).toBe(undefined);
    });
});
