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
              <h1 class="text-center mb-5">Editar Usuario</h1>

              <b-form @submit.prevent="fetchUpdateUser">
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
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="Estado:">
                  <b-form-select
                    v-model="user.enabled"
                    :options="enabledOptions"
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
  methods: {
    async fetchAuthorities() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/authorities",
          {
            method: "GET",
          }
        );

        this.authorities =
          response.status == 200 ? await response.json() : null;
        // console.log(this.authorities);
        // console.log(response);
      } catch (error) {
        console.error("EditarUsuarioPage:fetchAuthorities:", error);
      }
    },
    async fetchUpdateUser() {
      try {
        console.log(this.user);
        const response = await fetch("http://localhost:8080/api/users", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.user),
        });

        if (response.status == 200) {
          this.$swal.fire({
            icon: "success",
            title: "Actualizado",
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
        console.error("EditarUsuarioPage:fetchUpdateUser:", error);
      }
    },
    async fetchUserById() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/" + this.$route.params.idUser,
          {
            method: "GET",
          }
        );

        this.user = response.status == 200 ? await response.json() : null;
      } catch (error) {
        console.error("EditarUsuarioPage:fetchUserById:", error);
      }
    },
  },
  mounted() {
    this.fetchAuthorities();
    this.fetchUserById();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
  },
};
</script>