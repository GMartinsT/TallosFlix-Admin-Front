<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="userCard">
            <template slot="header">
              <h4 class="card-title">Criar Usuário</h4>
            </template>
            <div class="card-body">
              <edit-form @submit="createUser">
                <div class="form-group">
                  <label for="name">Nome</label>
                  <input
                    v-model="user.name"
                    type="text"
                    class="form-control"
                    id="name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    id="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password">Senha</label>
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    id="password"
                    required
                  />
                </div>
                <button type="submit" class="sbmtBtn">Salvar</button>
              </edit-form>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import EditForm from "src/components/UpdateForm.vue";
import UsersService from "src/services/UsersService.js";

export default {
  components: {
    Card,
    EditForm,
  },

  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    createUser() {
      UsersService.createUser(this.user)
        .then(() => {
          this.$notify({
            message: "Usuário criado com sucesso.",
            title: "Usuário registrado!",
            type: "success",
            timeout: 5000,
          });
          this.$router.push({ name: "Users List" });
        })
        .catch((error) => {
          this.$notify({
            message: "Não foi possível criar o usuário.",
            title: "Erro!",
            type: "danger",
            timeout: 5000,
          });
          console.error("Erro ao criar usuário:", error);
        });
    },
  },
};
</script>

<style>
.userCard {
  padding-bottom: 0px;
}
.card-body {
  padding: 20px;
}

.card-header {
  padding: 15px 15px 10px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}

.sbmtBtn {
  padding: 5px 20px;
  background-color: #525156 !important;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  margin-block-start: 8px;
  font-weight: bold;
}

.sbmtBtn:hover {
  transform: scale(1.05);
  background-color: #464646 !important;
}
</style>
