import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ValsEntity from '../../components/compra/vals_entitat';

let wrapper;
let instance;

describe('Test group for EntityList', function () {

    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<ValsEntity />);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders buscador correctly', () => {
        const tree = renderer.create(<ValsEntity />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('getGoods is callable and returns nothing', () => {
        expect(instance.getGoods()).toBe(undefined);
    });

    test('setGoods is callable and returns nothing', () => {
        expect(instance.setGoods()).toBe(undefined);
    });

    describe("toggleFavourite() tests", () => {

        test('toggleFavourite to normal good', () => {
            expect(instance.toggleFavourite(1, true)).toBe(undefined);
        });

        test('toggleFavourite to fav good', () => {
            expect(instance.toggleFavourite(1, false)).toBe(undefined);
        });
    });

    test('renderGood renders an entity correctly', () => {

        expect(instance.renderGood({item: {id: 1}})).toMatchSnapshot();
    });

});
