import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MarkerList from '../../components/buscador/marker_list';

let wrapper;
let instance;

describe('Test group for MarkerList', function () {

    beforeAll(() => {

        //jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the Maps component
        wrapper = shallow(<MarkerList items={[]}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders marker_list correctly', () => {

        const tree = renderer.create(<MarkerList items={[]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
