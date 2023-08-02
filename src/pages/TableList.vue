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
            <generic-table>
              <template v-slot:header>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
              </template>
              <template>
                <tr v-for="(user, index) in users" :key="index">
                  <td>{{ user._id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                </tr>
              </template>
            </generic-table>
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
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      UsersService.findAll()
        .then((response) => {
          this.users = response.data;
          console.log("Usuários obtidos:", this.users);
        })
        .catch((error) => {
          console.error("Erro ao obter a lista de usuários:", error);
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
</style>
