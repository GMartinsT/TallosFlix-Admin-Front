<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="comment-card">
            <template slot="header">
              <h4 class="card-title">Comentários</h4>
              <p class="card-category">Lista dos comentários</p>
            </template>
          </card>
          <div class="table-responsive">
            <GenericTable
              :getData="getComments"
              :columns="commentsColumns"
              :actionColumn="actionCommentsColumn"
              :reload="reloadCommentsCount"
            >
            </GenericTable>
          </div>
          <card class="session-card">
            <template slot="header">
              <h4 class="card-title">Sessões</h4>
              <p class="card-category">Lista dos sessões</p>
            </template>
          </card>
          <div class="table-responsive">
            <GenericTable
              :getData="getSessions"
              :columns="sessionsColumns"
              :actionColumn="actionSessionsColumn"
              :reload="reloadSessionsCount"
            >
            </GenericTable>
          </div>
        </div>
      </div>
    </div>
    <Popup
      v-if="showCommentPopup"
      :popupTitle="popupCommentTitle"
      :popupText="selectedCommentText"
      :closePopup="closeCommentPopup"
    />
    <Popup
      v-if="showSessionPopup"
      :popupTitle="popupSessionTitle"
      :popupText="selectedSessionText"
      :closePopup="closeSessionPopup"
    />
  </div>
</template>

<script>
import CommentsService from "src/services/CommentsService.js";
import Card from "src/components/Cards/Card.vue";
import GenericTable from "src/components/GenericTable.vue";
import SessionsService from "src/services/SessionsService.js";
import Popup from "src/components/Popup.vue";

export default {
  components: {
    Card,
    GenericTable,
    Popup,
  },
  data() {
    return {
      comments: [],
      commentsColumns: [
        { key: "_id", title: "ID" },
        { key: "name", title: "Nome", class: "user-name" },
        { key: "email", title: "E-mail" },
        { key: "movie_id", title: "ID do Filme" },
        { key: "date", title: "Data" },
        { key: "actions", title: "Ações", class: "actions" },
      ],
      actionCommentsColumn: [
        {
          icon: "fas fa-search-plus",
          click: this.showComment,
        },
      ],
      reloadCommentsCount: 0,
      showCommentPopup: false,
      popupCommentTitle: "Comentário",
      selectedCommentText: "",
      sessions: [],
      sessionsColumns: [
        { key: "_id", title: "ID" },
        { key: "user_id", title: "ID do Usuário" },
        { key: "actions", title: "Ações", class: "actions" },
      ],
      actionSessionsColumn: [
        {
          icon: "fas fa-search-plus",
          click: this.showJwt,
        },
      ],
      reloadSessionsCount: 0,
      popupSessionTitle: "Sessão",
      selectedSessionText: "",
      showSessionPopup: false,
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
        this.showCommentPopup = true;
      } catch (error) {
        console.error("Erro ao obter detalhes do comentário:", error);
      }
    },
    closeCommentPopup() {
      this.showCommentPopup = false;
    },
    getSessions(page) {
      return SessionsService.getAllSessions(page);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async showJwt(sessionId) {
      try {
        const session = await SessionsService.getSessionById(sessionId);
        console.log(session);
        this.selectedSessionText = session.data.jwt;
        this.showSessionPopup = true;
      } catch (error) {
        console.error("Erro ao obter detalhes da sessão:", error);
      }
    },
    closeSessionPopup() {
      this.showSessionPopup = false;
    },
  },
};
</script>

<style scoped>
.comment-card {
  margin-bottom: 10px;
}

.session-card {
  margin-bottom: 10px;
  margin-top: 30px;
}
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

.user-name {
  white-space: nowrap;
}
</style>
