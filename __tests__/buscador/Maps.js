import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import mockMaps from '../../__mocks__/react-native-maps';

import Maps from '../../components/buscador/maps';

jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
test('renders maps correctly', () => {
  const tree = renderer.create(<Maps entities={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

configure({ adapter: new Adapter() });
it('goToMe is callable and returns nothing', () => {

	

	const wrapper = shallow(<Maps entities={[]} />);
	expect(wrapper.instance().goToMe()).toBe(undefined);
});

it('mapAnimateToMe is callable and returns nothing', () => {

	const wrapper = shallow(<Maps entities={[]} />);

	let instance = wrapper.instance();
	instance.map = { animateToRegion: jest.fn() };
	expect(instance.mapAnimateToMe({coords: {latitude: 0,longitude:0,latitudeDelta:0,longitudeDelta:0}})).toBe(undefined);
});

it('pointNorth is callable and returns nothing', () => {

	const wrapper = shallow(<Maps entities={[]} />);

	let instance = wrapper.instance();
	instance.map = { animateToBearing: jest.fn() };
	expect(instance.pointNorth({coords: {latitude: 0,longitude:0,latitudeDelta:0,longitudeDelta:0}})).toBe(undefined);
});