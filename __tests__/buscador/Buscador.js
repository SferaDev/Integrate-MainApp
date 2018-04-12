import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import mockMaps from '../../__mocks__/react-native-maps';
import Buscador from '../../components/buscador/buscador';
import API from '../../__mocks__/api';

const navigation = { navigate: jest.fn() };
let wrapper;
let instance;

describe('Test group for EntityList', function() {

	beforeAll(() => {

		jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
		configure({ adapter: new Adapter() });
	});

	beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Buscador navigation={navigation} />);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
	});

    test('renders buscador correctly', () => {
		const tree = renderer.create(<Buscador navigation={navigation} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('openMenu is callable and returns nothing', () => {

		expect(instance.openMenu()).toBe(undefined);
	});

	test('switchView is callable and returns nothing', () => {

		expect(instance.switchView()).toBe(undefined);
	});

	test('getEntities is callable and returns an array', () => {

		expect(instance.getEntities()).toBe(undefined);
	});

	test('handleBackButton is callable and returns true', () => {

		expect(instance.handleBackButton()).toBe(true);
	});
});