<template>
  <div class="list-user-page">
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

        <div class="main-body">
          <div class="list">
            <div class="list-header">
              <router-link
                v-if="false"
                to="/usuario/registrar"
                class="ml-auto btn btn-purple"
                >Registrar Usuario</router-link
              >
            </div>
            <div class="list-body">
              <b-table
                id="users-table"
                hover
                :fields="fields"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                responsive="md"
              >
                <!-- A virtual composite column -->
                <template #cell(actions)="data">
                  <div class="d-flex">
                    <router-link
                      :to="{ path: '/usuario/editar/' + data.item.id }"
                      class="ml-auto btn btn-warning btn-sm"
                      >Editar</router-link
                    >
                    <button
                      @click="deleteUserById(data.item.id)"
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
                aria-controls="users-table"
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
      textVariable: "text test",
      mainProps: { width: 50, height: 50, class: "m1" },
      perPage: 10,
      currentPage: 1,
      items: [],
      fields: [
        { key: "id", label: "Id" },
        { key: "username", label: "Nombre de Usuario" },
        //{ key: "password", label: "Contraseña" },
        { key: "authority", label: "Rol" },
        { key: "authority", label: "Rol" },
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
    async fetchUsuarios() {
      try {
        const response = await fetch(`${this.apiBaseURL}/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.JWT}`,
          },
        });

        this.items = response.status == 200 ? await response.json() : null;
      } catch (error) {
        console.error("ListarUsuariosPage:fetchUsuarios:", error);
      }
    },
    deleteUserById(idUser) {
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
            if (await fetchDeleteUserById()) {
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
          await this.fetchUsuarios();
        });

      let jwt = this.JWT;
      let apiBaseUrl = this.apiBaseURL;

      async function fetchDeleteUserById() {
        try {
          const response = await fetch(`${apiBaseUrl}/users/${idUser}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });

          return response.status == 200 ? true : false;
        } catch (error) {
          console.error("ListarUsuariosPage:fetchUsuarios:", error);
        }
      }
    },
    formatToDMY,
  },
  mounted() {
    this.fetchUsuarios();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
  },
};
</script>