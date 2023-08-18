import { ApiService } from "./api.js";

export default {
  async getAllComments(page = 1) {
    return ApiService.get(`/comments?page=${page}`);
  },

  async getCommentById(id) {
    try {
      const response = await ApiService.get(`/comments/id/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter detalhes do comentário.");
    }
  },

  async createComment(commentData) {
    try {
      const response = await ApiService.post("/comments", commentData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar o comentário.");
    }
  },

  async updateComment(id, commentData) {
    try {
      const response = await ApiService.put(`/comments/${id}`, commentData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao atualizar o comentário.");
    }
  },

  async deleteComment(id) {
    try {
      const response = await ApiService.delete(`/comments/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao excluir o comentário.");
    }
  },

  getCommentsCount() {
    return ApiService.get('/comments/count/allcomments');
  },

  searchComments(page, searchType, searchQuery) {
    return ApiService.get(`/comments/search?page=${page}&searchType=${searchType}&searchQuery=${searchQuery}`)
  },

  async searchCommentById(searchQuery) {
    try {
      const response = await ApiService.get(`/comments/searchId/${searchQuery}`);
      console.log(response, 'SERVICEEE');
      return response.data.data;
    } catch (error) {
      throw new Error("Erro ao obter detalhes do comentário.");
    }
  }
};
