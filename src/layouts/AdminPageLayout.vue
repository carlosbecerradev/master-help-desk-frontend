<template>
  <div class="employee-page-layout">
    <admin-lateral-navbar></admin-lateral-navbar>
    <section class="main-layout">
      <slot />
    </section>
  </div>
</template>

<script>
import AdminLateralNavbar from "../components/navs/AdminLateralNavbar.vue";

export default {
  components: {
    AdminLateralNavbar,
  },
};
</script>

<style>
.main-layout {
  margin-left: 280px;
}
</style>