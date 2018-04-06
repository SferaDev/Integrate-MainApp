import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import mockMaps from '../../__mocks__/react-native-maps';
import Buscador from '../../components/buscador/buscador';

jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);

const navigation = { navigate: jest.fn() };
test('renders buscador correctly', () => {
	const tree = renderer.create(<Buscador navigation={navigation} />).toJSON();
	expect(tree).toMatchSnapshot();
});

configure({ adapter: new Adapter() });
it('openMenu is callable and returns nothing', () => {
	const wrapper = shallow(<Buscador navigation={navigation} />);
	expect(wrapper.instance().openMenu()).toBe(undefined);
});