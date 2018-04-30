const BASEURL = 'http://integrate-backend-staging.herokuapp.com';

const buildQuery = (url = '',params = [],base_url = BASEURL) => {
    let query = base_url + '/' + url;
    let keys = Object.keys(params);

    for (let i in keys) {
        if(i == 0)query += '?';
        else query += '&';
        query += params[ keys[i] ].key + '=' + params[ keys[i] ].value;
    }
    return query;
}

const callApi = (url,params,success,error) => {
    fetch(buildQuery(url,params)).then(success).catch(error);
}

const httpHelper = {
	buildQuery: buildQuery,
	callApi: callApi
}

export default httpHelper;