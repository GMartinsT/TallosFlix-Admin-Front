<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-single-02 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Usuários</p>
              <h4 class="card-title">{{ usersCount }}</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-button-play text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Filmes</p>
              <h4 class="card-title">{{ moviesCount }}</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-bank text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Cinemas</p>
              <h4 class="card-title">{{ theatersCount }}</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-chat-round text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Comentários</p>
              <h4 class="card-title">{{ commentsCount }}</h4>
            </div>
          </stats-card>
        </div>
        <div class="editCard">
          <card class="editPCard">
            <template slot="header">
              <h3>Meu Perfil:</h3>
            </template>
            <div>
              <div class="profileInput">
                <label for="name">Nome:</label>
                <input
                  type="text"
                  v-model="user.name"
                  placeholder="user.name"
                />
              </div>
              <div class="profileInput">
                <label for="email">E-mail:</label>
                <input type="email" v-model="user.email" />
              </div>
              <div class="profileInput">
                <label for="password">Senha:</label>
                <input
                  type="password"
                  v-model="user.password"
                  placeholder="Senha do usuário"
                />
              </div>
            </div>
            <div class="editBtn">
              <button class="editProfile" @click="updateUser">Editar</button>
            </div>
          </card>
        </div>
        <div class="moviecard">
          <card class="tableCard">
            <template slot="header">
              <h4 class="card-title">Lançamentos:</h4>
              <p class="card-category">Lista dos filmes mais recentes</p>
            </template>
          </card>
          <div class="table-container">
            <div class="table-responsive">
              <table class="movieTable">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Data de Lançamento</th>
                    <th>Duração</th>
                    <th>Nota IMDb</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="movie in latestMovies" :key="movie._id">
                    <td class="movie-title">{{ movie.title }}</td>
                    <td>{{ movie.released }}</td>
                    <td>{{ movie.runtime }} min</td>
                    <td>{{ movie.imdb.rating }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
import UsersService from "src/services/UsersService.js";
import MoviesService from "src/services/MoviesService.js";
import TheatersService from "src/services/TheatersService.js";
import CommentsService from "src/services/CommentsService.js";

export default {
  components: {
    Card,
    LTable,
    StatsCard,
  },
  data() {
    return {
      user: {
        _id: "",
        name: "",
        email: "",
        password: "",
      },
      latestMovies: [],
      usersCount: 0,
      moviesCount: 0,
      theatersCount: 0,
      commentsCount: 0,
    };
  },
  created() {
    this.loadLatestMovies();
    this.loadUsersCount();
    this.loadMoviesCount();
    this.loadTheatersCount();
    this.loadCommentsCount();
    const userId = localStorage.getItem("userId");

    if (userId) {
      UsersService.findUserById(userId)
        .then((response) => {
          (this.user._id = response.data._id),
            (this.user.name = response.data.name),
            (this.user.email = response.data.email),
            (this.user.password = response.data.password),
            console.log("Detalhes do usuário:", this.user);
        })
        .catch((error) => {
          console.error("Erro ao obter os detalhes do usuário:", error);
        });
    } else {
      console.warn("UserId não encontrado no LocalStorage.");
    }
  },
  methods: {
    updateUser() {
      UsersService.updateUser(this.user._id, this.user)
        .then((response) => {
          console.log("Detalhes do usuário atualizados:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao atualizar os detalhes do usuário:", error);
        });
    },
    async loadLatestMovies() {
      try {
        const response = await MoviesService.getAllMovies(1);
        this.latestMovies = response.data.data.slice(0, 5);
        console.log(this.latestMovies);
      } catch (error) {
        console.error("Erro ao carregar os filmes mais recentes:", error);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    async loadUsersCount() {
      try {
        const response = await UsersService.getUsersCount();
        this.usersCount = response.data;
      } catch (error) {
        console.error("Erro ao obter a contagem de usuários:", error);
      }
    },

    async loadMoviesCount() {
      try {
        const response = await MoviesService.getMoviesCount();
        this.moviesCount = response.data;
      } catch (error) {
        console.error("Erro ao obter a contagem de filmes:", error);
      }
    },

    async loadTheatersCount() {
      try {
        const response = await TheatersService.getTheatersCount();
        this.theatersCount = response.data;
      } catch (error) {
        console.error("Erro ao obter a contagem de cinemas:", error);
      }
    },

    async loadCommentsCount() {
      try {
        const response = await CommentsService.getCommentsCount();
        this.commentsCount = response.data;
      } catch (error) {
        console.error("Erro ao obter a contagem de comentários:", error);
      }
    },
  },
};
</script>
<style>
.profileInput {
  display: flex;
  flex-direction: column;
}

.editBtn {
  margin-top: 10px;
  padding: 0 !important;
}

.editProfile {
  background-color: #525156;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  width: 13rem;
  font-weight: bold;
}

.editProfile:hover {
  background-color: #464646;
  transform: scale(1.05);
}

.moviecard {
  width: 72.1%;
}

.editCard {
  margin-left: 15px;
  margin-right: 30px;
  width: 22.2%;
}

.tableCard {
  margin-bottom: 0px;
}

.movieTable {
  width: 100%;
  margin-bottom: 0;
}

.movie-title {
  white-space: nowrap;
}

table {
  border: 1px solid rgba(0, 0, 0, 0.125);
}

thead {
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #fff;
}

th {
  padding: 0 3.5rem;
  font-weight: 550;
  color: #505050;
  text-align: center;
}

td {
  padding: 0.45rem 3.5rem;
  text-align: center;
}

.editPCard {
  padding-bottom: 8px;
  margin-bottom: 0px;
}

.navbar-brand {
  margin-left: 40%;
}

.navbar-nav {
  padding-right: 1rem;
}

.content {
  background-color: #f8f8f8;
  padding: 30px 15px 5px;
  min-height: calc(100% - 147px) !important;
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
}

.card-body {
  margin-bottom: 3px;
}
</style>
