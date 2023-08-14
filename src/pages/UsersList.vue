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

export default {
  components: {
    Card,
    GenericTable,
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
          console.log("Usuário deletado com sucesso.");
          this.reloadCount++;
        })
        .catch((error) => {
          console.error("Erro ao deletar usuário:", error);
        });
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
</style>
