<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="userCard">
            <template slot="header">
              <h4 class="card-title">Usuários</h4>
              <p class="card-category">Lista dos usuários cadastrados</p>
            </template>
          </card>
          <div>
            <GenericTable
              :getData="getUsers"
              :columns="columns"
              :actionColumn="actionColumn"
              :reload="reloadCount"
              :getSearch="searchUsers"
              :getById="searchById"
            >
            </GenericTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import GenericTable from "src/components/GenericTable.vue";
import UsersService from "src/services/UsersService.js";
import NotificationsPlugin from "src/components/NotificationPlugin/index.js";

export default {
  components: {
    Card,
    GenericTable,
    NotificationsPlugin,
  },
  data() {
    return {
      users: [],
      columns: [
        { key: "_id", title: "ID" },
        { key: "name", title: "Nome", class: "user-name" },
        { key: "email", title: "E-mail" },
        { key: "actions", title: "Ações", class: "actions" },
      ],
      actionColumn: [
        {
          icon: "fas fa-pencil",
          click: this.editUser,
        },
        {
          icon: "fas fa-trash",
          click: this.deleteUser,
        },
      ],
      reloadCount: 0,
    };
  },
  methods: {
    getUsers(page) {
      return UsersService.findAll(page);
    },

    editUser(id) {
      this.$router.push({ name: "User", params: { id: id } });
    },

    deleteUser(id) {
      UsersService.deleteUser(id)
        .then(() => {
          this.$notify({
            message: "Usuário foi excluido com sucesso.",
            title: "Usuário deletado!",
            type: "danger",
            timeout: 5000,
          });
          console.log("Usuário deletado com sucesso.");
          this.reloadCount++;
        })
        .catch((error) => {
          this.$notify({
            message: "Não foi possível excluír o usuário.",
            title: "Erro!",
            type: "warning",
            timeout: 5000,
          });
          console.error("Erro ao deletar usuário:", error);
        });
    },

    searchUsers(page, searchType, searchQuery) {
      return UsersService.searchUsers(page, searchType, searchQuery);
    },

    async searchById(searchQuery) {
      const result = await UsersService.findUserById(searchQuery);
      const data = [result.data];
      console.log(data);
      return data;
    },
  },
};
</script>
<style>
.userCard {
  margin-bottom: 10px;
  padding-bottom: 5px;
}
th {
  text-align: center !important;
}

.user-name {
  white-space: nowrap;
}

.edit-icon:hover {
  color: rgb(0, 88, 207);
  transform: scale(1.2);
}

.delete-icon:hover {
  color: red;
  transform: scale(1.2);
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-input {
  flex-grow: 1;
  padding: 5px;
  border: none;
}

.search-icon {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}

.search-icon i {
  font-size: 16px;
}
.search-box {
  display: flex;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  padding-right: 5px;
}

select {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  height: 2.3rem;
  margin-right: 5px;
  outline: none;
}
</style>
