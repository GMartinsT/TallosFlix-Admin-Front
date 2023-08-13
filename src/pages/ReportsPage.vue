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
            <GenericTable
              :getData="getComments"
              :columns="columns"
              :actionColumn="actionColumn"
              :reload="reloadCount"
            >
            </GenericTable>
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
    <CommentPopup
      v-if="showPopup"
      :commentText="selectedCommentText"
      :closePopup="closePopup"
    />
  </div>
</template>

<script>
import CommentsService from "src/services/CommentsService.js";
import Card from "src/components/Cards/Card.vue";
import GenericTable from "src/components/GenericTable.vue";
import SessionsService from "src/services/SessionsService.js";
import CommentPopup from "src/components/CommentPopup.vue";

export default {
  components: {
    Card,
    GenericTable,
    CommentPopup,
  },
  data() {
    return {
      comments: [],
      sessions: [],
      columns: [
        { key: "_id", title: "ID" },
        { key: "name", title: "Nome" },
        { key: "email", title: "E-mail" },
        { key: "movie_id", title: "Filme", class: "actions" },
        { key: "date", title: "Data" },
        { key: "actions", title: "Ações", class: "actions" },
      ],
      actionColumn: [
        {
          icon: "fas fa-search-plus",
          click: this.showComment,
        },
      ],
      reloadCount: 0,
      showPopup: false,
      selectedCommentText: "",
    };
  },
  methods: {
    getComments(page) {
      return CommentsService.getAllComments(page);
    },
    async showComment(commentId) {
      try {
        const comment = await CommentsService.getCommentById(commentId);
        this.selectedCommentText = comment.text;
        this.showPopup = true;
      } catch (error) {
        console.error("Erro ao obter detalhes do comentário:", error);
      }
    },
    closePopup() {
      this.showPopup = false;
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
