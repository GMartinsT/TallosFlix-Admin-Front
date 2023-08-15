<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="movieCard">
            <template slot="header">
              <h4 class="card-title">Detalhes do Filme</h4>
            </template>
            <div class="card-body">
              <edit-form :disabled="!isEditMode">
                <div class="form-group">
                  <label for="title">Título</label>
                  <input
                    v-model="movie.title"
                    :disabled="!isEditMode"
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
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="plot"
                    required
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="genres">Gêneros</label>
                  <input
                    v-model="movieGenres"
                    :disabled="!isEditMode"
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
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="runtime"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="cast">Elenco</label>
                  <input
                    v-model="movie.cast"
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="cast"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="comments">Quantidade de comentários</label>
                  <input
                    v-model="movie.num_mflix_comments"
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="comments"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="fullplot">FullPlot</label>
                  <textarea
                    v-model="movie.fullplot"
                    :disabled="!isEditMode"
                    class="form-control"
                    id="fullplot"
                    required
                  ></textarea>
                </div>

                <div class="form-group" v-if="movie.languages">
                  <label for="languages">Idiomas</label>
                  <input
                    v-model="movie.languages"
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="languages"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="countries">Países</label>
                  <textarea
                    v-model="movie.countries"
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="countries"
                    required
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="released">Data de Lançamento</label>
                  <input
                    v-model="movieReleased"
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="released"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="directors">Diretores</label>
                  <input
                    v-model="movie.directors"
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="directors"
                    required
                  />
                </div>

                <div class="form-group" v-if="movie.writers">
                  <label for="writers">Escritor</label>
                  <input
                    v-model="movie.writers"
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="writers"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="awardsnominations">Nomeações</label>
                  <input
                    v-model="movie.awards.nominations"
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="awardsnominations"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="awards">Premiações</label>
                  <input
                    v-model="movie.awards.wins"
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="awards"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="imdb">Nota IMDb</label>
                  <input
                    v-model="movie.imdb.rating"
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="imdb"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="imdbvotes">Quantidade de votos IMDb</label>
                  <input
                    v-model="movie.imdb.votes"
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="imdbvotes"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="year">Ano</label>
                  <input
                    v-model="movie.year"
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="year"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="type">Tipo</label>
                  <input
                    v-model="movie.type"
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="type"
                    required
                  />
                </div>

                <div class="form-group" v-if="movie.tomatoes">
                  <label for="tomatoes">Avalição Rotten Tomatoes</label>
                  <input
                    v-model="movie.tomatoes.viewer.rating"
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="tomatoes"
                    required
                  />
                </div>

                <div class="form-group" v-if="movie.tomatoes">
                  <label for="tomatoesreviews"
                    >Número de Reviews no Rotten Tomatoes</label
                  >
                  <input
                    v-model="movie.tomatoes.viewer.numReviews"
                    :disabled="!isEditMode"
                    type="number"
                    class="form-control"
                    id="tomatoesreviews"
                    required
                  />
                </div>

                <div class="form-group" v-if="movie.tomatoes">
                  <label for="tomatoeslastup"
                    >Última atualização no Rotten Tomatoes</label
                  >
                  <input
                    v-model="tomatoesLastUp"
                    :disabled="!isEditMode"
                    type="text"
                    class="form-control"
                    id="tomatoeslastup"
                    required
                  />
                </div>

                <button
                  v-if="!isEditMode"
                  @click="isEditMode = true"
                  class="editFormBtn"
                >
                  Editar Filme
                </button>
                <button v-else @click="saveMovie" class="sbmtBtn">
                  Salvar Edições
                </button>
              </edit-form>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import EditForm from "src/components/UpdateForm.vue";
import MoviesService from "src/services/MoviesService.js";

export default {
  components: {
    Card,
    EditForm,
  },

  data() {
    return {
      movieId: "",
      movie: {},
      isEditMode: false,
      movieGenres: "",
      movieReleased: "",
      tomatoesLastUp: "",
    };
  },
  created() {
    this.movieId = this.$route.params.id;
    this.getMovieDetails();
  },
  methods: {
    getMovieDetails() {
      MoviesService.getMovieById(this.movieId)
        .then((response) => {
          this.movie = response;
          this.movieGenres = this.movie.genres.join(", ");
          this.movieReleased = this.formatDate(this.movie.released);
          this.tomatoesLastUp = this.formatDate(
            this.movie.tomatoes.lastUpdated
          );
          console.log("Detalhes do filme:", this.movie);
        })
        .catch((error) => {
          console.error("Erro ao obter os detalhes do filme:", error);
        });
    },
    saveMovie() {
      MoviesService.updateMovie(this.movieId, this.movie)
        .then(() => {
          console.log("Filme atualizado com sucesso.");
          this.isEditMode = false;
        })
        .catch((error) => {
          console.error("Erro ao atualizar filme:", error);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style>
.movieCard {
  padding-bottom: 5px;
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
  background-color: #2e66df;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  margin-block-start: 8px;
  font-weight: bold;
}

.editFormBtn {
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
  background-color: #1a4fc0;
}

.editFormBtn:hover {
  transform: scale(1.05);
  background-color: #464646;
}
</style>
