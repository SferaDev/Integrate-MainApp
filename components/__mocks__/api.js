const GOODS = ['111', '222', '333', '444', '555', '666', '777', '888', '999'];
const USED_GOODS = ['111', '222', '333', '777'];

const API = {
    login: async (nifnie = '', password = '') => {

        if (nifnie.length === 0 || password.length === 0) return null;
        else return 'TOKEN';
    },
    getEntity: (id = null) => {
        return new Promise(async (resolve, reject) => {
            let entity = {
                _id: 0,
                name: 'name',
                description: 'description',
                addressName: 'addressName',
                phone: '000000',
                email: 'aaa@bbb.com',
                coordinates: [0, 0],
                goods: []
            };
            resolve(entity);
        });
    },
    checkOrder: async (selected_goods = []) => {

        let ok = true;
        for (let sg of selected_goods) {
            if (!GOODS.includes(sg) || USED_GOODS.includes(sg)) ok = false;
        }

        if (ok) {
            return {status: 200, body: {total_discount: 0}};
        } else {
            return {status: 409, body: {soldOutGoods: [], nonUsableGoods: []}};
        }
    },
    newOrder: async (selected_goods = [], entityId = null, validationCode = null) => {

        if (entityId === null || validationCode === null) return {status: 403, body: 'Error'};

        let ok = true;
        for (let sg of selected_goods) {
            if (!GOODS.includes(sg) || USED_GOODS.includes(sg)) ok = false;
        }

        if (ok) {
            return {status: 201, body: {total_discount: 0}};
        } else {
            return {status: 409, body: {soldOutGoods: [], nonUsableGoods: []}};
        }
    },
    getLanguages: async () => {

        return [{name: 'Catalan', language: 'ca'}];
    },
    likeEntity: async (id = null) => {
        if (id !== null) return {numberLikes: 1};
        return null;
    },
    dislikeEntity: async (id = null) => {
        if (id !== null) return {numberLikes: 0};
        return null;
    },
    getGoods: async () => {
        let good1 = {
            _id: 1,
            isFav: true
        };
        let good2 = {
            _id: 2,
            isFav: true
        };
        let good3 = {
            _id: 3,
            isFav: false
        };
        let good4 = {
            _id: 4,
            isFav: false
        };
        return [good1, good2, good3, good4];
    },
    getGoodsFav: async () => {
        let good1 = {
            _id: 1,
        };
        let good2 = {
            _id: 2,
        };
        return [good1, good2];
    }
};

export default API
