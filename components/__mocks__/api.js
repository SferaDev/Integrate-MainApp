const GOODS = ['111', '222', '333', '444', '555', '666', '777', '888', '999'];
const USED_GOODS = ['111', '222', '333', '777'];

const API = {
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

        return [{name: 'Catalan',language: 'ca'}];
    },
};

export default API
