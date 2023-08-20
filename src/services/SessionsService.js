import { ApiService } from "./api.js";

export default {
  getAllSessions(page = 1) {
    return ApiService.get(`/sessions?page=${page}`);
  },

  getSessionById(id) {
    return ApiService.get(`/sessions/id/${id}`);
  },

  searchSessions(page, searchType, searchQuery) {
    return ApiService.get(`/sessions/search?page=${page}&searchType=${searchType}&searchQuery=${searchQuery}`)
  },

  removeSession(token) {
    return ApiService.delete(`/sessions/${token}`)
  }
};
