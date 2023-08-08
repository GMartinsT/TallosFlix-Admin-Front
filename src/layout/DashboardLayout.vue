<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/homepage">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Painel Inicial</p>
      </sidebar-link>
      <sidebar-link to="/admin/users">
        <i class="nc-icon nc-circle-09"></i>
        <p>Usuários</p>
      </sidebar-link>
      <sidebar-link to="/admin/movies">
        <i class="nc-icon nc-button-play"></i>
        <p>Filmes</p>
      </sidebar-link>
      <sidebar-link to="/admin/theaters">
        <i class="nc-icon nc-bank"></i>
        <p>Cinemas</p>
      </sidebar-link>
      <sidebar-link to="/admin/reports">
        <i class="nc-icon nc-notification-70"></i>
        <p>Reports</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
