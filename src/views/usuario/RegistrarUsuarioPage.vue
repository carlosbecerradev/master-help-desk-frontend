<template>
  <div class="add-new-user">
    <admin-page-layout>
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand
              ><span class="main-header-title">Usuarios</span></b-navbar-brand
            >
            <user-dropdown></user-dropdown>
          </b-navbar>
        </div>

        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-8 col-lg-6">
            <b-card class="p-4 my-5">
              <h1 class="text-center mb-5">Registrar Usuario</h1>
              <b-form @submit.prevent="fetchInsertUser">
                <b-form-group label="Nombre de Usuario:">
                  <b-form-input
                    v-model="user.username"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Contraseña:">
                  <b-form-input
                    v-model="user.password"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Roles:">
                  <b-form-select
                    v-model="user.authority"
                    :options="authorities"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="Estado:">
                  <b-form-select
                    v-model="user.enabled"
                    :options="enabledOptions"
                    required
                  ></b-form-select>
                </b-form-group>

                <div class="mt-4">
                  <b-button type="submit" variant="purple">Confirmar</b-button>
                  <router-link
                    to="/usuario/listar"
                    class="btn btn-danger text-white ml-2"
                    >Cancelar</router-link
                  >
                </div>
              </b-form>
            </b-card>
          </div>
        </div>
      </div>
    </admin-page-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import UserDropdown from "@/components/auth/UserDropdown";

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
  computed: {
    ...mapGetters(["apiBaseURL", "JWT"]),
  },
  methods: {
    async fetchAuthorities() {
      try {
        const response = await fetch(`${this.apiBaseURL}/users/authorities`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.JWT}`,
          },
        });

        this.authorities =
          response.status == 200 ? await response.json() : null;
      } catch (error) {
        console.error("RegistrarUsuarioPage:fetchAuthorities:", error);
      }
    },
    async fetchInsertUser() {
      try {
        console.log(this.user);
        const response = await fetch(`${this.apiBaseURL}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${this.JWT}`,
          },
          body: JSON.stringify(this.user),
        });

        if (response.status == 201) {
          this.$swal.fire({
            icon: "success",
            title: "Registrado",
          });
          this.$router.push("/usuario/listar");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tiene campos que completar o este 'username' ya existe!",
          });
        }
      } catch (error) {
        console.error("RegistrarUsuarioPage:fetchInsertUser:", error);
      }
    },
  },
  mounted() {
    this.fetchAuthorities();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
  },
};
</script>