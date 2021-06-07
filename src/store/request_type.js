const axios = require('axios');

const state = {
    request_types_name_list: [],
}

const mutations = {
}

const actions = {
    async fetchRequestTypesNameList({ getters }) {
        try {
            const response = await axios({
                method: 'get',
                baseURL: getters["apiBaseURL"],
                url: '/request-types/names',
                headers: { 'Authorization': 'Bearer ' + getters['JWT'] },
            });
            state.request_types_name_list = response.data;
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
}

const getters = {
    requestTypeNameList: state => state.request_types_name_list,
}

export default {
    state,
    actions,
    mutations,
    getters
}