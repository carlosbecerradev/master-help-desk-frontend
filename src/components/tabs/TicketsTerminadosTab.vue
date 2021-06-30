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
import formatToDMYHM from "@/utils/format/DateTimeFormatUtil";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      sortBy: "finishedAt",
      sortDesc: true,
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
          formatter: (value) => {
            return value == null ? "Sin estimar" : this.formatToDMYHM(value);
          },
        },
        {
          key: "createdAt",
          label: "F. Creación",
          sortable: true,
          formatter: (value) => {
            return this.formatToDMYHM(value);
          },
        },
        {
          key: "finishedAt",
          label: "F. Terminado",
          formatter: (value) => {
            return this.formatToDMYHM(value);
          },
        },
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
    formatToDMYHM,
  },
  mounted() {
    this.fetchTicketTerminadosAsignadosList();
  },
  components: {},
};
</script>