const BASE_URL = 'http://integrate-backend-staging.herokuapp.com';

const buildQuery = (url = '', params = [], base_url = BASE_URL) => {
    let query = base_url + '/' + url;
    let keys = Object.keys(params);

    for (let i in keys) {
        if (i == 0) query += '?';
        else query += '&';
        query += params[keys[i]].key + '=' + params[keys[i]].value;
    }
    return query;
}

const callApi = (url, params, success, error, method = 'GET') => {
    //fetch(buildQuery(url, params), { method: method }).then(success).catch(error);
    new Promise( (resolve) => {
        resolve({
            status: 200,
            _bodyText: JSON.stringify( {something: 'Hello World'} )
        });
    } );
}

const httpHelper = {
    buildQuery: buildQuery,
    callApi: callApi
}

export default httpHelper;
