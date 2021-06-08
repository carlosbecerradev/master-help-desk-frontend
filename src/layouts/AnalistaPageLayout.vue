<template>
  <div class="analista-page-layout">
    <analista-lateral-navbar />
    <section class="main-layout">
      <slot />
    </section>
  </div>
</template>

<script>
import AnalistaLateralNavbar from "@/components/navs/AnalistaLateralNavbar";

export default {
  components: {
    AnalistaLateralNavbar,
  },
};
</script>

<style>
.main-layout {
  margin-left: 280px;
}
</style>