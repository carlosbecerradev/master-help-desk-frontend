<template>
  <div class="list-user-page">
    <admin-page-layout>
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand
              ><span class="main-header-title">Clientes</span></b-navbar-brand
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
import AdminPageLayout from "../../layouts/AdminPageLayout";

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
        { key: "createdAt", label: "Fecha de Creación" },
        { key: "userId", label: "Id de Usuario" },
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
    async fetchClientes() {
      try {
        const response = await fetch("http://localhost:8080/api/customers", {
          method: "GET",
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

      async function fetchDeleteClienteById() {
        try {
          const response = await fetch(
            "http://localhost:8080/api/customers/" + idCliente,
            {
              method: "DELETE",
            }
          );

          return response.status == 200 ? true : false;
        } catch (error) {
          console.error("ListarClientesPage:fetchDeleteClienteById:", error);
        }
      }
    },
  },
  mounted() {
    this.fetchClientes();
  },
  components: {
    AdminPageLayout,
  },
};
</script>