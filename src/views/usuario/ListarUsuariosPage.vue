<template>
  <div class="list-user-page">
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand href="/login">Optimal Solutions Help Desk</b-navbar-brand>
    </b-navbar>

    <div class="container-fluid">
      <div class="title my-4 d-flex align-items-center">
        <div class="display-4">Listado de Usuarios</div>
          <router-link to="/usuario/registrar" class="ml-auto btn  btn-outline-primary">Registrar Usuario</router-link>
      </div>
      <b-table striped hover :items="items"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          method: "GET",
        });

        this.items = response.status == 200 ? await response.json() : null;
        // console.log(this.items);
        // console.log(response);
      } catch (error) {
        console.error("ListarUsuariosPage:fetchUsuarios:", error);
      }
    },
  },
  mounted() {
    this.fetchUsuarios();
  },
};
</script>