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
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
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
export default {
  components: {
    Card,
    GenericTable,
  },
  data() {
    return {
      users: [
        { id: 1, name: "Usuário 1", email: "user1@example.com" },
        { id: 2, name: "Usuário 2", email: "user2@example.com" },
      ],
    };
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
