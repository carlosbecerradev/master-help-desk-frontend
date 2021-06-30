<template>
  <div class="registrar-valoracion">
    <!-- Just an image -->
    <b-navbar variant="dark" type="dark" class="bg-purple">
      <b-container>
        <b-navbar-brand href="#">
          <img class="w-50" src="@/assets/logo-white.svg" alt="Kitten" />
        </b-navbar-brand>
        <user-dropdown></user-dropdown>
      </b-container>
    </b-navbar>

    <b-container>
      <h1 style="font-size: 34px" class="mt-5 mb-4">
        ¿Cómo calificarías nuestra reciente Atención de Soporte?
      </h1>

      <b-row>
        <b-col cols="12" md="6">
          <div class="mt-4">
            <b-form @submit.prevent="fetchInsertAssessment">
              <div class="mb-4">
                <p class="mt-2">
                  Calificación: {{ convertRatingValue(value) }}
                </p>
                <b-form-rating
                  id="rating-3"
                  size="lg"
                  variant="warning"
                  v-model="value"
                  stars="3"
                ></b-form-rating>
              </div>
              <b-form-group label="Observación:">
                <b-form-textarea
                  v-model="observation"
                  placeholder="Escribe una observación que quiera añadir ..."
                  rows="4"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
              <b-button type="submit" class="btn-purple"
                >Enviar valoración</b-button
              >
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserDropdown from "@/components/auth/UserDropdown";

export default {
  data() {
    return {
      value: 1,
      assessmentValues: ["MALA", "BUENA", "EXCELENTE"],
      observation: "",
      assessment: {
        token: "",
        assessmentType: "",
        observation: "",
        ticket: null,
      },
    };
  },
  computed: {
    ...mapGetters(["apiBaseURL"]),
  },
  methods: {
    convertRatingValue(value) {
      let index = value - 1;
      return this.assessmentValues[index];
    },
    async fetchInsertAssessment() {
      this.fillAssessment();
      try {
        const response = await fetch(
          `${this.apiBaseURL}/assessments/free-update`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(this.assessment),
          }
        );

        if (response.status == 200) {
          this.$swal.fire({
            icon: "success",
            title: "Su Valoración fue exitamente enviada!",
            text: "Gracias!",
          });
          this.$router.push("/");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tiene campos que completar o usted ya registro una valoración, intentelo de nuevo!",
          });
        }
      } catch (error) {
        console.error("RegistrarValoracionPage:fetchInsertAssessment:", error);
      }
    },
    fillAssessment() {
      this.assessment.assessmentType = this.convertRatingValue(this.value);
      this.assessment.observation = this.observation;
      console.log(this.assessment);
    },
  },
  components: {
    UserDropdown,
  },
  mounted() {
    this.assessment.token = this.$route.params.ticketToken;
  },
};
</script>