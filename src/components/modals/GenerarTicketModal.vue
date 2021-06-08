<template>
  <b-modal id="bv-modal-generate-ticket" hide-footer>
    <template #modal-title> <span>Generar Ticket de atención</span> </template>
    <div class="d-block text-center">
      {{ data }}
      <b-form @submit.prevent="">
        <b-button block type="submit" class="btn-purple">Confirmar</b-button>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      ticket: {
        ticketPriority: "",
        employeeId: 0,
        estimatedTime: null,
        customerRequestId: 0,
      },
    };
  },
  props: {
    data: {
      typeof: Object,
      require: true,
      default: {},
    },
  },
};
</script>