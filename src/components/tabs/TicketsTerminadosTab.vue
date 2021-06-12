<template>
  <div class="ticket-terminados-tab">
    <b-table
      id="tickets-terminados-table"
      hover
      responsive
      :fields="fields"
      :items="ticketsTerminadosAsignadosList"
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <!-- A virtual composite column -->
      <template #cell(customer)="data">
        <b-button
          variant="info"
          @click="
            $bvModal.show('bv-modal-customer-info');
            fillCustomerInfoModal(data.item.customerRequestDto.customerDto);
          "
          >Ver</b-button
        >
      </template>
      <!-- A virtual composite column -->
      <template #cell(customerRequest)="data">
        <b-button
          variant="info"
          @click="
            $bvModal.show('bv-modal-customer-request-info');
            fillCustomerRequestInfoModal(data.item.customerRequestDto);
          "
          >Ver</b-button
        >
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
      aria-controls="tickets-terminados-table"
    >
    </b-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      sortBy: "createdAt",
      sortDesc: false,
      fields: [
        { key: "id", label: "Id" },
        {
          key: "customer",
          label: "Cliente",
        },
        {
          key: "customerRequest",
          label: "Solicitud",
        },
        {
          key: "ticketPriority",
          label: "Prioridad",
        },
        {
          key: "estimatedTime",
          label: "Tiempo Estimado",
        },
        { key: "createdAt", label: "F. Creación", sortable: true },
        { key: "finishedAt", label: "F. Terminado" },
      ],
      customerInfo: {},
      customerRequestInfo: {},
    };
  },
  computed: {
    ...mapGetters(["ticketsTerminadosAsignadosList"]),
    rows() {
      return this.ticketsTerminadosAsignadosList.length;
    },
  },
  methods: {
    ...mapActions([
      "fetchTicketTerminadosAsignadosList",
      "fillCustomerInfoModal",
      "fillCustomerRequestInfoModal",
    ]),
  },
  mounted() {
    this.fetchTicketTerminadosAsignadosList();
  },
  components: {},
};
</script>