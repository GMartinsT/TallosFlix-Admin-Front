<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="movieCard">
            <template slot="header">
              <h4 class="card-title">Inserindo novo filme</h4>
            </template>
            <div class="card-body">
              <form @submit.prevent="createMovie">
                <div class="form-group">
                  <label for="title">Título</label>
                  <input
                    v-model="movie.title"
                    type="text"
                    class="form-control"
                    id="title"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="plot">Plot</label>
                  <textarea
                    v-model="movie.plot"
                    class="form-control"
                    id="plot"
                    required
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="fullplot">FullPlot</label>
                  <textarea
                    v-model="movie.fullplot"
                    class="form-control"
                    id="fullplot"
                    required
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="genres">Gêneros</label>
                  <input
                    v-model="movie.genres"
                    type="text"
                    class="form-control"
                    id="genres"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="runtime">Duração</label>
                  <input
                    v-model="movie.runtime"
                    type="number"
                    class="form-control"
                    id="runtime"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="rated">Classificação</label>
                  <input
                    v-model="movie.rated"
                    type="text"
                    class="form-control"
                    id="rated"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="cast">Elenco</label>
                  <input
                    v-model="movie.cast"
                    type="text"
                    class="form-control"
                    id="cast"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="poster">URL do Poster</label>
                  <input
                    v-model="movie.poster"
                    type="url"
                    class="form-control"
                    id="poster"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="countries">Países</label>
                  <input
                    v-model="movie.countries"
                    type="text"
                    class="form-control"
                    id="countries"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="released">Data de Lançamento</label>
                  <input
                    v-model="movie.released"
                    type="date"
                    class="form-control"
                    id="released"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="directors">Diretores</label>
                  <input
                    v-model="movie.directors"
                    type="text"
                    class="form-control"
                    id="directors"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="writers">Escritores</label>
                  <input
                    v-model="movie.writers"
                    type="text"
                    class="form-control"
                    id="writers"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="awards">Prêmios</label>
                  <input
                    v-model="movie.awards.text"
                    type="text"
                    class="form-control"
                    id="awards"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="lastupdated">Última Atualização</label>
                  <input
                    v-model="movie.lastupdated"
                    type="date"
                    class="form-control"
                    id="lastupdated"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="year">Ano</label>
                  <input
                    v-model="movie.year"
                    type="number"
                    class="form-control"
                    id="year"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="imdb-rating">Nota IMDb</label>
                  <input
                    v-model="movie.imdb"
                    type="number"
                    class="form-control"
                    id="imdb-rating"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="imdb-votes">Quantidade de votos IMDb</label>
                  <input
                    v-model="movie.imdb.votes"
                    type="number"
                    class="form-control"
                    id="imdb-votes"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="type">Tipo</label>
                  <input
                    v-model="movie.type"
                    type="text"
                    class="form-control"
                    id="type"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="tomatoes-rating">Avaliação Rotten Tomatoes</label>
                  <input
                    v-model="movie.tomatoes.viewer"
                    type="number"
                    class="form-control"
                    id="tomatoes-rating"
                    required
                  />
                </div>

                <!-- Add more fields as needed -->

                <button type="submit" class="sbmtBtn">Salvar Filme</button>
              </form>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import MoviesService from "src/services/MoviesService.js";

export default {
  components: {
    Card,
  },

  data() {
    return {
      movie: {
        plot: "",
        genres: [],
        fullplot: "",
        runtime: 0,
        rated: "",
        cast: [],
        poster: "",
        title: "",
        countries: [],
        released: {},
        directors: [],
        writers: [],
        awards: {},
        lastupdated: "",
        year: 0,
        imdb: {},
        type: "",
        tomatoes: {},
      },
    };
  },

  methods: {
    createMovie() {
      MoviesService.createMovie(this.movie)
        .then(() => {
          console.log("Filme criado com sucesso.");
          this.$router.push({ name: "Movies List" });
        })
        .catch((error) => {
          console.error("Erro ao criar filme:", error);
        });
    },
  },
};
</script>

<style>
.movieCard {
  padding-bottom: 0px;
}
.card-body {
  padding: 20px;
}

.card-header {
  padding: 15px 15px 10px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}

.sbmtBtn {
  padding: 5px 20px;
  background-color: #525156;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  margin-block-start: 8px;
  font-weight: bold;
}

.sbmtBtn:hover {
  transform: scale(1.05);
  background-color: #464646;
}
</style>
