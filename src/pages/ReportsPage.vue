<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Comentários</h4>
              <p class="card-category">Lista dos comentários</p>
            </template>
          </card>
          <div class="table-responsive">
            <generic-table class="table table-striped">
              <template v-slot:header>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Movie ID</th>
                <th>Data</th>
                <th>Comentário</th>
              </template>
              <template>
                <tr v-for="(comment, index) in comments" :key="index">
                  <td>{{ comment._id }}</td>
                  <td class="user-name">{{ comment.name }}</td>
                  <td>{{ comment.email }}</td>
                  <td>{{ comment.movie_id }}</td>
                  <td>{{ formatDate(comment.date) }}</td>
                  <td class="commenttd">{{ comment.text }}</td>
                </tr>
              </template>
            </generic-table>
          </div>
          <card>
            <template slot="header">
              <h4 class="card-title">Sessões</h4>
              <p class="card-category">Lista dos sessões</p>
            </template>
          </card>
          <div class="table-responsive">
            <generic-table class="table table-striped">
              <template v-slot:header>
                <th>ID</th>
                <th>ID do Usuário</th>
                <th>Token</th>
              </template>
              <template>
                <tr v-for="(session, index) in sessions" :key="index">
                  <td>{{ session._id }}</td>
                  <td>{{ session.user_id }}</td>
                  <td>{{ session.jwt }}</td>
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
import CommentsService from "src/services/CommentsService.js";
import Card from "src/components/Cards/Card.vue";
import GenericTable from "src/components/GenericTable.vue";
import SessionsService from "src/services/SessionsService.js";

export default {
  components: {
    Card,
    GenericTable,
  },
  data() {
    return {
      comments: [],
      sessions: [],
    };
  },
  created() {
    this.getComments();
    this.getSessions();
  },
  methods: {
    getComments() {
      CommentsService.getAllComments()
        .then((response) => {
          this.comments = response;
          console.log("Comentários obtidos:", this.comments);
        })
        .catch((error) => {
          console.error("Erro ao obter a lista de comentários:", error);
        });
    },
    getSessions() {
      SessionsService.getAllSessions()
        .then((response) => {
          this.sessions = response;
          console.log("Sessões obtidos:", this.sessions);
        })
        .catch((error) => {
          console.error("Erro ao obter a lista de sessões:", error);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.table {
  table-layout: fixed;
  width: 100%;
}

.commenttd {
  white-space: normal;
  min-width: 30rem;
  word-wrap: break-word;
}
</style>
