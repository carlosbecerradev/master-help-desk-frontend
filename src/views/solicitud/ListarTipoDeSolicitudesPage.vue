<template>
  <div class="home">
    <admin-lateral-navbar v-if="JWTClaims.jwt_authority == 'ADMINISTRADOR'" />
    <analista-lateral-navbar v-if="JWTClaims.jwt_authority == 'ANALISTA'" />
    <section class="main-layout">
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand
              ><span class="main-header-title"
                >Tipo de Solicitudes</span
              ></b-navbar-brand
            >
            <user-dropdown></user-dropdown>
          </b-navbar>
        </div>

        <div class="main-body">
          <div class="list">
            <div class="list-header">
              <b-button
                @click="$bvModal.show('bv-modal-request-type-insert')"
                class="ml-auto btn btn-purple"
                >Nuevo Registro</b-button
              >
            </div>
            <b-table
              id="request-types-table"
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
                  <b-button
                    @click="
                      $bvModal.show('bv-modal-request-type-update');
                      fetchRequestTypeById(data.item.requestTypeId);
                    "
                    variant="warning"
                    >Editar</b-button
                  >
                  <b-button
                    @click="deleteRequestTypeById(data.item.requestTypeId)"
                    variant="danger"
                    class="ml-2"
                    >Eliminar</b-button
                  >
                </div>
              </template>
            </b-table>

            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              align="center"
              aria-controls="request-types-table"
            >
            </b-pagination>
          </div>
        </div>

        <!--Modal Insert-->
        <b-modal id="bv-modal-request-type-insert" hide-footer>
          <template #modal-title>
            <span>Registrar Tipo de Solicitud</span>
          </template>
          <div class="d-block">
            <b-form @submit.prevent="fetchInsertRequestType">
              <b-form-group label="Nombre:">
                <b-form-input
                  v-model="requestType.name"
                  type="text"
                  placeholder="Tipo de Solicitud"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button block type="submit" class="btn-purple"
                >Registrar</b-button
              >
            </b-form>
          </div>
        </b-modal>

        <!--Modal Update -->
        <b-modal id="bv-modal-request-type-update" hide-footer>
          <template #modal-title>
            <span>Editar Tipo de Solicitud</span>
          </template>
          <div class="d-block">
            <b-form @submit.prevent="fetchUpdateRequestType">
              <b-form-group label="Nombre:">
                <b-form-input
                  v-model="requestType.id"
                  type="text"
                  disabled
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nombre:">
                <b-form-input
                  v-model="requestType.name"
                  type="text"
                  placeholder="Tipo de Solicitud"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Estado:">
                <b-form-select
                  v-model="requestType.enabled"
                  :options="enabledOptions"
                  required
                ></b-form-select>
              </b-form-group>

              <b-button block type="submit" class="btn-purple"
                >Confirmar</b-button
              >
            </b-form>
          </div>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdminLateralNavbar from "@/components/navs/AdminLateralNavbar";
import AnalistaLateralNavbar from "@/components/navs/AnalistaLateralNavbar";
import UserDropdown from "@/components/auth/UserDropdown";
import formatToDMY from "@/utils/format/DateFormatUtil";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
      fields: [
        { key: "requestTypeId", label: "Id" },
        { key: "name", label: "Nombres" },
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
      requestType: { id: null, name: "", enabled: null },
      enabledOptions: [
        { value: true, text: "Activo" },
        { value: false, text: "Inactivo" },
      ],
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL", "JWT", "JWTClaims"]),
    rows() {
      return this.items.length;
    },
  },
  methods: {
    async fetchTipoDeSolicitudes() {
      try {
        const response = await fetch(`${this.apiBaseURL}/request-types`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.JWT}`,
          },
        });
        this.items = response.status == 200 ? await response.json() : [];
      } catch (error) {
        console.error("ListarTipoDeSolicitudes:fetchTipoDeSolicitudes:", error);
      }
    },
    async deleteRequestTypeById(idRequestType) {
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
            if (await fetchDeleteTipoSolicitudById()) {
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
          await this.fetchTipoDeSolicitudes();
        });

      let jwt = this.JWT;
      let apiBaseUrl = this.apiBaseURL;

      async function fetchDeleteTipoSolicitudById() {
        try {
          const response = await fetch(
            `${apiBaseUrl}/request-types/${idRequestType}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          return response.status == 200 ? true : false;
        } catch (error) {
          console.error(
            "ListarTipoDeSolicitudes:deleteRequestTypeById:",
            error
          );
        }
      }
    },
    formatToDMY,
    async fetchInsertRequestType() {
      try {
        const response = await fetch(`${this.apiBaseURL}/request-types`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${this.JWT}`,
          },
          body: JSON.stringify(this.requestType),
        });

        if (response.status == 201) {
          this.$swal.fire({
            icon: "success",
            title: "Registrado",
          });
          this.fetchTipoDeSolicitudes();
          this.requestType = null;
          this.$bvModal.hide("bv-modal-request-type-insert");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Este nombre ya existe, Intentelo de nuevo!",
          });
        }
      } catch (error) {
        console.error(
          "ListarTipoDeSolicitudesPage:fetchInsertRequestType:",
          error
        );
      }
    },
    async fetchRequestTypeById(RequestTypeId) {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/request-types/${RequestTypeId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );

        if (response.status == 200) {
          const data = await response.json();
          this.requestType.id = data.requestTypeId;
          this.requestType.name = data.name;
          this.requestType.enabled = data.enabled;
        }
      } catch (error) {
        console.error(
          "ListarTipoDeSolicitudesPage:fetchRequestTypeById:",
          error
        );
      }
    },
    async fetchUpdateRequestType() {
      try {
        const response = await fetch(`${this.apiBaseURL}/request-types`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${this.JWT}`,
          },
          body: JSON.stringify(this.requestType),
        });

        if (response.status == 200) {
          this.$swal.fire({
            icon: "success",
            title: "Actualizado",
          });
          this.fetchTipoDeSolicitudes();
          this.requestType = null;
          this.$bvModal.hide("bv-modal-request-type-update");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Este nombre ya existe, Intentelo de nuevo!",
          });
        }
      } catch (error) {
        console.error("EditarEmpleadoPage:fetchUpdateRequestType:", error);
      }
    },
  },
  components: {
    AdminLateralNavbar,
    AnalistaLateralNavbar,
    UserDropdown,
  },
  mounted() {
    this.fetchTipoDeSolicitudes();
  },
};
</script>

<style>
.main-layout {
  margin-left: 280px;
}
</style>