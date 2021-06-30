<template>
  <div class="ticket-en-atencion-tab">
    <b-table
      id="tickets-en-atencion-table"
      hover
      responsive
      :fields="fields"
      :items="ticketsEnAtencionAsignadosList"
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
          <b-button variant="success" @click="terminar(data.item.id)"
            >Terminar</b-button
          >
        </div>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
      aria-controls="tickets-en-atencion-table"
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
          formatter: (value) => {
            return value == null ? "Sin estimar" : this.formatToDMYHM(value);
          },
        },
        {
          key: "createdAt",
          label: "F. Creación",
          formatter: (value) => {
            return this.formatToDMYHM(value);
          },
        },
        { key: "actions", label: "Acciones" },
      ],
      customerInfo: {},
      customerRequestInfo: {},
    };
  },
  computed: {
    ...mapGetters(["ticketsEnAtencionAsignadosList"]),
    rows() {
      return this.ticketsEnAtencionAsignadosList.length;
    },
  },
  methods: {
    ...mapActions([
      "fetchTicketEnAtencionAsignadosList",
      "fillCustomerInfoModal",
      "fillCustomerRequestInfoModal",
      "fetchFinishTicketById",
    ]),
    async terminar(ticketId) {
      this.$swal
        .fire({
          title: "¿Estás seguro?",
          text: "Una vez cerrado no podrá volverlo a abrir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
          cancelButtonText: "Cancelar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            if (await this.fetchFinishTicketById(ticketId)) {
              this.$swal.fire(
                "Cerrado!",
                "El ticket ha sido cerrado.",
                "success"
              );
            }
          }
          await this.fetchTicketEnAtencionAsignadosList();
        });
    },
    formatToDMYHM,
  },
  mounted() {
    this.fetchTicketEnAtencionAsignadosList();
  },
  components: {},
};
</script>