import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import API from '../__mocks__/api';


it('mock', () => {
	expect(null).toBe(null);
});

configure({ adapter: new Adapter() });

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
