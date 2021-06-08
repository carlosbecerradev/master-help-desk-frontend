<template>
  <analista-page-layout>
    <div class="container">
      <div class="main">
        <b-navbar variant="faded" type="light">
          <b-navbar-brand
            ><span class="main-header-title">Solicitudes Recibidas</span></b-navbar-brand
          >
          <user-dropdown></user-dropdown>
        </b-navbar>
      </div>

      <div class="main-body">
        <div class="list">
          <div class="list-header">
            <router-link to="/empleado/registrar" class="ml-auto btn btn-purple"
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
                    class="ml-auto btn btn-primary btn-sm"
                    >Generar Ticket</router-link
                  >
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
  </analista-page-layout>
</template>

<script>
import AnalistaPageLayout from "@/layouts/AnalistaPageLayout";
import UserDropdown from "@/components/auth/UserDropdown";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [
        {"id": 1, "customer": "Carlo Alberto Becerra Hernandez", "requestType": "Problemas de Hardware", "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", "enabled": true},
        {"id": 2, "customer": "Panduro", "requestType": "Problemas de Hardware", "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", "enabled": true},
        {"id": 3, "customer": "Panduro", "requestType": "Problemas de Hardware", "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", "enabled": true},
        {"id": 4, "customer": "Panduro", "requestType": "Problemas de Hardware", "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", "enabled": true},
      ],
      fields: [
        { key: "id", label: "Id" },
        { key: "customer", label: "Ciente" },
        { key: "requestType", label: "TIpo de solicitud" },
        { key: "description", label: "Descripción" },
        {
          key: "enabled",
          label: "Disponible",
          formatter: (value) => {
            return value ? "Si" : "No";
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  components: {
    AnalistaPageLayout,
    UserDropdown,
  },
};
</script>