import { ApiService } from "./api.js";

export default {
  async getAllSessions(page = 1, perPage = 10) {
    try {
      const response = await ApiService.get("/sessions", {
        params: {
          page,
          perPage,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter a lista de sessões.");
    }
  },
};
