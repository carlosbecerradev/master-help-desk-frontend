<template>
  <b-modal id="bv-modal-customer-request-info" header-bg-variant="info" hide-footer>
    <template #modal-title>
      <span class="text-white">Información de la Solicitud</span>
    </template>

    <b-list-group>
      <b-list-group-item>Id: {{ data.id }}</b-list-group-item>
      <b-list-group-item>Tipo de Solicitud: {{ data.requestType.name }}</b-list-group-item>
      <b-list-group-item>Descripción: {{ data.description }}</b-list-group-item>
      <b-list-group-item>Creado: {{ data.createdAt }}</b-list-group-item>
    </b-list-group>
  </b-modal>
</template>

<script>
export default {
  props: {
    data: {
      typeof: Object,
      require: true,
      default: {},
    },
  },
};
</script>