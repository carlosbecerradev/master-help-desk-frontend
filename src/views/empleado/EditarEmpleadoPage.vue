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
              <b-form @submit.prevent="fetchUpdateEmployee">
                <b-form-group label="Id:">
                  <b-form-input
                    v-model="employee.id"
                    type="text"
                    disabled
                  ></b-form-input>
                </b-form-group>

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
        id: 0,
        name: "",
        surname: "",
        enabled: true,
      },
      enabledOptions: [
        { value: true, text: "Activo" },
        { value: false, text: "Inactivo" },
      ],
      idEmployee: 0,
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL", "JWT"]),
  },
  methods: {
    async fetchUpdateEmployee() {
      try {
        const response = await fetch(`${this.apiBaseURL}/employees`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${this.JWT}`,
          },
          body: JSON.stringify(this.employee),
        });

        if (response.status == 200) {
          this.$swal.fire({
            icon: "success",
            title: "Actualizado",
          });
          this.$router.push("/empleado/listar");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tiene campos que completar!",
          });
        }
      } catch (error) {
        console.error("EditarEmpleadoPage:fetchUpdateEmployee:", error);
      }
    },
    async fetchEmployeeById() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/employees/${this.idEmployee}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );

        this.employee = response.status == 200 ? await response.json() : null;
      } catch (error) {
        console.error("EditarEmpleadoPage:fetchEmployeeById:", error);
      }
    },
  },
  mounted() {
    this.idEmployee = this.$route.params.idEmployee;
    this.fetchEmployeeById();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
  },
};
</script>