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
          <b-button variant="success" @click="atender(data.item.id)"
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
import formatToDMYHM from "@/utils/format/DateTimeFormatUtil";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      sortBy: "createdAt",
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
          sortable: true,
        },
        {
          key: "createdAt",
          label: "F. Creación",
          formatter: (value) => {
            return this.formatToDMYHM(value);
          },
          sortable: true,
        },
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
      "fetchPickTicketById",
    ]),
    async atender(ticketId) {
      this.$swal
        .fire({
          title: "¿Estás seguro de Atender este Ticket?",
          text: "Una vez movido tendrás que terminar de atenderlo!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Atender!",
          cancelButtonText: "Cancelar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            if (await this.fetchPickTicketById(ticketId)) {
              this.$swal.fire(
                "Ticket en Atención!",
                "Este ticket va a ser atendido.",
                "success"
              );
            }
          }
          await this.fetchTicketPendientesAsignadosList();
        });
    },
    formatToDMYHM,
  },
  mounted() {
    this.fetchTicketPendientesAsignadosList();
  },
  components: {},
};
</script>