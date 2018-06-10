import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetallsGood from '../../components/llista_vals/detalls_good';

jest.mock('../../components/http_helper');

const navigation = {
    navigate: jest.fn(),
    state: {
        params: {
            selectedGood: {
                _id: 1,
                productName: 'name',
                initialPrice: 24,
                category: 2,
                owner: {
                    name: 'NAME'
                }
            },
            isFav: true,
            isEntityDisplay: true,
            toggleFavourite: jest.fn()
        }
    },
};

describe('Test group for DetallsGood', function () {

    beforeAll(() => {
        configure({adapter: new Adapter()});
        global.lang = 'ca';
    });

    beforeEach(function () {

        wrapper = shallow(<DetallsGood navigation={navigation} />);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<DetallsGood navigation={navigation} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<DetallsGood navigation={navigation} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('showEntity is callable and returns nothing', () => {
        expect(instance.showEntity()).toBe(undefined);
    });

    test('goBack is callable and returns nothing', () => {
        expect(instance.goBack()).toBe(undefined);
    });

    test('toggleFavourite is callable and returns nothing',await () => {

        navigation.state.params.isFav = false;
        wrapper = shallow(<DetallsGood navigation={navigation} />);
        instance = wrapper.instance();

        expect(async instance.toggleFavourite()).toBe(true);
    });

    test('toggleFavourite is callable and returns nothing',await () => {

        navigation.state.params.isFav = true;
        wrapper = shallow(<DetallsGood navigation={navigation} />);
        instance = wrapper.instance();

        expect(async instance.toggleFavourite()).toBe(false);
    });

});
