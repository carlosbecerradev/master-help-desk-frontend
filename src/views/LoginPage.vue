<template>
  <div class="login-page">
    <div class="container">
      <div
        class="
          row
          justify-content-center justify-content-sm-end
          align-items-center
        "
        style="height: 100vh"
      >
        <div class="col-10 col-md-6 col-lg-4">
          <b-card class="p-4 mt-5">
            <div class="text-center mb-5">
              <img src="@/assets/logo-purple.svg" alt="" />
            </div>

            <b-form @submit.prevent="executeLogin">
              <b-form-group label="Nombre de Usuario:">
                <b-form-input
                  v-model="loginRequest.username"
                  type="text"
                  placeholder="Escriba aqui"
                  required
                  trim
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Contraseña:">
                <b-form-input
                  v-model="loginRequest.password"
                  type="password"
                  placeholder="Escriba aqui"
                  required
                  trim
                ></b-form-input>
              </b-form-group>

              <b-button block type="submit" class="btn-purple"
                >Ingresar al Sistema</b-button
              >
            </b-form>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loginRequest: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    async executeLogin() {
      let flag = await this.login(this.loginRequest);
      if (!flag) {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El nombre de usuario o contraseña son incorrectos!",
        });
      }
    },
  },
};
</script>

<style>
.login-page {
  background-image: url("../assets/login-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  font-family: var(--font-quicksand);
}
</style>