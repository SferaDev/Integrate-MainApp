import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import mockMaps from '../../__mocks__/react-native-maps';

import Maps from '../../components/buscador/maps';

jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
test('renders maps correctly', () => {
  const tree = renderer.create(<Maps />).toJSON();
  expect(tree).toMatchSnapshot();
});