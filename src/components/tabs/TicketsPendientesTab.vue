<template>
  <div class="ticket-pendientes-tab">
    <b-table
      id="employees-table"
      hover
      responsive
      :fields="fields"
      :items="ticketsPendientesAsignadosList"
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
      <!-- A virtual composite column -->
      <template #cell(actions)="data">
        <div class="d-flex">
          <b-button variant="success" @click="console.log(data.item.id)"
            >Atender</b-button
          >
        </div>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
      aria-controls="employees-table"
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
      sortBy: "ticketPriority",
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
          sortable: true,
        },
        {
          key: "estimatedTime",
          label: "Tiempo Estimado",
        },
        { key: "createdAt", label: "F. Creación" },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapGetters(["ticketsPendientesAsignadosList"]),
    rows() {
      return this.ticketsPendientesAsignadosList.length;
    },
  },
  methods: {
    ...mapActions([
      "fetchTicketPendientesAsignadosList",
      "fillCustomerInfoModal",
      "fillCustomerRequestInfoModal",
    ]),
  },
  mounted() {
    this.fetchTicketPendientesAsignadosList();
  },
  components: {},
};
</script>