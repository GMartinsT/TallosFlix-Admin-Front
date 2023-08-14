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
            <GenericTable
              :getData="getMovies"
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
import MoviesService from "src/services/MoviesService.js";

export default {
  components: {
    Card,
    GenericTable,
  },
  data() {
    return {
      movies: [],
      columns: [
        { key: "_id", title: "ID" },
        { key: "title", title: "Título", class: "movie-title" },
        { key: "genres", title: "Gênero" },
        { key: "released", title: "Data de Lançamento" },
        { key: "actions", title: "Ações", class: "actions" },
      ],
      actionColumn: [
        {
          icon: "fas fa-search-plus",
          click: this.editMovie,
        },
        {
          icon: "fas fa-trash",
          click: this.deleteMovie,
        },
      ],
      reloadCount: 0,
    };
  },
  methods: {
    getMovies(page) {
      return MoviesService.getAllMovies(page);
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

.actions {
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
