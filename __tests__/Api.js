import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import API from '../components/api';

configure({adapter: new Adapter()});

test('the data is peanut butter', () => {
    API.getEntities().then(data => {
        expect(typeof data).toBe('object');
    });
});

it('login() is callable and returns nothing', () => {
    API.login('12334', '1234').then((s) => {
        expect(typeof s).toBe('string');
    });
});

it('getEntities() is callable and returns nothing', () => {
    API.getEntities().then((s) => {
        expect(typeof s).toBe('string');
    });
});

it('getGoods() is callable and returns nothing', () => {
    API.getGoods(0,0,null).then((s) => {
        expect(typeof s).toBe('string');
    });
});

it('getGoodsFav() is callable and returns nothing', () => {
    API.getGoodsFav(0,0,null).then((s) => {
        expect(typeof s).toBe('string');
    });
});