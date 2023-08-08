<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="movieCard">
            <template slot="header">
              <h4 class="card-title">Filmes</h4>
              <p class="card-category">Lista dos filmes cadastrados</p>
            </template>
          </card>
          <div>
            <generic-table>
              <template v-slot:header>
                <th>ID</th>
                <th>Título</th>
                <th>Gênero</th>
                <th>Data de Lançamento</th>
                <th class="actionsth">Ações</th>
              </template>
              <template>
                <tr v-for="(movie, index) in movies" :key="index">
                  <td>{{ movie._id }}</td>
                  <td class="movie-title">{{ movie.title }}</td>
                  <td>{{ getTranslatedGenres(movie.genres).join(", ") }}</td>
                  <td>{{ formatDate(movie.released) }}</td>
                  <td class="actionstd">
                    <i
                      class="fas fa-search-plus search-icon"
                      @click="editMovie(movie._id)"
                      style="cursor: pointer; margin-right: 10px"
                    ></i>
                    <i
                      class="fas fa-trash delete-icon"
                      @click="deleteMovie(movie._id)"
                      style="cursor: pointer"
                    ></i>
                  </td>
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
import MoviesService from "src/services/MoviesService.js";

export default {
  components: {
    Card,
    GenericTable,
  },
  data() {
    return {
      movies: [],
      genreMapping: {
        Sport: "Esporte",
        Romance: "Romance",
        Action: "Ação",
        Drama: "Drama",
        Comedy: "Comédia",
        History: "História",
        Biography: "Biografia",
        Animation: "Animação",
        Music: "Música",
        Horror: "Terror",
        Thriller: "Suspense",
        Fantasy: "Fantasia",
        "Sci-Fi": "Ficção Científica",
        War: "Guerra",
        Musical: "Musical",
        "Film-Noir": "Film Noir",
        News: "Notícias",
        Western: "Faroeste",
        Documentary: "Documentário",
        "Talk-Show": "Talk Show",
        Short: "Curta-metragem",
        Crime: "Crime",
        Mystery: "Mistério",
        Adventure: "Aventura",
        Family: "Família",
      },
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    getMovies() {
      MoviesService.getAllMovies()
        .then((response) => {
          this.movies = response;
          console.log("Filmes obtidos:", this.movies);
        })
        .catch((error) => {
          console.error("Erro ao obter a lista de filmes:", error);
        });
    },

    editMovie(id) {
      this.$router.push({ name: "Movie", params: { id: id } });
    },

    deleteMovie(id) {
      MoviesService.deleteMovie(id)
        .then(() => {
          console.log("Filme deletado com sucesso.");
          this.getMovies();
        })
        .catch((error) => {
          console.error("Erro ao deletar filme:", error);
        });
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    getTranslatedGenres(genres) {
      return genres.map((genre) => this.genreMapping[genre] || genre);
    },
  },
};
</script>
<style>
.movieCard {
  margin-bottom: 10px;
  padding-bottom: 5px;
}
th {
  text-align: center !important;
}

.actionstd,
.actionsth {
  width: 10% !important;
}

.movie-title {
  white-space: nowrap;
}

.search-icon:hover {
  color: rgb(0, 88, 207);
  transform: scale(1.2);
}

.delete-icon:hover {
  color: red;
  transform: scale(1.2);
}
</style>
