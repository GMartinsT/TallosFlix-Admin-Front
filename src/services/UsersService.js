import { ApiService } from "./api";

export default {
  
  findAll() {
    return ApiService.get("/users");
  },

  
  findUserById(userId) {
    return ApiService.get(`/users/${userId}`);
  },

  
  createUser(userData) {
    return ApiService.post("/users", userData);
  },

  
  updateUser(userId, userData) {
    return ApiService.patch(`/users/${userId}`, userData);
  },

  deleteUser(userId) {
    return ApiService.delete(`/users/${userId}`);
  },

  getUsersCount() {
    return ApiService.get('/users/count/allusers');
  },
};
