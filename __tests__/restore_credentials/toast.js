import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toast from '../../components/restore_credentials/toast';

describe('Test group for Toast', function () {

    beforeAll(() => {

        configure({adapter: new Adapter()});
    });

    test('renders Toast correctly when visible', () => {
        const tree = renderer.create(<Toast visible={true} onClose={jest.fn()}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });


    test('renders Toast correctly when hidden', () => {
        const tree = renderer.create(<Toast visible={false} onClose={jest.fn()}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('isVisible is callable and returns "flex"', () => {
        let wrapper = shallow(<Toast visible={true} onClose={jest.fn()}/>);
        let instance = wrapper.instance();
        expect(instance.isVisible()).toBe("flex");
    });

    test('isVisible is callable and returns "none"', () => {
        let wrapper = shallow(<Toast visible={false} onClose={jest.fn()}/>);
        let instance = wrapper.instance();
        expect(instance.isVisible()).toBe("none");
    });
});