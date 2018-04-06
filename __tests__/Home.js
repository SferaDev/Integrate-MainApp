import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from '../components/home';

//NavigationContainer

/*jest.mock('react-navigation', () => {
  const mockComponent = require('../__mocks__/react-navigation');
  return mockComponent('react-navigation');
});*/
jest.mock('react-navigation', () => require.requireActual('../__mocks__/react-navigation').default);

configure({ adapter: new Adapter() });
it('openMenu is callable and returns nothing', () => {
	const tree = renderer.create(<Home />).toJSON();
	expect(tree).toMatchSnapshot();
});