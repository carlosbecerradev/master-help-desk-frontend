<template>
  <b-modal id="bv-modal-generate-ticket" hide-footer>
    <template #modal-title> <span>Generar Ticket de atención</span> </template>
    <div class="d-block text-center">
      <b-form @submit.prevent="executeFetchInsertTicket">
        <b-form-group label="Prioridad del ticket:">
          <b-form-select
            v-model="ticket.ticketPriority"
            :options="TicketPriorityList"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Asignar Técnico:">
          <b-form-select
            v-model="ticket.tecnicoEmployeeId"
            :options="enabledTecnicosList"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Tiempo estimado en minutos:">
          <b-form-input
            @input="calcEstimatedTime"
            v-model="minutes"
            type="number"
          ></b-form-input>
        </b-form-group>

        <b-button block type="submit" class="btn-purple">Confirmar</b-button>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      ticket: {
        customerRequestId: 0,
        tecnicoEmployeeId: 0,
        ticketPriority: "BAJA",
        estimatedTime: null,
      },
      minutes: 0,
    };
  },
  props: {
    data: {
      typeof: Object,
      require: true,
      default: {},
    },
  },
  computed: {
    ...mapGetters(["TicketPriorityList", "enabledTecnicosList"]),
  },
  methods: {
    ...mapActions([
      "fetchTicketPriorityList",
      "fetchAllEnabledTecnicos",
      "fetchInsertTicket",
      "fetchAllEnabledCustomerRequests",
    ]),
    calcEstimatedTime() {
      if (parseInt(this.minutes, 10) <= 0) {
        this.ticket.estimatedTime = null;
      } else {
        let estimatedTimeDate = new Date(
          Date.now() + parseInt(this.minutes, 10) * 60000
        );
        this.ticket.estimatedTime = estimatedTimeDate;
      }
    },
    async executeFetchInsertTicket() {
      this.ticket.customerRequestId = this.data.id;
      let flag = await this.fetchInsertTicket(this.ticket);

      if (flag) {
        this.$swal.fire({
          icon: "success",
          title: "El ticket ha sido generado.",
        });
        this.$bvModal.hide("bv-modal-generate-ticket");
        this.cleanData();
        await this.fetchAllEnabledCustomerRequests();
      }
    },
    cleanData() {
      this.ticket = {
        customerRequestId: 0,
        tecnicoEmployeeId: 0,
        ticketPriority: "BAJA",
        estimatedTime: null,
      };
      this.minutes = 0;
    },
  },
  mounted() {
    this.fetchTicketPriorityList();
    this.fetchAllEnabledTecnicos();
  },
};
</script>