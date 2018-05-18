import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-native-maps', () => require.requireActual('../../__mocks__/react-native-maps').default);

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetallsEntity from '../../components/compra/detalls_entitat';

const navigation = {
    navigate: jest.fn(),
    state: {
        params:{
            selectedEntity: {
                _id: 0
            }
        }
    },
    goBack: jest.fn()
};
let wrapper;
let instance;
let entity = {
            _id: 0,
            name: 'name',
            description: 'description',
            addressName: 'addressName',
            phone: '000000',
            email: 'aaa@bbb.com',
            coordinates: [0, 0],
            goods: []
        }

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<DetallsEntity navigation={navigation}/>);
        instance = wrapper.instance();
        instance.state.entity = {
            _id: 0,
            name: 'name',
            description: 'description',
            addressName: 'addressName',
            phone: '000000',
            email: 'aaa@bbb.com',
            coordinates: [0, 0],
            goods: []
        }
        instance.map = {
            animateToRegion: jest.fn()
        }
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
    });

    test('renders detalls_entitat correctly', () => {
        let component = renderer.create(<DetallsEntity navigation={navigation}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('goBack is callable and returns nothing', () => {
        expect(instance.goBack()).toBe(undefined);
    });

    test('sendMail is callable and returns nothing', () => {
        expect(instance.sendMail()).toBe(undefined);
    });

    test('callTo is callable and returns nothing', () => {
        expect(instance.callTo()).toBe(undefined);
    });

    test('getEntity is callable and returns nothing', () => {
        expect(instance.getEntity()).toBe(undefined);
    });

    test('setEntity is callable and returns nothing', () => {
        expect(instance.setEntity(entity)).toBe(undefined);
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

        expect(instance.renderGood({id: 1})).toMatchSnapshot();
    });

    describe("displayPhoneInfo() tests", () => {

        test('displayPhoneInfo to normal good', () => {
            let wrapper = shallow(<DetallsEntity navigation={navigation}/>);
            let instance = wrapper.instance();
            instance.state.entity = {
                phone: '000000',
            }
            expect(instance.displayPhoneInfo()).toMatchSnapshot();
        });

        test('displayPhoneInfo to normal good', () => {
            let wrapper = shallow(<DetallsEntity navigation={navigation}/>);
            let instance = wrapper.instance();
            instance.state.entity = {}
            expect(instance.displayPhoneInfo()).toBe(undefined);
        });
    });

    describe("displayMailInfo() tests", () => {

        test('displayMailInfo to normal good', () => {
            let wrapper = shallow(<DetallsEntity navigation={navigation}/>);
            let instance = wrapper.instance();
            instance.state.entity = {
                email: 'ofhdfkzn',
            }
            expect(instance.displayMailInfo()).toMatchSnapshot();
        });

        test('displayMailInfo to normal good', () => {
            let wrapper = shallow(<DetallsEntity navigation={navigation}/>);
            let instance = wrapper.instance();
            instance.state.entity = {}
            expect(instance.displayMailInfo()).toBe(undefined);
        });
    });

});
