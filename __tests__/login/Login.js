import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LogIn from '../../components/login/login';

test('renders Login correctly', () => {
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

it('updateError() is callable and returns nothing', () => {
    const wrapper = shallow(<LogIn/>);
    expect(wrapper.instance().updateError()).toBe(undefined);
});

describe("isEmpty() tests",() => {
    const wrapper = shallow(<LogIn/>);
    let instance = wrapper.instance();

    it('isEmpty() when NifNie and Password are empty then returns true', () => {
        instance.state.nifnie = '';
        instance.state.password = '';
        expect(wrapper.instance().isEmpty()).toBe(true);
    });

    it('isEmpty() when NifNie is empty and Password is filled then returns true', () => {
        instance.state.nifnie = '';
        instance.state.password = 'QWERTY1234'
        expect(wrapper.instance().isEmpty()).toBe(true);
    });

    it('isEmpty() when Password is empty and NifNie is empty then returns true', () => {
        instance.state.nifnie = '123456789';
        instance.state.password = '';
        expect(wrapper.instance().isEmpty()).toBe(true);
    });

    it('isEmpty() when NifNie and Password are filled then returns false', () => {
        instance.state.nifnie = '123456789';
        instance.state.password = 'QWERTY1234';
        expect(wrapper.instance().isEmpty()).toBe(false);
    });
});

it('moveUp() is callable and returns nothing', () => {
    const wrapper = shallow(<LogIn/>);
    expect(wrapper.instance().moveUp()).toBe(undefined);
});

it('moveDown() is callable and returns nothing', () => {
    const wrapper = shallow(<LogIn/>);
    expect(wrapper.instance().moveDown()).toBe(undefined);
});

it('componentWillUnmount() is callable and returns nothing', () => {
    const wrapper = shallow(<LogIn/>);
    expect(wrapper.instance().componentWillUnmount()).toBe(undefined);
});