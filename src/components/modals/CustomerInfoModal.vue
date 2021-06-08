<template>
  <b-modal id="bv-modal-customer-info" header-bg-variant="info" hide-footer>
    <template #modal-title>
      <span class="text-white">Información del Cliente</span>
    </template>

    <b-list-group>
      <b-list-group-item> Id: {{ data.id }}</b-list-group-item>
      <b-list-group-item>Nombres: {{ data.name }}</b-list-group-item>
      <b-list-group-item>Apellidos: {{ data.surname }}</b-list-group-item>
      <b-list-group-item>Correo: {{ data.email }}</b-list-group-item>
      <b-list-group-item>Celular: {{ data.cellphone }}</b-list-group-item>
      <b-list-group-item>Sexo: {{ data.gender }}</b-list-group-item>
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