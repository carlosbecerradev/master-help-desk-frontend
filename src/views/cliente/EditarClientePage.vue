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
              <h1 class="text-center mb-5">Editar Cliente</h1>
              <b-form @submit.prevent="fetchUpdateCustomer">
                <b-form-group label="Id:">
                  <b-form-input
                    v-model="customer.id"
                    type="text"
                    disabled
                  ></b-form-input>
                </b-form-group>

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
import { mapGetters } from "vuex";
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
        gender: "",
        enabled: true,
      },
      genderOptions: [],
      enabledOptions: [
        { value: true, text: "Activo" },
        { value: false, text: "Inactivo" },
      ],
      idCustomer: 0,
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL", "JWT"]),
  },
  methods: {
    async fetchAllGenders() {
      try {
        const response = await fetch(`${this.apiBaseURL}/customers/genders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.JWT}`,
          },
        });

        this.genderOptions =
          response.status == 200 ? await response.json() : [];
      } catch (error) {
        console.error("EditarClientePage:fetchAllGenders:", error);
      }
    },
    async fetchUpdateCustomer() {
      try {
        const response = await fetch(`${this.apiBaseURL}/customers`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${this.JWT}`,
          },
          body: JSON.stringify(this.customer),
        });

        if (response.status == 200) {
          this.$swal.fire({
            icon: "success",
            title: "Actualizado",
          });
          this.$router.push("/cliente/listar");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tiene campos que completar o el 'correo', 'celular' ya existe!",
          });
        }
      } catch (error) {
        console.error("EditarClientePage:fetchUpdateCustomer:", error);
      }
    },
    async fetchCustomerById() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/customers/${this.idCustomer}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );

        this.customer = response.status == 200 ? await response.json() : null;
      } catch (error) {
        console.error("EditarClientePage:fetchCustomerById:", error);
      }
    },
  },
  mounted() {
    this.fetchAllGenders();
    this.idCustomer = this.$route.params.idCustomer;
    this.fetchCustomerById();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
  },
};
</script>