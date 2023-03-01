import $axios from '@/plugins/api'

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
    actions,
}
