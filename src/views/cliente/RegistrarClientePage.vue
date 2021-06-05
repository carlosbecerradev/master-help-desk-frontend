<template>
  <div class="add-new-user">
    <admin-page-layout>
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand
              ><span class="main-header-title">Clientes</span></b-navbar-brand
            >
            <user-dropdown></user-dropdown>
          </b-navbar>
        </div>

        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-8 col-lg-6">
            <b-card class="p-4 my-5">
              <h1 class="text-center mb-5">Registrar Cliente</h1>
              <b-form @submit.prevent="fetchInsertCustomer">
                <b-form-group label="Nombres:">
                  <b-form-input
                    v-model="customer.name"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Apellidos:">
                  <b-form-input
                    v-model="customer.surname"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Correo">
                  <b-form-input
                    v-model="customer.email"
                    type="email"
                    placeholder="correo@mail"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Celular:">
                  <b-form-input
                    v-model="customer.cellphone"
                    type="text"
                    placeholder="+51 999000999"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Sexo:">
                  <b-form-select
                    v-model="customer.gender"
                    :options="genderOptions"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="Nombre de Usuario:">
                  <b-form-input
                    v-model="customer.username"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Contraseña:">
                  <b-form-input
                    v-model="customer.password"
                    type="text"
                    placeholder="Escriba aqui"
                    required
                    trim
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Estado:">
                  <b-form-select
                    v-model="customer.enabled"
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
import AdminPageLayout from "../../layouts/AdminPageLayout";
import UserDropdown from "@/components/auth/UserDropdown";

export default {
  data() {
    return {
      customer: {
        id: null,
        name: "",
        surname: "",
        email: "",
        cellphone: "",
        gender: "MASCULINO",
        enabled: true,
        username: "",
        password: "",
      },
      genderOptions: [],
      enabledOptions: [
        { value: true, text: "Activo" },
        { value: false, text: "Inactivo" },
      ],
    };
  },
  methods: {
    async fetchAllGenders() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/customers/genders",
          {
            method: "GET",
          }
        );

        this.genderOptions =
          response.status == 200 ? await response.json() : [];
      } catch (error) {
        console.error("RegistrarClientePage:fetchAllGenders:", error);
      }
    },
    async fetchInsertCustomer() {
      try {
        console.log(this.user);
        const response = await fetch("http://localhost:8080/api/customers", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.customer),
        });

        if (response.status == 201) {
          this.$swal.fire({
            icon: "success",
            title: "Registrado",
          });
          this.$router.push("/cliente/listar");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tiene campos que completar o el 'Nombre de Usuario', 'correo', 'celular' ya existe!",
          });
        }
      } catch (error) {
        console.error("RegistrarClientePage:fetchInsertCustomer:", error);
      }
    },
  },
  mounted() {
    this.fetchAllGenders();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
  },
};
</script>