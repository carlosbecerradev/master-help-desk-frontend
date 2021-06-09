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
                <b-tab title="Tickets en Atención"><p>WIP</p></b-tab>
                <b-tab title="Tickets Terminados"><p>WIP</p></b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </tecnico-page-layout>
  </div>
</template>

<script>
import TecnicoPageLayout from "@/layouts/TecnicoPageLayout";
import UserDropdown from "@/components/auth/UserDropdown";
import TicketsPendientesTab from "@/components/tabs/TicketsPendientesTab";

export default {
  components: {
    TecnicoPageLayout,
    UserDropdown,
    TicketsPendientesTab,
  },
};
</script>