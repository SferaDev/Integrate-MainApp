import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HttpHelper from '../components/http_helper';

const fetchPolifill = require('whatwg-fetch')
global.fetch = fetchPolifill.fetch

describe('Test group for EntityList', function () {

    beforeAll(() => {

        configure({adapter: new Adapter()});
    });

    beforeEach(function () {});

    afterEach(function () {});

    describe("buildQuery() tests", () => {

	    test('buildQuery() when url and params are blank', () => {

		    expect(HttpHelper.buildQuery(undefined,undefined,'http://localhost:8081')).toBe("http://localhost:8081/");
		});

		test('buildQuery() when params are blank', () => {

		    expect(HttpHelper.buildQuery('route1',undefined,'http://localhost:8081')).toBe("http://localhost:8081/route1");
		});

		test('buildQuery() when url and params are set', () => {

		    expect(HttpHelper.buildQuery('route1',[{key: 'param1',value: 'value1'}],'http://localhost:8081')).toBe("http://localhost:8081/route1?param1=value1");
		});

		test('buildQuery() when url and params are set', () => {

		    expect(HttpHelper.buildQuery('route1',[{key: 'param1',value: 'value1'},{key: 'param2',value: 'value2'}],'http://localhost:8081')).toBe("http://localhost:8081/route1?param1=value1&param2=value2");
		});
	});

	test('callApi() is callable and returns nothing', () => {

	    expect(HttpHelper.callApi()).toBe(undefined);
	});

	/*test('login() is callable and returns nothing', () => {
	    HttpHelper.login('12334', '1234').then((s) => {
	        expect(typeof s).toBe('string');
	    });
	});*/
});
