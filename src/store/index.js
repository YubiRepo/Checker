
import { createStore } from "vuex";
import Auth from "./modules/auth";
import User from "./modules/user";
import Sales_Order from "./modules/sales_order";


export default createStore({
    state: {
        token: localStorage.getItem("token"),
        errors: [],
    },
    getters: {
        isAuth: state => {
            return state.token != "null" && state.token != null
        },
    },

    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        SET_ERRORS(state, payload) {
            state.errors = payload;
        },
        CLEAR_ERRORS(state) {
            state.errors = [];
        },
    },

    modules: {
        auth: Auth,
        user: User,
        sales_order: Sales_Order,
    }
});