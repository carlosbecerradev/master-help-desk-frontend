const axios = require('axios');

const state = {
    ticket_priority_list: [],
}

const mutations = {
}

const actions = {
    async fetchTicketPriorityList({ getters, state }) {
        try {
            const response = await axios({
                method: 'get',
                baseURL: getters["apiBaseURL"],
                url: '/tickets/priorities',
                headers: { 'Authorization': 'Bearer ' + getters['JWT'] },
            });
            state.ticket_priority_list = response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchInsertTicket({ getters }, ticket) {
        console.log('ticket', ticket)
        try {
            const response = await axios({
                method: 'post',
                baseURL: getters["apiBaseURL"],
                url: '/tickets',
                headers: { 'Authorization': 'Bearer ' + getters['JWT'] },
                data: ticket,
            });
            console.log(response.data)
            return response.status == 201 ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
}

const getters = {
    TicketPriorityList: state => state.ticket_priority_list,
}

export default {
    state,
    actions,
    mutations,
    getters
}