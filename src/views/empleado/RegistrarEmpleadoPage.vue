<template>
  <div class="add-new-user">
    <admin-page-layout>
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand
              ><span class="main-header-title">Empleados</span></b-navbar-brand
            >
            <user-dropdown></user-dropdown>
          </b-navbar>
        </div>

        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-8 col-lg-6">
            <b-card class="p-4 my-5">
              <h1 class="text-center mb-5">Registrar Empleado</h1>
              <b-form @submit.prevent="fetchInsertEmployee">
                <b-form-group label="Nombres:">
                  <b-form-input
                    v-model="employee.name"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Apellidos:">
                  <b-form-input
                    v-model="employee.surname"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Estado:">
                  <b-form-select
                    v-model="employee.enabled"
                    :options="enabledOptions"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="Nombre de Usuario:">
                  <b-form-input
                    v-model="employee.username"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Contraseña:">
                  <b-form-input
                    v-model="employee.password"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Roles:">
                  <b-form-select
                    v-model="employee.authority"
                    :options="authorities"
                    required
                  ></b-form-select>
                </b-form-group>

                <div class="mt-4">
                  <b-button type="submit" variant="purple">Confirmar</b-button>
                  <router-link
                    to="/cliente/listar"
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
      employee: {
        name: "",
        surname: "",
        enabled: true,
        username: "",
        password: "",
        authority: "TECNICO",
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
        this.authorities = this.authorities.filter(
          (authority) => authority != "CLIENTE"
        );
      } catch (error) {
        console.error("RegistrarEmpleadoPage:fetchAuthorities:", error);
      }
    },
    async fetchInsertEmployee() {
      try {
        const response = await fetch(`${this.apiBaseURL}/employees`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${this.JWT}`,
          },
          body: JSON.stringify(this.employee),
        });

        if (response.status == 201) {
          this.$swal.fire({
            icon: "success",
            title: "Registrado",
          });
          this.$router.push("/empleado/listar");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tiene campos que completar o el 'Nombre de Usuario' ya existe!",
          });
        }
      } catch (error) {
        console.error("RegistrarEmpleadoPage:fetchInsertEmployee:", error);
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