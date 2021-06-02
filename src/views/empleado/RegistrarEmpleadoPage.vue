<template>
  <div class="add-new-user">
    <admin-page-layout>
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand
              ><span class="main-header-title">Empleados</span></b-navbar-brand
            >
            <b-nav pills class="ml-auto">
              <b-nav-item-dropdown
                id="my-nav-dropdown"
                toggle-class="nav-link-custom bg-white text-dark"
                right
              >
                <template #button-content>
                  <span style="font-weight: bold">Carlos</span>
                  <b-img
                    style="height: 40px"
                    rounded="circle"
                    alt="Circle image"
                    src="https://static.thenounproject.com/png/1081856-200.png"
                  ></b-img>
                </template>
                <b-dropdown-item>Cerrar Sesión</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-nav>
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
import AdminPageLayout from "../../layouts/AdminPageLayout";

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
          this.authorities = this.authorities.filter(authority => authority != "CLIENTE");
      } catch (error) {
        console.error("RegistrarEmpleadoPage:fetchAuthorities:", error);
      }
    },
    async fetchInsertEmployee() {
      try {
        const response = await fetch("http://localhost:8080/api/employees", {
          method: "POST",
          headers: {
            "content-type": "application/json",
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
            text:
              "Tiene campos que completar o el 'Nombre de Usuario' ya existe!",
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
  },
};
</script>