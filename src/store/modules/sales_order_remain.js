
const state = () => {
    return {
        sales_order_remain: {}
    };
}

const mutations = {
    SET_SALES_ORDER_REMAIN(state, payload) {
        state.sales_order_remain = payload;
    },

    CLEAR_STATE(state) {
        state.sales_order_remain = {};
    }
}

const getters = {
    SalesOrderRemain(state) {
        return state.sales_order_remain;
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    getters
}

