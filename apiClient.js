import axios from 'axios';

const API_URL = 'http://localhost:3500'; // Substitua pelo URL correto do seu backend

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  console.log(value);
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// Função para autenticar o usuário e obter o token
async function authenticateUser(email, password, role) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
      role,
    });
    setCookie('refreshToken', response.data.data.refreshToken, 30);
    setCookie('accessToken', response.data.data.user.accessToken, 1 / 24);
    return response.data;
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    throw error;
  }
}

// // Configuração do Axios com interceptor para adicionar o Bearer Token
// axios.interceptors.request.use(
//   function (config) {
//     const token = getCookie('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// Interceptor de resposta para lidar com erros 401 e tentar atualizar o token
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokenData = await refreshAccessToken();
      if (tokenData) {
        originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Método para iniciar o processo de autenticação com Google
  initiateGoogleAuth() {
    return this.apiClient.get('/api/auth/google');
  }

  // Método para lidar com o retorno do Google após o usuário conceder permissão
  handleGoogleCallback(code) {
    return this.apiClient.get(`/api/auth/google/callback?code=${code}`);
  }

  // Método para autenticar o usuário e obter os dados do usuário
  async authenticate(email, password, role) {
    const userData = await authenticateUser(email, password, role);
    return userData;
  }

  // Função para atualizar o token de acesso
  async refreshAccessToken() {
    try {
      const refreshToken = getCookie('refreshToken');

      if (!refreshToken) {
        console.error('Refresh token não encontrado');
        removeCookie('accessToken');
        return null;
      }
      const response = await this.apiClient.post(
        `${API_URL}/api/auth/refresh/info`,
        {
          refreshToken,
        }
      );
      setCookie('accessToken', response.data.data.accessToken, 1 / 24);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar o token de acesso:', error);
      removeCookie('accessToken');
      throw error;
    }
  }

  // Função para registrar um novo usuário
  registerUser(userData) {
    return this.apiClient
      .post('/user/register', userData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao registrar usuário:', error);
        throw error;
      });
  }

  // Método para registrar um novo fornecedor
  registerSupplier(supplierData) {
    return this.apiClient
      .post('/supplier/register', supplierData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao registrar fornecedor:', error);
        throw error;
      });
  }

  // Função para buscar um usuário pelo ID
  getUserById(id) {
    return this.apiClient
      .get(`/user/profile/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar usuário:', error);
        throw error;
      });
  }

  // Método para buscar um fornecedor pelo ID
  getSupplierById(id) {
    return this.apiClient
      .get(`/supplier/profile/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar fornecedor:', error);
        throw error;
      });
  }

  // Método para atualizar um usuário
  updateUser(id, userData) {
    const token = getToken(); // Supondo que getToken() retorna o token atual
    return this.apiClient
      .patch(`/user/updateUser/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
      });
  }

  updateSupplier(id, supplierData) {
    const token = getToken(); // Supondo que getToken() retorna o token atual
    return this.apiClient
      .patch(`/supplier/updateSupplier/${id}`, supplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar fornecedor:', error);
        throw error;
      });
  }

  // Método para substituir um usuário
  replaceUser(id, userData) {
    const token = getToken(); // Supondo que getToken() retorna o token atual
    return this.apiClient
      .put(`/user/replaceUser/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao substituir usuário:', error);
        throw error;
      });
  }

  replaceSupplier(id, supplierData) {
    const token = getToken(); // Supondo que getToken() retorna o token atual
    return this.apiClient
      .put(`/supplier/replaceSupplier/${id}`, supplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao substituir fornecedor:', error);
        throw error;
      });
  }

  // Método para deletar um usuário
  deleteUser(id) {
    const token = getToken(); // Supondo que getToken() retorna o token atual
    return this.apiClient
      .delete(`/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao deletar usuário:', error);
        throw error;
      });
  }

  deleteSupplier(id) {
    const token = getToken(); // Supondo que getToken() retorna o token atual
    return this.apiClient
      .delete(`/supplier/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao deletar fornecedor:', error);
        throw error;
      });
  }

  // Função para buscar todos os usuários
  getAllUsers() {
    return this.apiClient
      .get('/user/allUsers')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar todos os usuários:', error);
        throw error;
      });
  }
  // Método para buscar todos os fornecedores com paginação e filtros
  getAllSuppliers(queryParams) {
    const token = getToken(); // Supondo que getToken() retorna o token atual
    return this.apiClient
      .get('/allSuppliers', {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar todos os fornecedores:', error);
        throw error;
      });
  }
}
