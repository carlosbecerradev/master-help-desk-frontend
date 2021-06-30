<template>
  <div class="home">
    <admin-lateral-navbar v-if="JWTClaims.jwt_authority == 'ADMINISTRADOR'" />
    <analista-lateral-navbar v-if="JWTClaims.jwt_authority == 'ANALISTA'" />
    <section class="main-layout">
      <div class="container">
        <div class="main mt-2">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand></b-navbar-brand>
            <user-dropdown></user-dropdown>
          </b-navbar>
        </div>

        <div class="main-body">
          <span class="main-header-title">Valoración de Técnicos</span>
          <div class="list">
            <div class="list-header">
              <b-button @click="fetchReportPDF" class="ml-auto btn btn-danger"
                >Generar PDF</b-button
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
        { key: "employeeId", label: "Id" },
        { key: "employeeFullname", label: "Técnico" },
        { key: "badAssessments", label: "Malas" },
        { key: "goodAssessments", label: "Buenas" },
        { key: "excellentAssessments", label: "Excelentes" },
        { key: "nullAssessments", label: "Vacias" },
        { key: "totalAssessments", label: "Total" },
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
    async fetchValoracionesReporte() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/reports/assessments-employee`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.items = response.status == 200 ? await response.json() : [];
      } catch (error) {
        console.error("ListarTipoDeSolicitudes:fetchTipoDeSolicitudes:", error);
      }
    },
    async fetchReportPDF() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/reports/assessments-employee/pdf`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        console.log(response);
        if (response.status == 200) {
          response.blob().then((blob) => download(blob, "reporte"));
        }

        function download(blob, filename) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error(error);
      }
    },
    formatToDMY,
  },
  components: {
    AdminLateralNavbar,
    AnalistaLateralNavbar,
    UserDropdown,
  },
  mounted() {
    this.fetchValoracionesReporte();
  },
};
</script>

<style>
.main-layout {
  margin-left: 280px;
}
</style>