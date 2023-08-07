import { ApiService } from "./api.js";

export default {
  async getAllComments(page = 1, perPage = 10) {
    try {
      const response = await ApiService.get("/comments", {
        params: {
          page,
          perPage,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao obter a lista de comentários.");
    }
  },

  async getCommentById(id) {
    try {
      const response = await ApiService.get(`/comments/${id}`);
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
};
