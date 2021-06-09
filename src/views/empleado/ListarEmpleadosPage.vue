<template>
  <div class="list-user-page">
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

        <div class="main-body">
          <div class="list">
            <div class="list-header">
              <router-link
                to="/empleado/registrar"
                class="ml-auto btn btn-purple"
                >Registrar Empleados</router-link
              >
            </div>
            <div class="list-body">
              <b-table
                id="employees-table"
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
                      :to="{ path: '/empleado/editar/' + data.item.id }"
                      class="ml-auto btn btn-warning btn-sm"
                      >Editar</router-link
                    >
                    <button
                      @click="deleteEmpleadoById(data.item.id)"
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
                aria-controls="employees-table"
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
        {
          key: "enabled",
          label: "Disponible",
          formatter: (value) => {
            return value ? "Si" : "No";
          },
        },
        { key: "createdAt", label: "Fecha de Creación" },
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
    async fetchEmpleados() {
      try {
        const response = await fetch(`${this.apiBaseURL}/employees`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.JWT}`,
          },
        });
        this.items = response.status == 200 ? await response.json() : [];
      } catch (error) {
        console.error("ListarEmpleadosPage:fetchEmpleados:", error);
      }
    },
    async deleteEmpleadoById(idEmpleado) {
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
            if (await fetchDeleteEmpleadoById()) {
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
          await this.fetchEmpleados();
        });

      let jwt = this.JWT;
      let apiBaseUrl = this.apiBaseURL;

      async function fetchDeleteEmpleadoById() {
        try {
          const response = await fetch(
            `${apiBaseUrl}/employees/${idEmpleado}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          return response.status == 200 ? true : false;
        } catch (error) {
          console.error("ListarEmpleadosPage:deleteEmpleadoById:", error);
        }
      }
    },
  },
  mounted() {
    this.fetchEmpleados();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
  },
};
</script>