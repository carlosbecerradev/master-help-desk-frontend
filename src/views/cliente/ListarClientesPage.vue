<template>
  <div class="list-user-page">
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

        <div class="main-body">
          <div class="list">
            <div class="list-header">
              <router-link
                to="/cliente/registrar"
                class="ml-auto btn btn-purple"
                >Registrar Cliente</router-link
              >
            </div>
            <div class="list-body">
              <b-table
                id="customer-table"
                hover
                responsive
                :fields="fields"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
              >
                <!-- A virtual composite column -->
                <template #cell(actions)="data">
                  <div class="d-flex">
                    <router-link
                      :to="{ path: '/cliente/editar/' + data.item.id }"
                      class="ml-auto btn btn-warning btn-sm"
                      >Editar</router-link
                    >
                    <button
                      @click="deleteClienteById(data.item.id)"
                      class="ml-2 btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </template>
              </b-table>

              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                align="center"
                aria-controls="customer-table"
              >
              </b-pagination>
            </div>
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
import formatToDMY from "@/utils/format/DateFormatUtil";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
      fields: [
        { key: "id", label: "Id" },
        { key: "name", label: "Nombres" },
        { key: "surname", label: "Apellidos" },
        { key: "email", label: "Correo" },
        { key: "cellphone", label: "Celular" },
        { key: "gender", label: "Sexo" },
        {
          key: "enabled",
          label: "Disponible",
          formatter: (value) => {
            return value ? "Si" : "No";
          },
        },
        {
          key: "createdAt",
          label: "Fecha de Creación",
          formatter: (value) => {
            return this.formatToDMY(value);
          },
        },
        { key: "userId", label: "Id de Usuario" },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL", "JWT"]),
    rows() {
      return this.items.length;
    },
  },
  methods: {
    async fetchClientes() {
      try {
        const response = await fetch(`${this.apiBaseURL}/customers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.JWT}`,
          },
        });

        this.items = response.status == 200 ? await response.json() : null;
      } catch (error) {
        console.error("ListarClientesPage:fetchClientes:", error);
      }
    },
    deleteClienteById(idCliente) {
      this.$swal
        .fire({
          title: "¿Estás seguro?",
          text: "Una vez eliminado no podrás recuperarlo!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
          cancelButtonText: "Cancelar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            if (await fetchDeleteClienteById()) {
              this.$swal.fire(
                "Elimimado!",
                "El registro se elimino.",
                "success"
              );
            } else {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Este registro esta siendo utilizado!",
              });
            }
          }
          await this.fetchClientes();
        });

      let jwt = this.JWT;
      let apiBaseUrl = this.apiBaseURL;

      async function fetchDeleteClienteById() {
        try {
          const response = await fetch(`${apiBaseUrl}/customers/${idCliente}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });

          return response.status == 200 ? true : false;
        } catch (error) {
          console.error("ListarClientesPage:fetchDeleteClienteById:", error);
        }
      }
    },
    formatToDMY,
  },
  mounted() {
    this.fetchClientes();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
  },
};
</script>