const axios = require('axios');
import router from '../router/index.js'

const state = {
}

const mutations = {
}

const actions = {
    async fetchInsertCustomerRequest({ getters }, customerRequest) {
        try {
            const response = await axios({
                method: 'post',
                baseURL: getters["apiBaseURL"],
                url: '/customer-requests',
                headers: { 'Authorization': 'Bearer ' + getters['JWT'] },
                data: customerRequest,
            });

            return response.status == 201 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async fetchAllEnabledCustomerRequests({ getters }) {
        try {
            const response = await axios({
                method: 'get',
                baseURL: getters["apiBaseURL"],
                url: '/customer-requests/enabled/true',
                headers: { 'Authorization': 'Bearer ' + getters['JWT'] },
            });

            return response.status == 200 ? response.data : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
}

const getters = {
}

export default {
    state,
    actions,
    mutations,
    getters
}