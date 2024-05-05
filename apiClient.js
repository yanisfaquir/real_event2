import axios from 'axios';

const API_URL = 'http://localhost:3500/'; // Substitua pelo URL correto do seu backend

// Função para obter o token do armazenamento local ou de outra fonte
function getToken() {
  return localStorage.getItem('token');
}

// Função para autenticar o usuário e obter o token
async function authenticateUser(username, password) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });
    localStorage.setItem('token', response.data.token); // Armazena o token no armazenamento local
    return response.data.token; // Retorna o token para ser usado em outras requisições
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    throw error;
  }
}

// Configuração do Axios com interceptor para adicionar o Bearer Token
axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Método para autenticar o usuário e obter o token
  async authenticate(username, password) {
    const token = await authenticateUser(username, password);
    return token;
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

export default new ApiClient();
