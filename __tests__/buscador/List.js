import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EntityList from '../../components/buscador/list';

test('renders list correctly', () => {
  const tree = renderer.create(<EntityList entities={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

configure({ adapter: new Adapter() });
it('renderEntity renders an entity correctly', () => {

	const wrapper = shallow(<EntityList entities={[]} />);
	expect(wrapper.instance().renderEntity(1)).toMatchSnapshot();
});
