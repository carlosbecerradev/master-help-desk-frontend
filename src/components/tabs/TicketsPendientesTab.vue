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
            customerInfo = data.item.customerRequestDto.customerDto;
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
            customerRequestInfo = data.item.customerRequestDto;
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

    <customer-info-modal :data="customerInfo" />
    <customer-request-info-modal :data="customerRequestInfo" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CustomerInfoModal from "../../components/modals/CustomerInfoModal";
import CustomerRequestInfoModal from "../../components/modals/CustomerRequestInfoModal";

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
      customerInfo: {},
      customerRequestInfo: {},
    };
  },
  computed: {
    ...mapGetters(["ticketsPendientesAsignadosList"]),
    rows() {
      return this.ticketsPendientesAsignadosList.length;
    },
  },
  methods: {
    ...mapActions(["fetchTicketPendientesAsignadosList"]),
  },
  mounted() {
    this.fetchTicketPendientesAsignadosList();
  },
  components: {
    CustomerInfoModal,
    CustomerRequestInfoModal,
  },
};
</script>