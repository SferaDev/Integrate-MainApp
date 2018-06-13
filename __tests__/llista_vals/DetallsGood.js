import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetallsGood from '../../components/llista_vals/detalls_good';

jest.mock('../../components/http_helper');

const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
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

        wrapper = shallow(<DetallsGood navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<DetallsGood navigation={navigation}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<DetallsGood navigation={navigation}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("showEntity() tests", () => {

        test('showEntity is callable and returns nothing', () => {
            expect(instance.showEntity()).toBe(undefined);
        });

        test('showEntity is callable and returns nothing', () => {

            let navigation_copy = navigation;
            navigation_copy.state.params.isEntityDisplay = false;
            wrapper = shallow(<DetallsGood navigation={navigation_copy}/>);
            instance = wrapper.instance();

            expect(instance.showEntity()).toBe(undefined);
        });
    });

    test('goBack is callable and returns nothing', () => {
        expect(instance.goBack()).toBe(undefined);
    });

    test('toggleFavourite is callable and returns nothing', async () => {

        navigation.state.params.isFav = false;
        wrapper = shallow(<DetallsGood navigation={navigation}/>);
        instance = wrapper.instance();

        expect(await instance.toggleFavourite()).toBe(undefined);
    });

});
