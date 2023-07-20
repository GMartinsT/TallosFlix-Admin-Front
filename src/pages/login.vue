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
      <form class="login-form">
        <label class="labelEmail" for="email">E-mail:</label>
        <input type="email" placeholder="Email" required />
        <label for="password">Senha:</label>
        <input type="password" placeholder="Senha" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </body>
</template>
<script>
export default {
  name: "Login",
  data() {
    return { showPassword: false };
  },
  setup() {
    const user = ref({
      email: "",
      password: "",
    });

    return {
      user,
    };
  },
};
</script>
<style scoped>
body {
  background-image: url("/home/gmartins/documentos/tallos/TallosFlix-Admin-Front/public/img/login/backgroundlogin1.jpg");
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
}

.login-form button:hover {
  background-color: rgb(10, 40, 209);
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
