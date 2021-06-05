<template>
  <div class="ml-auto">
    <b-nav pills>
      <b-nav-item-dropdown
        id="my-nav-dropdown"
        toggle-class="nav-link-custom bg-white text-dark"
        right
      >
        <template #button-content>
          <span class="mr-2">{{ JWTClaims.jwt_subject }}</span>
          <b-icon icon="person-circle" aria-hidden="true"></b-icon>
        </template>
        <b-dropdown-item @click="logout">Cerrar Sesión</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["JWTClaims"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>