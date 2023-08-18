import { ApiService } from "./api";

export default {
  
  findAll(page) {
    return ApiService.get(`/users?page=${page}`);
  },

  
  findUserById(userId) {
    return ApiService.get(`/users/id/${userId}`);
  },

  
  createUser(userData) {
    return ApiService.post("/users", userData);
  },

  
  updateUser(userId, userData) {
    return ApiService.patch(`/users/${userId}`, userData);
  },

  deleteUser(userId) {
    return ApiService.delete(`/users/id/${userId}`);
  },

  getUsersCount() {
    return ApiService.get('/users/count/allusers');
  },

  findUserByEmail(email) {
    return ApiService.get(`/users/email/${email}`);
  },
  
  searchUsers(page, searchType, searchQuery) {
    return ApiService.get(`/users/search?page=${page}&searchType=${searchType}&searchQuery=${searchQuery}`)
  }
};
