import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Logout from "../../components/login/logout";

const navigation = {navigate: jest.fn()};


test('renders Toast correctly', () => {
    const tree = renderer.create(<Logout navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
});