<template>
  <div class="tecnico-page-layout">
    <tecnico-lateral-navbar />
    <section class="main-layout">
      <slot />
    </section>
  </div>
</template>

<script>
import TecnicoLateralNavbar from "@/components/navs/TecnicoLateralNavbar";

export default {
  components: {
    TecnicoLateralNavbar,
  },
};
</script>

<style>
.main-layout {
  margin-left: 280px;
}
</style>