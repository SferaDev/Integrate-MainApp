const BASEURL = 'http://integrate-backend-staging.herokuapp.com';

const buildQuery = (url = '', params = [], base_url = BASEURL) => {
    let query = base_url + '/' + url;
    let keys = Object.keys(params);

    for (let i in keys) {
        if (parseInt(i) === 0) query += '?';
        else query += '&';
        query += params[keys[i]].key + '=' + params[keys[i]].value;
    }
    return query;
};

const buildBody = (params = []) => {
    let bodyParams = {};
    let keys = Object.keys(params);
    for (let i in keys) {
        bodyParams[params[keys[i]].key] = params[keys[i]].value;
    }

    return bodyParams;
};

const callApi = async (url, params, method = 'GET', isBody = false) => {
    if (isBody) return await fetch(BASEURL + '/' + url, {
        method: method,
        body: JSON.stringify(buildBody(params)),
        headers: {'Content-Type': 'application/json'}
    });
    else return await fetch(buildQuery(url, params), {method: method});
};

const httpHelper = {
    buildQuery: buildQuery,
    buildBody: buildBody,
    callApi: callApi
};

export default httpHelper;
