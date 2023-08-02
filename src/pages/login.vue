<template>
  <body>
    <div class="login-container">
      <div class="card-header">
        <img
          class="logopng"
          src="/img/login/logo-tallos.png"
          alt="Logo Tallosflix"
        />
      </div>
      <form class="login-form" @submit.prevent="handleSubmit">
        <label class="labelEmail" for="email">E-mail:</label>
        <input v-model="user.email" type="email" placeholder="Email" required />
        <label for="password">Senha:</label>
        <input
          v-model="user.password"
          type="password"
          placeholder="Senha"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </body>
</template>
<script>
import { ref } from "vue";
import { login } from "../services/AuthService";
import store from "../store/store";
export default {
  name: "Login",
  setup() {
    const user = ref({
      email: "",
      password: "",
    });

    const handleSubmit = async () => {
      try {
        const response = await login(user.value.email, user.value.password);

        if (response && response.access_token) {
          store.commit("setUser", { email: user.value.email }); // Salvar os dados do usuário no Vuex Store
          store.commit("setToken", response.access_token); // Salvar o token no Vuex Store
          store.commit("setUserId", response.session.user_id);

          location.replace("/#/admin/overview");
          console.log("Login bem-sucedido!");
        } else {
          console.log("Credenciais inválidas");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    };

    return {
      user,
      handleSubmit,
    };
  },
};
</script>
<style scoped>
body {
  background-image: url("/public/img/login/backgroundlogin1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
  margin: 0;
}

.login-container {
  width: 29.5rem;
  height: 16rem;
  background-color: #707070;
  box-shadow: 0 0 15px rgb(29, 113, 209);
  border-radius: 8px;
  margin-left: 5px;
  margin-bottom: 2rem;
}

.card-header {
  background-color: #525156;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 3rem;
  display: flex;
  justify-content: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
}

.login-form input {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.login-form button {
  padding: 5px;
  background-color: #525156;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  margin-block-start: 8px;
  font-weight: bold;
}

.login-form button:hover {
  background-color: rgb(0 88 207);
  border: 1px solid #f1f1f1;
}

label {
  color: #f1f1f1;
  font-weight: bold;
  margin-bottom: 0;
}

.labelEmail {
  padding-top: 8px;
}

.logopng {
  height: 60px;
  margin-block-start: -18px;
}
</style>
