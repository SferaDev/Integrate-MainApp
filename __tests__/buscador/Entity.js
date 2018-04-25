import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Entity from '../../components/buscador/entity';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;
let entity;

describe('Test group for EntityList', function () {

    beforeAll(() => {

        configure({adapter: new Adapter()});
        entity = {
            id: 1,
            name: 'name',
            description: 'description',
            addressName: 'addressName',
        }
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Entity item={entity}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders buscador correctly', () => {
        const tree = renderer.create(<Entity item={entity}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

});