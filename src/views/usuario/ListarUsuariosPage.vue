<template>
  <div class="list-user-page">
    <admin-page-layout>
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand
              ><span class="main-header-title">Usuarios</span></b-navbar-brand
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

        <div class="main-body">
          <div class="list">
            <div class="list-header">
              <router-link
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
import AdminPageLayout from "../../layouts/AdminPageLayout";

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
        { key: "password", label: "Contraseña" },
        { key: "authority", label: "Rol" },
        { key: "authority", label: "Rol" },
        {
          key: "enabled",
          label: "Disponible",
          formatter: (value) => {
            return value ? "Si" : "No";
          },
        },
        { key: "createdAt", label: "Fecha de Creación" },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          method: "GET",
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
        .then((result) => {
          if (result.isConfirmed) {
            if (fetchDeleteUserById()) {
              this.$swal.fire(
                "Elimimado!",
                "El registro se elimino.",
                "success"
              );
              this.fetchUsuarios();
            } else {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Este registro esta siendo utilizado!",
              });
            }
          }
        });

      async function fetchDeleteUserById() {
        try {
          const response = await fetch(
            "http://localhost:8080/api/users/" + idUser,
            {
              method: "DELETE",
            }
          );

          return response.status == 200 ? true : false;
        } catch (error) {
          console.error("ListarUsuariosPage:fetchUsuarios:", error);
        }
      }
    },
  },
  mounted() {
    this.fetchUsuarios();
  },
  components: {
    AdminPageLayout,
  },
};
</script>