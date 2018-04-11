import 'react-native';
import React from 'react';
import RestoreCredentials from '../../components/restore_credentials/restore_credentials';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <RestoreCredentials />
    );
});

configure({ adapter: new Adapter() });
it('updateText works correctly', () => {
    const wrapper = shallow(<RestoreCredentials/>);
    expect(wrapper.instance().updateText("pass")).toBe(undefined);
});

configure({ adapter: new Adapter() });
it('buttonPressed works correctly', () => {
    const wrapper = shallow(<RestoreCredentials/>);
    expect(wrapper.instance().buttonPressed()).toBe(undefined);
});

it('updateError() is callable and returns nothing', () => {
    const wrapper = shallow(<RestoreCredentials/>);
    expect(wrapper.instance().updateError()).toBe(undefined);
});

describe("isEmpty() tests",() => {

    const wrapper = shallow(<RestoreCredentials/>);
    let instance = wrapper.instance();

    it('isEmpty() when NifNie is empty then returns true', () => {
        instance.state.nifnie = '';
        expect(wrapper.instance().isEmpty()).toBe(true);
    });

    it('isEmpty() when NifNie is filled then returns false', () => {
        instance.state.nifnie = '123456789';
        expect(wrapper.instance().isEmpty()).toBe(false);
    });
});