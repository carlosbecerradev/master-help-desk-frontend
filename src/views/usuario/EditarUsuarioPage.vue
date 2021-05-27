<template>
  <div class="add-new-user">
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand href="/login">Optimal Solutions Help Desk</b-navbar-brand>
    </b-navbar>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6">
          <b-card class="p-4 mt-5">
            <h1 class="text-center mb-5">Editar Usuario</h1>
            <b-form @submit.prevent="fetchUpdateUser">
              <b-form-group
                id="input-group-1"
                label="Nombre de Usuario:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="user.username"
                  type="text"
                  placeholder="Escriba aqui"
                  autocomplete="username"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Contraseña:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="user.password"
                  type="text"
                  placeholder="Escriba aqui"
                  autocomplete="current-password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Roles:">
                <b-form-select
                  v-model="user.authority"
                  :options="authorities"
                ></b-form-select>
              </b-form-group>

              <b-form-group label="Estado:"
                ><b-form-select
                  v-model="user.enabled"
                  :options="enabledOptions"
                ></b-form-select>
              </b-form-group>

              <b-button block type="submit" variant="success"
                >Confirmar</b-button
              >
              <div
                @click="cancelBtn"
                class="btn d-block bg-danger text-white py-2 px-4 rounded text-center mt-2"
              >
                Cancelar
              </div>
            </b-form>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      user: {
        id: null,
        username: "",
        password: "",
        authority: "CLIENTE",
        enabled: true,
        createdAt: null,
      },
      authorities: [],
      enabledOptions: [
        { value: true, text: "Activo" },
        { value: false, text: "Inactivo" },
      ],
    };
  },
  methods: {
      fetchUpdateUser(){
          
      }
  }
}
</script>