const axios = require('axios');
import router from '../router/index.js'

const state = {
    enabled_customer_request_list: [],
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
    async fetchAllEnabledCustomerRequests({ getters, state }) {
        try {
            const response = await axios({
                method: 'get',
                baseURL: getters["apiBaseURL"],
                url: '/customer-requests/enabled/true',
                headers: { 'Authorization': 'Bearer ' + getters['JWT'] },
            });

            if (response.status == 200) {
                state.enabled_customer_request_list = response.data
            }
        } catch (error) {
            console.error(error);
        }
    },
}

const getters = {
    enabledCustomerRequestList: state => state.enabled_customer_request_list,
}

export default {
    state,
    actions,
    mutations,
    getters
}