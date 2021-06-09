const axios = require('axios');

const state = {
    enabled_tecnicos_list: [],
}

const mutations = {
}

const actions = {
    async fetchAllEnabledTecnicos({ getters, state }) {
        try {
            const response = await axios({
                method: 'get',
                baseURL: getters["apiBaseURL"],
                url: '/employees/rol=TECNICO/enabled=true',
                headers: { 'Authorization': 'Bearer ' + getters['JWT'] },
            });
            state.enabled_tecnicos_list = response.data.map( employee => {
                return {value: employee.id, text: `${employee.name} ${employee.surname}`};
            });
        } catch (error) {
            console.log(error);
        }
    },
}

const getters = {
    enabledTecnicosList: state => state.enabled_tecnicos_list,
}

export default {
    state,
    actions,
    mutations,
    getters
}