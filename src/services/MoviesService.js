import { ApiService } from "./api.js";

export default {
  getAllMovies(page) {
    return ApiService.get(`/movies?page=${page}`);
  },

  async getMovieById(id) {
    try {
      const response = await ApiService.get(`/movies/id/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter detalhes do filme.");
    }
  },

  async createMovie(movieData) {
    try {
      const response = await ApiService.post("/movies", movieData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar o filme.");
    }
  },

  async updateMovie(id, movieData) {
    try {
      const response = await ApiService.put(`/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao atualizar o filme.");
    }
  },

  async deleteMovie(id) {
    try {
      const response = await ApiService.delete(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao excluir o filme.");
    }
  },

  getMoviesCount() {
    return ApiService.get('/movies/count/allmovies');
  },

  searchMovies(page, searchType, searchQuery) {
    console.log(page, searchType, searchQuery)
    return ApiService.get(`/movies/search?page=${page}&searchType=${searchType}&searchQuery=${searchQuery}`)
  },

  async searchMovieById(searchQuery) {
    try {
      const response = await ApiService.get(`/movies/searchId/${searchQuery}`);
      console.log(response, 'SERVICEEE');
      return response.data.data;
    } catch (error) {
      throw new Error("Erro ao obter detalhes do filme.");
    }
  }
};
