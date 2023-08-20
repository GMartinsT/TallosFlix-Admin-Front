<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Painel Inicial</a>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout">Log out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import store from "src/store/store.js";
import SessionsService from "src/services/SessionsService.js";

export default {
  methods: {
    async logout() {
      await SessionsService.removeSession(localStorage.getItem("access_token"));
      store.dispatch("logoutUser");
      localStorage.removeItem("userId");
      localStorage.removeItem("access_token");

      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
