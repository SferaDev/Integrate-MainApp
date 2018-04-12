import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MapView, { Marker } from '../../__mocks__/react-native-maps';
import Maps from '../../components/buscador/maps';

let wrapper;
let instance;

describe('Test group for Maps', function() {

	beforeAll(() => {

		jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
		configure({ adapter: new Adapter() });
	});

	beforeEach(function () {
        // Before each: Shallows the Maps component
        wrapper = shallow(<Maps entities={[]} />);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
	});


    test('goToMe is callable and returns nothing', () => {

		const tree = renderer.create(<Maps entities={[]} />).toJSON();
  		expect(tree).toMatchSnapshot();
	});

	test('goToMe is callable and returns nothing', () => {

		expect(instance.goToMe()).toBe(undefined);
	});

	test('mapAnimateToMe is callable and returns nothing', () => {

		instance.map = { animateToRegion: jest.fn() };
		expect(instance.mapAnimateToMe({coords: {latitude: 0,longitude:0,latitudeDelta:0,longitudeDelta:0}})).toBe(undefined);
	});

	test('pointNorth is callable and returns nothing', () => {

		instance.map = { animateToBearing: jest.fn() };
		expect(instance.pointNorth({coords: {latitude: 0,longitude:0,latitudeDelta:0,longitudeDelta:0}})).toBe(undefined);
	});

	/*test('renderMarker returns a Marker well-rendered', () => {

		let e = {	
		        	id: 1,
					nif: '12345678A',
					salesmanFirstName: 'John',
					salesmanLastName: 'Doe',
					email: 'email@email.com',
					name: 'UPC',
					description: 'Universitat Politecnica de Catalunya',
					addressName: 'C/ Jordi Girona',
					addressLatitude: 41.391501,
					addressLongitude: 2.113283,
					phone: '963852741',
					picture: ''
				};

		let marker = instance.renderMarker(e);
		console.log(marker);
	});*/
});
