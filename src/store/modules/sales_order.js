import $axios from '@/plugins/api'

const state = () => {
    return {
        sales_order: {
            "hallo": "hallo"
        },
    };
}

const mutations = {
    SET_SALES_ORDER(state, payload) {
        state.sales_order = payload;
    },
    SET_PAGE(state, payload) {
        state.page = payload;
    },
    CLEAR_STATE(state) {
        state.sales_order = {};
    }
}

const actions = {
    getSalesOrder({ commit }) {
        return new Promise((resolve) => {
            $axios.get(`/checker/sales-orders`)
                .then((response) => {
                    alert('hallo')
                    commit('SET_SALES_ORDER', response.data.sales_orders)
                    resolve(response.data)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

