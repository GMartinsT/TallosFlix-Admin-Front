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
// Importe o store.js
import store from "src/store/store.js";

export default {
  methods: {
    logout() {
      // Chame a ação logoutUser do Vuex para limpar os dados do usuário e token
      store.dispatch("logoutUser");

      // Remova os dados do localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("access_token");

      // Redirecione o usuário para a página de login
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
