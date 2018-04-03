import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import mockMaps from '../../__mocks__/react-native-maps';

import Buscador from '../../components/buscador/buscador';

jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
test('renders buscador correctly', () => {
  const tree = renderer.create(<Buscador />).toJSON();
  expect(tree).toMatchSnapshot();
});