import $axios from '@/plugins/api'

const getDefaultState = () => {
    return {
        access_token: null,
        token_type: null,
        expires_in: null,
        user: null
    }
}

const state = getDefaultState()

//mutations
const mutations = {
    setToken: (state, token) => {
        state.access_token = token.access_token;
        state.token_type = token.token_type;
        state.expires_in = token.expires_in;
    },
    setUser: (state, user) => {
        state.user = user;
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    }
}

const getters = {
    Authenticated: state => {
        return state.access_token != null && state.user != null;
    },
    AccessToken: state => {
        return state.access_token;
    },
    Token: state => {
        return state.token_type + ' ' + state.access_token;
    },
    Roles: state => {
        return state.user.data.role;
    },
    DefaultRole: state => {
        if (state.user === null || typeof state.user === 'undefined') {
            return 'N.A';
        }
        else {
            return state.user.data.default_role;
        }
    },
    Role: state => {
        var role = '';
        if (state.access_token != null && state.user != null) {
            let roles = state.user.data.role.name;
            for (var i = 0; i < roles.length; i++) {
                switch (roles[i]) {
                    default:
                        role = role + '[' + roles[i] + '] ';

                }
            }
        }
        return role;
    },
    User: state => {
        return state.user;
    },
    AttributeUser: (state) => (key) => {
        return state.user.data == null ? '' : state.user.data[key];
    },
    can: (state) => (name) => {
        if (state.user == null) {
            return false;
        }
        else if (state.user.issuperadmin) {
            return true;
        }
        else {
            let permissions = state.user.permissions;
            return name in permissions ? true : false;
        }
    }
}

const actions = {
    submit({ commit }, payload) {
        localStorage.setItem('token', payload.token)
        commit('SET_TOKEN', null, { root: true })
        return new Promise((resolve) => {
            $axios.post('/checker/auth/login', payload)
                .then(response => {
                    if (response.data.status == 'success') {
                        localStorage.setItem('token', response.data.token)
                        commit('SET_TOKEN', response.data.token, { root: true })
                    } else {
                        commit('SET_ERRORS', { invalid: 'Username/Password Salah' }, { root: true })
                    }
                    resolve(response.data)

                })
                .catch(error => {
                    if (error.response.status == 422) {
                        commit('SET_ERRORS', error.response.data.errors, { root: true })
                    }
                })
        })
    },

    logout({ commit }) {
        localStorage.removeItem('token')
        commit('SET_TOKEN', null, { root: true })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
