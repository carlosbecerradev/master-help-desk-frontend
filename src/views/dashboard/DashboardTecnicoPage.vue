<template>
  <div class="tecnico-dashboard">
    <tecnico-page-layout>
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
                    <div class="dashboard-card-title">Tickets de Hoy</div>
                    <div class="dashboard-card-icon">
                      <b-icon
                        icon="file-earmark-person"
                        aria-hidden="true"
                      ></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.todayTicketsCount }}
                    </div>
                  </div>
                </div>
                <div class="dashboard-card second">
                  <div class="dashboard-card-block">
                    <div class="dashboard-card-title">Tickets Cerrados Hoy</div>
                    <div class="dashboard-card-icon">
                      <b-icon
                        icon="file-earmark-check"
                        aria-hidden="true"
                      ></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.todayTicketsCerradosCount }}
                    </div>
                  </div>
                </div>
                <div class="dashboard-card third">
                  <div class="dashboard-card-block">
                    <div class="dashboard-card-title">
                      Total de Tickets Cerrados
                    </div>
                    <div class="dashboard-card-icon">
                      <b-icon
                        icon="file-earmark-check"
                        aria-hidden="true"
                      ></b-icon>
                    </div>
                    <div class="dashboard-card-count">
                      {{ dashboardCards.allTicketsCerradosCount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="list-body my-4">
              <b-row>
                <b-col cols="12" md="12" lg="6">
                  <div class="chart-block">
                    <p class="text-center mt-3 chart-title">
                      Gráfica de mi Valoración en Atención de Tickets
                    </p>
                    <pie-chart
                      :chart-data="datacollection"
                      :options="chartOptions"
                    ></pie-chart>
                  </div>
                </b-col>
                <b-col cols="12" md="6"> </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </div>
    </tecnico-page-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import UserDropdown from "@/components/auth/UserDropdown";
import PieChart from "@/components/charts/PieChart";
import TecnicoPageLayout from "@/layouts/TecnicoPageLayout";

export default {
  data() {
    return {
      datacollection: {},
      dashboardCards: {
        todayTicketsCount: 0,
        todayTicketsCerradosCount: 0,
        allTicketsCerradosCount: 0,
      },
      chartOptions: {
        legend: {
          position: "bottom",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      today: "2021-07-09T00:00:00.00Z",
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL", "JWT"]),
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["Malas", "Buenas", "Excelentes", "Vacías"],
        datasets: [
          {
            label: "Dataset 1",
            data: [30, 70, 40, 20],
            backgroundColor: ["#E80C4E", "#FF9E0D", "#7E03DE", "#6C98A1"],
          },
        ],
      };
    },
    async fetchMyTicketsCountByDay() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-tecnico/tickets-asignados-hoy/${this.today}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.todayTicketsCount =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error("DashboardTecnico:fetchMyTicketsByDay:", error);
      }
    },
    async fetchMyTicketsCerradosCountByDay() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-tecnico/tickets-cerrados-hoy/${this.today}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.todayTicketsCerradosCount =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error(
          "DashboardTecnico:fetchMyTicketsCerradosCountByDay:",
          error
        );
      }
    },
    async fetchAllMyTicketsCerradosCount() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-tecnico/tickets-cerrados`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        this.dashboardCards.allTicketsCerradosCount =
          response.status == 200 ? await response.json() : 0;
      } catch (error) {
        console.error(
          "DashboardTecnico:fetchAllMyTicketsCerradosCount:",
          error
        );
      }
    },
    async fetchMyAssesstments() {
      try {
        const response = await fetch(
          `${this.apiBaseURL}/dashboard-tecnico/my-assesstments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.JWT}`,
            },
          }
        );
        const body = response.status == 200 ? await response.json() : null;
        console.log("body:", body);
        this.datacollection = {
          labels: body.labels,
          datasets: [
            {
              label: "Dataset 1",
              data: body.values,
              backgroundColor: ["#E80C4E", "#FF9E0D", "#7E03DE", "#6C98A1"],
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
  mounted() {
    this.fillData();
    const today = new Date();
    const mes = today.getMonth() + 1;
    const month = mes >= 0 && mes <= 9 ? `0${mes}` : mes;
    const dia = today.getDate();
    const day = dia >= 0 && dia <= 9 ? `0${dia}` : dia;
    this.today = `${today.getFullYear()}-${month}-${day}T00:00:00.00Z`;

    this.fetchMyTicketsCountByDay();
    this.fetchMyTicketsCerradosCountByDay();
    this.fetchAllMyTicketsCerradosCount();
    this.fetchMyAssesstments();
  },
  components: {
    AdminPageLayout,
    UserDropdown,
    PieChart,
    TecnicoPageLayout,
  },
};
</script>