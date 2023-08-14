import { ApiService } from "./api.js";

export default {
  async getAllSessions(page = 1) {
    return ApiService.get(`/sessions?page=${page}`);
  },

  async getSessionById(id) {
    return ApiService.get(`/sessions/${id}`);
  },
};
