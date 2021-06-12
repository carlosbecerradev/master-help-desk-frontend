<template>
  <div class="tickets-pendientes-page">
    <tecnico-page-layout>
      <div class="container">
        <div class="main">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand>
              <span class="main-header-title">Tickets Asignados</span>
            </b-navbar-brand>
            <user-dropdown></user-dropdown>
          </b-navbar>
        </div>

        <div class="main-body">
          <div class="list">
            <div class="list-header"></div>
            <div class="list-body">
              <b-tabs content-class="mt-3">
                <b-tab title="Tickets Pendientes" active>
                  <tickets-pendientes-tab />
                </b-tab>
                <b-tab title="Tickets en Atención">
                  <tickets-en-atencion-tab />
                </b-tab>
                <b-tab title="Tickets Terminados">
                  <tickets-terminados-tab />
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>

        <customer-info-modal :data="customerInfo" />
        <customer-request-info-modal :data="customerRequestInfo" />
      </div>
    </tecnico-page-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TecnicoPageLayout from "@/layouts/TecnicoPageLayout";
import UserDropdown from "@/components/auth/UserDropdown";
import TicketsPendientesTab from "@/components/tabs/TicketsPendientesTab";
import TicketsEnAtencionTab from "@/components/tabs/TicketsEnAtencionTab";
import TicketsTerminadosTab from "@/components/tabs/TicketsTerminadosTab";
import CustomerInfoModal from "../../components/modals/CustomerInfoModal";
import CustomerRequestInfoModal from "../../components/modals/CustomerRequestInfoModal";

export default {
  computed: {
    ...mapGetters(["customerInfo", "customerRequestInfo"]),
  },
  components: {
    TecnicoPageLayout,
    UserDropdown,
    TicketsPendientesTab,
    TicketsEnAtencionTab,
    TicketsTerminadosTab,
    CustomerInfoModal,
    CustomerRequestInfoModal,
  },
};
</script>