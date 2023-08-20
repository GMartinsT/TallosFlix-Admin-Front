import { ApiService } from "./api.js";

export default {
  async getAllTheaters(page = 1) {
    return ApiService.get(`/theaters?page=${page}`);
  },

  async getTheaterById(id) {
    return ApiService.get(`/theaters/id/${id}`);
  },

  async createTheater(theaterData) {
    try {
      const response = await ApiService.post("/theaters", theaterData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar o cinema.");
    }
  },

  async updateTheater(id, theaterData) {
    try {
      const response = await ApiService.put(`/theaters/id/${id}`, theaterData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao atualizar o cinema.");
    }
  },

  async deleteTheater(id) {
    try {
      const response = await ApiService.delete(`/theaters/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao excluir o cinema.");
    }
  },

  getTheatersCount() {
    return ApiService.get('/theaters/count/alltheaters');
  },

  searchTheaters(page, searchType, searchQuery) {
    return ApiService.get(`/theaters/search?page=${page}&searchType=${searchType}&searchQuery=${searchQuery}`)
  },

  searchTheaterById(id) {
    return ApiService.get(`/theaters/searchId/${id}`);
  }
};
