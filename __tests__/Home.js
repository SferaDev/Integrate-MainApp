import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

//import {configure,shallow} from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';

import Home, {
		BuscadorStack,
		ValsStack,
		ProfileStack,
		ConfigStack,
		DrawerStack,
		DrawerNavigation,
		LoginStack
} from '../components/home';

/*test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer.create( <Home navigation={navigation} />);
});*/


it('does things', () => {
  let inst = renderer.create(React.createElement('h1', null, 'qwe'));
  expect(inst.toJSON()).toMatchSnapshot();
})

/*configure({ adapter: new Adapter() });
it('should be handling checkboxChecked', () => {
	const wrapper = shallow(<Home />);
	expect(wrapper.BuscadorStack).toBe(undefined); 
});*/
