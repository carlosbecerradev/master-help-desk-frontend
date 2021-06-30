<template>
  <analista-page-layout>
    <div class="container">
      <div class="main">
        <b-navbar variant="faded" type="light">
          <b-navbar-brand
            ><span class="main-header-title"
              >Solicitudes Recibidas</span
            ></b-navbar-brand
          >
          <user-dropdown></user-dropdown>
        </b-navbar>
      </div>

      <div class="main-body">
        <div class="list">
          <div class="list-header"></div>
          <div class="list-body">
            <b-table
              id="employees-table"
              hover
              responsive
              :fields="fields"
              :items="enabledCustomerRequestList"
              :per-page="perPage"
              :current-page="currentPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
            >
              <!-- A custom formatted column -->
              <template #cell(customerDto)="data">
                <b-button
                  variant="info"
                  @click="
                    $bvModal.show('bv-modal-customer-info');
                    customerInfo = data.item.customerDto;
                  "
                  >Ver</b-button
                >
              </template>
              <!-- A virtual composite column -->
              <template #cell(actions)="data">
                <div class="d-flex">
                  <b-button
                    variant="success"
                    @click="
                      $bvModal.show('bv-modal-generate-ticket');
                      customerRequestSelected = data.item;
                    "
                    >Generar Ticket</b-button
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

            <customer-info-modal :data="customerInfo" />
            <generar-ticket-modal :data="customerRequestSelected" />
          </div>
        </div>
      </div>
    </div>
  </analista-page-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AnalistaPageLayout from "@/layouts/AnalistaPageLayout";
import UserDropdown from "@/components/auth/UserDropdown";
import CustomerInfoModal from "../../components/modals/CustomerInfoModal";
import GenerarTicketModal from "../../components/modals/GenerarTicketModal";
import formatToDMYHM from "@/utils/format/DateTimeFormatUtil";

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      sortBy: "createdAt",
      sortDesc: true,
      fields: [
        { key: "id", label: "Id" },
        {
          key: "customerDto",
          label: "Ciente",
          formatter: (value) => {
            return `${value.name} ${value.surname}`;
          },
        },
        {
          key: "requestType",
          label: "TIpo de solicitud",
          formatter: (value) => {
            return value.name;
          },
        },
        { key: "description", label: "Descripción" },
        {
          key: "createdAt",
          label: "F. Recibida",
          formatter: (value) => {
            return this.formatToDMYHM(value);
          },
        },
        { key: "actions", label: "Acciones" },
      ],
      customerInfo: {},
      customerRequestSelected: {},
    };
  },
  computed: {
    ...mapGetters(["enabledCustomerRequestList"]),
    rows() {
      return this.enabledCustomerRequestList.length;
    },
  },
  methods: {
    ...mapActions(["fetchAllEnabledCustomerRequests"]),
    formatToDMYHM,
  },
  mounted() {
    this.fetchAllEnabledCustomerRequests();
  },
  components: {
    AnalistaPageLayout,
    UserDropdown,
    CustomerInfoModal,
    GenerarTicketModal,
  },
};
</script>
    Custome
    GenerarTicketModalrInfoModal