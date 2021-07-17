<template>
  <div class="analista-dashboard">
    <analista-page-layout>
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand
              ><span class="main-header-title">Dashboard</span></b-navbar-brand
            >
            <user-dropdown></user-dropdown>
          </b-navbar>
        </div>
        <div class="main-body">
          <div class="list">
            <div class="list-header">
              <div class="dashboard-cards">
                <div class="dashboard-card first">
                  <div class="dashboard-card-block">
                    <div class="dashboard-card-title">Solicitudes de Hoy</div>
                    <div class="dashboard-card-icon">
                      <b-icon
                        icon="file-earmark-person"
                        aria-hidden="true"
                      ></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.countCustomerRequestToday }}
                    </div>
                  </div>
                </div>
                <div class="dashboard-card second">
                  <div class="dashboard-card-block">
                    <div class="dashboard-card-title">Solicitudes del Mes</div>
                    <div class="dashboard-card-icon">
                      <b-icon
                        icon="file-earmark-person"
                        aria-hidden="true"
                      ></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.countCustomerRequestMonth }}
                    </div>
                  </div>
                </div>
                <div class="dashboard-card third">
                  <div class="dashboard-card-block">
                    <div class="dashboard-card-title">
                      Tickets en Atención De Hoy
                    </div>
                    <div class="dashboard-card-icon">
                      <b-icon icon="file-text" aria-hidden="true"></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.countTicketsAtendiendoToday }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="list-body my-4">
              <b-row>
                <b-col cols="12" md="12">
                  <div class="chart-block">
                    <p class="text-center mt-3 chart-title">
                      Gráfica Semanal de la Atención de Tickets por Técnico
                    </p>
                    <label style="min-width: 130px"
                      >Filtrar por Técnico de Soporte</label
                    >
                    <b-form-select
                      @input="fetchTicketsCerradosOfWeekByTecnico()"
                      v-model="tecnicoId"
                      :options="enabledTecnicosList"
                    ></b-form-select>
                    <div class="my-4">
                      <bar-chart
                        :chart-data="datacollection"
                        :options="chartOptions"
                      ></bar-chart>
                    </div>
                  </div>
                </b-col>
                <b-col cols="12" md="12" lg="6">
                  <div class="chart-block">
                    <p class="text-center mt-3 chart-title">
                      Gráfica Total de los Tipos de Solicitudes recibidas
                    </p>
                    <pie-chart
                      :chart-data="datacollectionPieChart"
                      :options="chartPieOptions"
                      :height="500"
                    ></pie-chart>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </div>
    </analista-page-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import UserDropdown from "@/components/auth/UserDropdown";
import AnalistaPageLayout from "@/layouts/AnalistaPageLayout";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import { COLORS } from "../../utils/list/colors";

export default {
  data() {
    return {
      tecnicoId: 3,
      dashboardCards: {
        countCustomerRequestToday: 0,
        countCustomerRequestMonth: 0,
        countTicketsAtendiendoToday: 0,
      },
      datacollection: {},
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          position: "top",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      datacollectionPieChart: {},
      chartPieOptions: {
        legend: {
          position: "bottom",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL", "JWT", "enabledTecnicosList"]),
  },
  methods: {
    ...mapActions(["fetchAllEnabledTecnicos"]),
    async fetchCustomerRequestCountByToday() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-analista/customer-request-today`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.countCustomerRequestToday =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error(
          "DashboardAnalista:fetchCustomerRequestCountByToday:",
          error
        );
      }
    },
    async fetchCustomerRequestCountByMonth() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-analista/customer-request-month`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.countCustomerRequestMonth =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error(
          "DashboardAnalista:fetchCustomerRequestCountByMonth:",
          error
        );
      }
    },
    async fetchTicketsEnAtencionCountByToday() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-analista/tickets-atendiendo-today`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.countTicketsAtendiendoToday =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error(
          "DashboardAnalista:fetchTicketsEnAtencionCountByToday:",
          error
        );
      }
    },
    async fetchTicketsCerradosOfWeekByTecnico() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-analista/chart/ticket-of-week/employee/${this.tecnicoId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        const body = response.status == 200 ? await response.json() : null;

        this.datacollection = {
          labels: body.labels,
          datasets: [
            {
              label: "Tickets Asignados",
              data: body.values[0],
              borderColor: "#7E03DE",
              backgroundColor: "#7E03DE50",
            },
            {
              label: "Tickets Cerrados",
              data: body.values[1],
              borderColor: "#3EDAFC",
              backgroundColor: "#3EDAFC50",
            },
          ],
        };
      } catch (error) {
        console.error(
          "DashboardTecnico:fetchTicketsCerradosOfWeekByTecnico:",
          error
        );
      }
    },
    async fetchCustomerRequestCountByRequestType() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-analista/chart/customer-request-count`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        const body = response.status == 200 ? await response.json() : null;

        this.datacollectionPieChart = {
          labels: body.labels,
          datasets: [
            {
              label: "Dataset 1",
              data: body.values,
              backgroundColor: Object.values(COLORS),
            },
          ],
        };
      } catch (error) {
        console.error(
          "DashboardTecnico:fetchAllMyTicketsCerradosCount:",
          error
        );
      }
    },
  },
  async mounted() {
    await this.fetchAllEnabledTecnicos();
    this.tecnicoId = await this.enabledTecnicosList[0].value;
    await this.fetchTicketsCerradosOfWeekByTecnico();
    this.fetchCustomerRequestCountByRequestType();
    this.fetchCustomerRequestCountByToday();
    this.fetchCustomerRequestCountByMonth();
    this.fetchTicketsEnAtencionCountByToday();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
    AnalistaPageLayout,
    BarChart,
    PieChart,
  },
};
</script>