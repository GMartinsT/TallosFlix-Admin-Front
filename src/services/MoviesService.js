import { ApiService } from "./api.js";

export default {
  // Método para listar todos os filmes com paginação
  async getAllMovies(page = 1, perPage = 10) {
    try {
      const response = await ApiService.get("/movies", {
        params: {
          page,
          perPage,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter a lista de filmes.");
    }
  },

  // Método para obter um filme específico pelo ID
  async getMovieById(id) {
    try {
      const response = await ApiService.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter detalhes do filme.");
    }
  },

  // Método para criar um novo filme
  async createMovie(movieData) {
    try {
      const response = await ApiService.post("/movies", movieData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar o filme.");
    }
  },

  // Método para atualizar um filme existente
  async updateMovie(id, movieData) {
    try {
      const response = await ApiService.put(`/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao atualizar o filme.");
    }
  },

  // Método para excluir um filme pelo ID
  async deleteMovie(id) {
    try {
      const response = await ApiService.delete(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao excluir o filme.");
    }
  },
};
