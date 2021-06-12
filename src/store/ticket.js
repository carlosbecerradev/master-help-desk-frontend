const axios = require('axios');

const state = {
    ticket_priority_list: [],
    ticket_pendientes_asignados_list: [],
    customer_info: {},
    customer_request_info: {
        requestType: {
            name: "",
        }
    },
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
    async fetchTicketPendientesAsignadosList({ getters, state }) {
        try {
            const response = await axios({
                method: 'get',
                baseURL: getters["apiBaseURL"],
                url: '/tickets/ticketStatus=PENDIENTE',
                headers: { 'Authorization': 'Bearer ' + getters['JWT'] },
            });
            state.ticket_pendientes_asignados_list = response.data;
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    },
    fillCustomerInfoModal({ state }, data) {
        state.customer_info = data;
    },
    fillCustomerRequestInfoModal({ state }, data) {
        state.customer_request_info = data;
    },
}

const getters = {
    TicketPriorityList: state => state.ticket_priority_list,
    ticketsPendientesAsignadosList: state => state.ticket_pendientes_asignados_list,
    customerInfo: state => state.customer_info,
    customerRequestInfo: state => state.customer_request_info,
}

export default {
    state,
    actions,
    mutations,
    getters
}