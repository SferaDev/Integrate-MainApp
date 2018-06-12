import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../../components/api');

import Entity from '../../components/buscador/entity';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;
let entity;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
        entity = {
            _id: 1,
            name: 'name',
            description: 'description',
            addressName: 'addressName',
            isLiked: false,
            numberLikes: 0
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
        entity.isLiked = false;
        const tree = renderer.create(<Entity item={entity} onDetailsShow={jest.fn()}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders buscador correctly with onDetailsShow', () => {
        entity.isLiked = true;
        entity.isDetails = true;
        const tree = renderer.create(<Entity item={entity} onDetailsShow={jest.fn()}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders buscador correctly without onDetailsShow', () => {
        const tree = renderer.create(<Entity item={entity}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("componentDidUpdate() tests", () => {

        test('componentDidUpdate is callable and returns nothing', () => {
            let prevProps = {};
            let prevState = {};
            instance.props.item.numberLikes = 1;
            expect(instance.componentDidUpdate(prevProps, prevState)).toBe(undefined);
        });
        test('componentDidUpdate is callable and returns nothing', () => {
            let prevProps = {};
            let prevState = {};
            instance.props.item.isLiked = true;
            expect(instance.componentDidUpdate(prevProps, prevState)).toBe(undefined);
        });
        test('componentDidUpdate is callable and returns nothing', () => {
            let prevProps = {};
            let prevState = {};
            expect(instance.componentDidUpdate(prevProps, prevState)).toBe(undefined);
        });
    });

    describe("showEntityInfo() tests", () => {

        test('showEntityInfo is callable and returns nothing', () => {
            expect(instance.showEntityInfo()).toMatchSnapshot();
        });

        test('showEntityInfo is callable and returns nothing', () => {
            wrapper = shallow(<Entity item={entity}/>);
            instance = wrapper.instance();
            expect(instance.showEntityInfo()).toMatchSnapshot();
        });
    });

    describe("likeEntity() tests", () => {
        test('likeEntity is callable and returns nothing', async () => {
            instance.props.item._id = undefined;
            expect(await instance.likeEntity()).toBe(undefined);
        });
        test('likeEntity is callable and returns nothing', async () => {
            instance.props.item._id = 1;
            expect(await instance.likeEntity()).toBe(undefined);
        });
    });

    describe("dislikeEntity() tests", () => {
        test('dislikeEntity is callable and returns nothing', async () => {
            instance.props.item._id = undefined;
            expect(await instance.dislikeEntity()).toBe(undefined);
        });
        test('dislikeEntity is callable and returns nothing', async () => {
            instance.props.item._id = 1;
            expect(await instance.dislikeEntity()).toBe(undefined);
        });
    });
});
