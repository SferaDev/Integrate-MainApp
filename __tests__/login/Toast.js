import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Toast from '../../components/login/login';

test('renders Toast correctly', () => {
    const tree = renderer.create(<Toast visible={true} onClose={jest.fn()}/>).toJSON();
    expect(tree).toMatchSnapshot();
});