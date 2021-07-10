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
          <span class="main-header-title"
            >Tickets Cerrados el año {{ yearSelected }}</span
          >
          <div class="list">
            <div class="list-header">
              <div class="d-flex align-items-center">
                <label style="min-width: 130px">Filtrar por año</label>
                <b-form-select
                  @input="fetchTicketsCerradosReporte(yearSelected)"
                  v-model="yearSelected"
                  :options="yearOptions"
                ></b-form-select>
              </div>

              <b-button
                @click="fetchReportPDF(yearSelected)"
                class="ml-auto btn btn-danger"
                >Generar PDF</b-button
              >
            </div>
            <b-table
              id="tickets-cerrados-report-table"
              hover
              responsive
              :fields="fields"
              :items="items"
            >
            </b-table>
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

export default {
  data() {
    return {
      items: [],
      fields: [
        { key: "month", label: "Mes" },
        { key: "week1", label: "Días (1-7)" },
        { key: "week2", label: "Días (8-14)" },
        { key: "week3", label: "Días (15-21)" },
        { key: "week4", label: "Días (22-28)" },
        { key: "week5", label: "Días (29/30/31)" },
        { key: "total", label: "Total" },
      ],
      yearSelected: 2021,
      yearOptions: [],
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL", "JWT", "JWTClaims"]),
  },
  methods: {
    async fetchTicketsCerradosReporte(year) {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/reports/tickets-cerrados-report?year=${year}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.items = response.status == 200 ? await response.json() : [];
      } catch (error) {
        console.error("TicketReportPage:fetchTicketsCerradosReporte:", error);
      }
    },
    async fetchReportPDF(year) {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/reports/tickets-cerrados-report/pdf?year=${year}`,
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
  },
  components: {
    AdminLateralNavbar,
    AnalistaLateralNavbar,
    UserDropdown,
  },
  mounted() {
    let currentYear = new Date().getFullYear();
    this.fetchTicketsCerradosReporte(currentYear);
    this.yearOptions = [currentYear - 2, currentYear - 1, currentYear];
  },
};
</script>

<style>
.main-layout {
  margin-left: 280px;
}
</style>