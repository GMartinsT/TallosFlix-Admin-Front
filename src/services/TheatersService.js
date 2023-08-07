import { ApiService } from "./api.js";

export default {
  async getAllTheaters(page = 1, perPage = 10) {
    try {
      const response = await ApiService.get("/theaters", {
        params: {
          page,
          perPage,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter a lista de cinemas.");
    }
  },

  async getTheaterById(id) {
    try {
      const response = await ApiService.get(`/theaters/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter detalhes do cinema.");
    }
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
      const response = await ApiService.put(`/theaters/${id}`, theaterData);
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
};
