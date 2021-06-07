<template>
  <div class="customer-request">
    <customer-page-layout>
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6">
          <b-card class="p-4 my-5">
            <h1 class="text-center mb-5">Solicitud de Soporte</h1>
            <b-form @submit.prevent="executeFetchInsertCustomerRequest">
              <b-form-group label="Tipo de solicitud:">
                <b-form-select
                  v-model="customerRequest.requestTypeName"
                  :options="requestTypeNameList"
                  required
                ></b-form-select>
              </b-form-group>

              <b-form-group label="Descripción del problema:">
                <b-form-textarea
                  v-model="customerRequest.description"
                  placeholder="Me sucedio..."
                  rows="4"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>

              <div class="mt-4">
                <b-button block type="submit" variant="purple">Enviar</b-button>
              </div>
            </b-form>
          </b-card>
        </div>
      </div>
    </customer-page-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CustomerPageLayout from "@/layouts/CustomerPageLayout";

export default {
  data() {
    return {
      customerRequest: {
        requestTypeName: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters(["requestTypeNameList"]),
  },
  methods: {
    ...mapActions(["fetchRequestTypesNameList", "fetchInsertCustomerRequest"]),
    async executeFetchInsertCustomerRequest() {
      let flag = await this.fetchInsertCustomerRequest(this.customerRequest);

      if (flag == true) {
        this.$swal.fire({
          icon: "success",
          title: "Su solicitud ha sido enviada.",
        });
        this.customerRequest = {};
      }
    },
  },
  mounted() {
    this.fetchRequestTypesNameList();
  },
  components: {
    CustomerPageLayout,
  },
};
</script>