const BASEURL = 'http://integrate-backend-staging.herokuapp.com';

const buildQuery = (url = '', params = [], base_url = BASEURL) => {

    let query = base_url + '/' + url;
    let keys = Object.keys(params);

    for (let i in keys) {
        if (i == 0) query += '?';
        else query += '&';
        query += params[keys[i]].key + '=' + params[keys[i]].value;
    }
    return query;
};

const buildBodyParams = (params = []) => {

    let bodyParams = {};
    let keys = Object.keys(params);
    for(let i in keys){

        bodyParams[ params[keys[i]].key ] = params[ keys[i] ].value;
    }
    return bodyParams;
}

const callApi = async (url, params, method = 'GET', isBodyData = false) => {

    if (isBodyData) return await fetch( BASEURL+'/'+url , {method: method, body: JSON.stringify( buildBodyParams(params) )});
    else return await fetch( buildQuery(url, params) , {method: method});
};

const httpHelper = {
    buildQuery: buildQuery,
    buildBodyParams: buildBodyParams,
    callApi: callApi
};

export default httpHelper;