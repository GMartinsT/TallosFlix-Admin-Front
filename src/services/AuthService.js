import { ApiService } from "./api.js";

// Endpoint para fazer login
const LOGIN_ENDPOINT = "login"; // Substitua pelo endpoint correto da sua API

// Função para autenticar o usuário e obter o token
export const login = async (email, password) => {
  try {
    const response = await ApiService.post(LOGIN_ENDPOINT, {
      email,
      password,
    });
    // Verifica se a resposta tem um token válido
    if (response.data && response.data.access_token) {
      const userId = response.data.session.user_id;
      const access_token = response.data.access_token;
      localStorage.setItem("userId", userId);
      localStorage.setItem("access_token", access_token);
    }
    return response.data;
  } catch (error) {
    // Trata erros de autenticação, como credenciais inválidas
    throw error;
  }
};

// Função para fazer logout do usuário
export const logout = () => {
  localStorage.removeItem("access_token");
};
