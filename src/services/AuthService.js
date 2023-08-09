import { ApiService } from "./api.js";

const LOGIN_ENDPOINT = "login"; 

export const login = async (email, password) => {
  try {
    const response = await ApiService.post(LOGIN_ENDPOINT, {
      email,
      password,
    });
    if (response.data && response.data.access_token) {
      const userId = response.data.session.user_id;
      const access_token = response.data.access_token;
      localStorage.setItem("userId", userId);
      localStorage.setItem("access_token", access_token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
};
