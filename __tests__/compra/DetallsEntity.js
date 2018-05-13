import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetallsEntity from '../../components/compra/detalls_entitat';

const navigation = {
    navigate: jest.fn(),
    state: {
        params:{
            selectedEntity: {
                _id: 0,
                name: 'name',
                description: 'description',
                addressName: 'addressName',
                phone: '000000',
                email: 'aaa@bbb.com',
                coordinates: [0, 0]
            }
        }
    },
    goBack: jest.fn()
};
let wrapper;
let instance;

describe('Test group for EntityList', function () {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(function () {
        // Before each: Shallows the EntityList component
        wrapper = shallow(<DetallsEntity navigation={navigation}/>);
        instance = wrapper.instance();
    });

    afterEach(function () {
        // After each: Clears the wrapper
        wrapper = null;
        instance = null;
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

});
