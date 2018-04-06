import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LogIn from '../../components/login/login';

test('renders buscador correctly', () => {
    const tree = renderer.create(<LogIn/>).toJSON();
    expect(tree).toMatchSnapshot();
});

configure({ adapter: new Adapter() });

it('login() is callable and returns nothing', () => {
    const wrapper = shallow(<LogIn/>);
    expect(wrapper.instance().login()).toBe(undefined);
});

it('updateNifNie() is callable and returns nothing', () => {
    const wrapper = shallow(<LogIn/>);
    expect(wrapper.instance().updateNifNie('')).toBe(undefined);
});

it('updatePassword() is callable and returns nothing', () => {
    const wrapper = shallow(<LogIn/>);
    expect(wrapper.instance().updatePassword('')).toBe(undefined);
});