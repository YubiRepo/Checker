
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import Auth from "./modules/auth";
import User from "./modules/user";
import Sales_Order from "./modules/sales_order";
import Sales_Order_Remain from "./modules/sales_order_remain";


const secureLS = new SecureLS({
    encodingType: 'aes',
    encryptionSecret: 'vue-cart-persist'
});
const persist_state = createPersistedState({
    key: 'checker-application',
    storage: {
        getItem: (key) => secureLS.get(key),
        setItem: (key, value) => secureLS.set(key, value),
        removeItem: (key) => secureLS.remove(key),
    },
});

export default createStore({
    modules: {
        auth: Auth,
        user: User,
        sales_order: Sales_Order,
        sales_order_remain: Sales_Order_Remain,
    },
    plugins: [persist_state],
});