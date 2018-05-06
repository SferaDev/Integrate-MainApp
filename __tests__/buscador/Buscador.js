import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Buscador from '../../components/buscador/buscador';

const navigation = {navigate: jest.fn()};
let wrapper;
let instance;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<Buscador navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders buscador correctly', () => {
        const tree = renderer.create(<Buscador navigation={navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('openMenu is callable and returns nothing', () => {
        expect(instance.openMenu()).toBe(undefined);
    });

    test('switchView is callable and returns nothing', () => {
        expect(instance.switchView()).toBe(undefined);
    });

    test('getEntities is callable and returns an array', () => {
        expect(instance.getEntities()).toBe(undefined);
    });

    test('setEntities is callable and returns an array', () => {
        expect(instance.setEntities()).toBe(undefined);
    });

    test('handleBackButton is callable and returns true', () => {
        expect(instance.handleBackButton()).toBe(true);
    });

    test('showEntityInfo is callable and returns nothing', () => {
        expect(instance.showEntityInfo()).toBe(undefined);
    });

    test('setEntities is callable and returns nothing', () => {
        expect(instance.setEntities()).toBe(undefined);
    });

    test('showListView is callable and returns nothing', () => {
        expect(instance.showListView()).toBe(undefined);
    });

    test('updateSearchText is callable and returns nothing', () => {
        expect(instance.updateSearchText()).toBe(undefined);
    });

    test('filterEntities is callable and returns nothing', () => {
        expect(instance.filterEntities()).toBe(undefined);
    });

    test('filterEntities where searchText is UPC is callable and returns nothing', () => {
        instance.state.searchText = "UPC";
        expect(instance.filterEntities()).toBe(undefined);
    });

    test('filterEntities where entities are UPC and Patates Jordi is callable and returns nothing', () => {
        instance.state.searchText = "UP";
        instance.state.entities = [{name: "UPC"}, {name: "Patates Jordi"}];
        expect(instance.filterEntities()).toBe(undefined);
    });

    describe("isAnEntitySelected() tests", () => {
        it('isAnEntitySelected() when NifNie and Password are empty then returns true', () => {

            instance.state.selectedEntity = null;
            expect(instance.isAnEntitySelected()).toBe(false);
        });

        it('isAnEntitySelected() when NifNie is empty and Password is filled then returns true', () => {

            instance.state.selectedEntity = {
                id: 1,
                name: 'name',
                description: 'description',
                addressName: 'addressName',
            };
            expect(instance.isAnEntitySelected()).toBe(true);
        });
    });

    describe("isListView() tests", () => {
        it('isListView() when NifNie and Password are empty then returns true', () => {

            instance.state.isListView = true;
            expect(instance.isListView()).toBe(0);
        });

        it('isListView() when NifNie is empty and Password is filled then returns true', () => {

            instance.state.isListView = false;
            expect(instance.isListView()).toBe(100);
        });
    });
});
