<template>
  <div class="tecnico-dashboard">
    <admin-page-layout>
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
                    <div class="dashboard-card-title">Total de Clientes</div>
                    <div class="dashboard-card-icon">
                      <b-icon icon="person-fill" aria-hidden="true"></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.totalCustomers }}
                    </div>
                  </div>
                </div>
                <div class="dashboard-card second">
                  <div class="dashboard-card-block">
                    <div class="dashboard-card-title">Total de Técnicos</div>
                    <div class="dashboard-card-icon">
                      <b-icon
                        icon="person-lines-fill"
                        aria-hidden="true"
                      ></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.totalTecnicos }}
                    </div>
                  </div>
                </div>
                <div class="dashboard-card third">
                  <div class="dashboard-card-block">
                    <div class="dashboard-card-title">Total de Tickets</div>
                    <div class="dashboard-card-icon">
                      <b-icon icon="file-text" aria-hidden="true"></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.totalTickets }}
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
                      Gráfica Semanal del Volumen de Tickets
                    </p>
                    <div class="my-4">
                      <line-chart
                        :chart-data="datacollectionTicketsWeek"
                        :options="lineChartOptions"
                      ></line-chart>
                    </div>
                  </div>
                </b-col>
                <b-col cols="12" md="12">
                  <div class="chart-block">
                    <p class="text-center mt-3 chart-title">
                      Gráfica Anual del Volumen de Tickets
                    </p>
                    <div class="my-4">
                      <line-chart
                        :chart-data="datacollectionTicketsYear"
                        :options="lineChartOptions"
                      ></line-chart>
                    </div>
                  </div>
                </b-col>
              </b-row>
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
import LineChart from "@/components/charts/LineChart";

export default {
  data() {
    return {
      datacollectionTicketsWeek: {},
      datacollectionTicketsYear: {},
      dashboardCards: {
        totalCustomers: 0,
        totalTecnicos: 0,
        totalTickets: 0,
      },
      lineChartOptions: {
        legend: {
          position: "bottom",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL", "JWT"]),
  },
  methods: {
    async fetchTotalCustomers() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-admin/current-customers`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.totalCustomers =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error("DashboardAdmin:fetchTotalCustomers:", error);
      }
    },
    async fetchTotalTecnicos() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-admin/current-tecnicos`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.totalTecnicos =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error("DashboardAdmin:fetchTotalTecnicos:", error);
      }
    },
    async fetchTotalTickets() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-admin/current-tickets`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.totalTickets =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error("DashboardAdmin:fetchTotalTickets:", error);
      }
    },
    async fetchTicketsOfThisWeek() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-admin/chart/tickets-of-the-week`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        const body = response.status == 200 ? await response.json() : null;

        this.datacollectionTicketsWeek = {
          labels: body.labels,
          datasets: [
            {
              label: "Tickets Generados",
              data: body.values[0],
              borderColor: "#7E03DE",
              backgroundColor: "#7E03DE50",
            },
          ],
        };
      } catch (error) {
        console.error("DashboardAdmin:fetchTicketsOfThisWeek:", error);
      }
    },
    async fetchTicketsOfThisYear() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-admin/chart/tickets-of-the-year`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        const body = response.status == 200 ? await response.json() : null;

        this.datacollectionTicketsYear = {
          labels: body.labels,
          datasets: [
            {
              label: "Tickets Generados",
              data: body.values[0],
              borderColor: "#3EDAFC",
              backgroundColor: "#3EDAFC50",
            },
          ],
        };
      } catch (error) {
        console.error("DashboardAdmin:fetchTicketsOfThisYear:", error);
      }
    },
  },
  mounted() {
    this.fetchTotalCustomers();
    this.fetchTotalTecnicos();
    this.fetchTotalTickets();
    this.fetchTicketsOfThisWeek();
    this.fetchTicketsOfThisYear();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
    LineChart,
  },
};
</script>