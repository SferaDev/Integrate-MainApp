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
        wrapper = shallow(<Entity item={entity} onDetailsShow={jest.fn()}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders buscador correctly with onDetailsShow', () => {
        const tree = renderer.create(<Entity item={entity} onDetailsShow={jest.fn()}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders buscador correctly without onDetailsShow', () => {
        const tree = renderer.create(<Entity item={entity}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('showEntityInfo is callable and returns nothing', () => {
        expect(instance.showEntityInfo()).toMatchSnapshot();
    });

    /*test('likeEntity is callable and returns nothing', () => {
        expect(instance.likeEntity()).toBe(undefined);
    });

    test('dislikeEntity is callable and returns nothing', () => {
        expect(instance.dislikeEntity()).toBe(undefined);
    });*/

});
