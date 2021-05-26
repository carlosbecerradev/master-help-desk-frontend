<template>
  <div class="login-page">
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand href="/login">Optimal Solutions Help Desk</b-navbar-brand>
    </b-navbar>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6">
          <b-card class="p-4 mt-5">
            <h1 class="text-center mb-5">Iniciar Sesión</h1>
            <b-form @submit.prevent="login">
              <b-form-group
                id="input-group-1"
                label="Nombre de Usuario:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="loginRequest.username"
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
                  v-model="loginRequest.password"
                  type="password"
                  placeholder="Escriba aqui"
                  autocomplete="current-password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button block type="submit" variant="dark">Ingresar</b-button>
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
      loginRequest: {
        username: "",
        password: "",
      },
    };
  },
};
</script>