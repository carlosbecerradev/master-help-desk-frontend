<template>
  <div class="customer-page-layout">
    <b-navbar toggleable="lg" sticky type="dark" variant="dark" class="bg-purple">
      <b-container>
        <b-navbar-brand href="#"
          ><div class="img-brand">
            <img src="@/assets/logo-white.svg" alt="" /></div
        ></b-navbar-brand>
        <user-dropdown></user-dropdown>
      </b-container>
    </b-navbar>
    <b-container>
      <slot />
    </b-container>
  </div>
</template>
<script>
import UserDropdown from "@/components/auth/UserDropdown";

export default {
  components: {
    UserDropdown,
  },
};
</script>

<style>
.img-brand {
  width: 150px;
}
</style>