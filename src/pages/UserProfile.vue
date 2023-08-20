<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="userCard">
            <template slot="header">
              <h4 class="card-title">Editar Usuário</h4>
            </template>
            <div class="card-body">
              <edit-form @submit="updateUser">
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
import NotificationsPlugin from "src/components/NotificationPlugin/index.js";

export default {
  components: {
    Card,
    EditForm,
    NotificationsPlugin,
  },

  data() {
    return {
      userId: "",
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.userId = this.$route.params.id;
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      UsersService.findUserById(this.userId)
        .then((response) => {
          this.user = response.data;
          console.log("Detalhes do usuário:", this.user);
        })
        .catch((error) => {
          console.error("Erro ao obter os detalhes do usuário:", error);
        });
    },
    updateUser() {
      UsersService.updateUser(this.userId, this.user)
        .then(() => {
          this.$notify({
            message: "Usuário foi editado com sucesso.",
            title: "Usuário atualizado!",
            type: "success",
            timeout: 5000,
          });
          console.log("Usuário atualizado com sucesso.");
          this.$router.push({ name: "Users List" });
        })
        .catch((error) => {
          this.$notify({
            message: "Usuário foi excluido com sucesso.",
            title: "Usuário deletado!",
            type: "danger",
            timeout: 5000,
          });
          console.error("Erro ao atualizar usuário:", error);
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
