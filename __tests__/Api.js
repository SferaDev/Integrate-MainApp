import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import API from '../__mocks__/api';


it('mock', () => {
	expect(null).toBe(null);
});

configure({ adapter: new Adapter() });
/*it('openMenu is callable and returns nothing', () => {
	const wrapper = shallow(API);
	expect(wrapper.instance().getEntities()).toBe(new Promise());
});*/


test('the data is peanut butter', () => {

  API.getEntities().then(data => {
    expect(typeof data).toBe('object');
  });
});