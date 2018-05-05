import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';

test('renders correctly', () => {
    const navigation = {navigate: jest.fn()};
    const tree = renderer.create(<App navigation={navigation}/>);
});

configure({adapter: new Adapter()});
it('should be handling checkboxChecked', () => {
    const navigation = {navigate: jest.fn()};
    const wrapper = shallow(<App navigation={navigation}/>);
    expect(wrapper.instance().openNav()).toBe(undefined);
});