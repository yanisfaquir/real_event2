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
    return this.apiClient
      .patch(`/user/updateUser/${id}`, userData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
      });
  }

  // Método para atualizar um fornecedor
  updateSupplier(id, supplierData) {
    return this.apiClient
      .patch(`/supplier/updateSupplier/${id}`, supplierData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar fornecedor:', error);
        throw error;
      });
  }

  // Método para substituir um usuário
  replaceUser(id, userData) {
    return this.apiClient
      .put(`/user/replaceUser/${id}`, userData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao substituir usuário:', error);
        throw error;
      });
  }

  // Método para substituir um fornecedor
  replaceSupplier(id, supplierData) {
    return this.apiClient
      .put(`/supplier/replaceSupplier/${id}`, supplierData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao substituir fornecedor:', error);
        throw error;
      });
  }

  // Método para deletar um usuário
  deleteUser(id) {
    return this.apiClient
      .delete(`/user/delete/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao deletar usuário:', error);
        throw error;
      });
  }

  // Método para deletar um fornecedor
  deleteSupplier(id) {
    return this.apiClient
      .delete(`/supplier/delete/${id}`)
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
    return this.apiClient
      .get('/allSuppliers', {
        params: queryParams,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar todos os fornecedores:', error);
        throw error;
      });
  }

  // Método para buscar todos os serviços
  getAllServices() {
    return this.apiClient
      .get('/service/getAll')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar todos os serviços:', error);
        throw error;
      });
  }

  // Método para buscar um serviço pelo ID
  getServiceById(id) {
    return this.apiClient
      .get(`/service/getService/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar serviço:', error);
        throw error;
      });
  }

  // Método para criar um novo serviço
  createService(serviceData) {
    return this.apiClient
      .post('/service/create', serviceData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao criar serviço:', error);
        throw error;
      });
  }

  // Método para atualizar um serviço
  updateService(id, serviceData) {
    return this.apiClient
      .patch(`/service/update/${id}`, serviceData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar serviço:', error);
        throw error;
      });
  }

  // Método para deletar um serviço
  deleteService(id) {
    return this.apiClient
      .delete(`/service/delete/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao deletar serviço:', error);
        throw error;
      });
  }

  // Método para buscar todos os eventos
  getAllEvents() {
    return this.apiClient
      .get('/event/getAll')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar todos os eventos:', error);
        throw error;
      });
  }

  // Método para buscar um evento pelo ID
  getEventById(id) {
    return this.apiClient
      .get(`/event/getEvent/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar evento:', error);
        throw error;
      });
  }

  // Método para criar um novo evento
  createEvent(eventData) {
    return this.apiClient
      .post('/event/create', eventData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao criar evento:', error);
        throw error;
      });
  }

  // Método para atualizar um evento
  updateEvent(id, eventData) {
    return this.apiClient
      .patch(`/event/update/${id}`, eventData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar evento:', error);
        throw error;
      });
  }

  // Método para deletar um evento
  deleteEvent(id) {
    return this.apiClient
      .delete(`/event/delete/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao deletar evento:', error);
        throw error;
      });
  }

  // Métodos para ShoppingCart
  // Método para buscar um carrinho pelo ID
  getShoppingCartById(id) {
    return this.apiClient
      .get(`/shoppingCart/getShoppingCart/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar carrinho:', error);
        throw error;
      });
  }

  // Método para buscar todos os carrinhos
  getAllShoppingCarts() {
    return this.apiClient
      .get('/shoppingCart/getAllShoppingCarts')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar todos os carrinhos:', error);
        throw error;
      });
  }

  // Método para criar um novo carrinho
  createShoppingCart(cartData) {
    return this.apiClient
      .post('/shoppingCart/createShoppingCart', cartData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao criar carrinho:', error);
        throw error;
      });
  }

  // Método para atualizar parcialmente um carrinho
  patchShoppingCart(id, cartData) {
    return this.apiClient
      .patch(`/shoppingCart/patchShoppingCart/${id}`, cartData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar parcialmente o carrinho:', error);
        throw error;
      });
  }

  // Método para substituir um carrinho
  putShoppingCart(id, cartData) {
    return this.apiClient
      .put(`/shoppingCart/putShoppingCart/${id}`, cartData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao substituir carrinho:', error);
        throw error;
      });
  }

  // Método para deletar um carrinho
  deleteShoppingCart(id) {
    return this.apiClient
      .delete(`/shoppingCart/deleteShoppingCart/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao deletar carrinho:', error);
        throw error;
      });
  }

  // Método para criar uma nova estrela
  createStar(starData) {
    return this.apiClient
      .post('/star', starData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao criar estrela:', error);
        throw error;
      });
  }

  // Método para buscar todas as estrelas de um fornecedor
  getStarsBySupplierId(supplierId) {
    return this.apiClient
      .get(`/star/${supplierId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar estrelas:', error);
        throw error;
      });
  }

  // Método para atualizar uma estrela
  updateStar(starId, starData) {
    return this.apiClient
      .patch(`/star/${starId}`, starData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar estrela:', error);
        throw error;
      });
  }

  // Método para deletar uma estrela
  deleteStar(starId) {
    return this.apiClient
      .delete(`/star/${starId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao deletar estrela:', error);
        throw error;
      });
  }

  // Método para calcular a média das estrelas de um fornecedor
  getAverageStarsBySupplierId(supplierId) {
    return this.apiClient
      .get(`/star/average/${supplierId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao calcular média das estrelas:', error);
        throw error;
      });
  }

  // Métodos para ShoppingCart (adapte os nomes dos métodos conforme necessário)
  // Método para buscar um carrinho pelo ID
  getShoppingCartById(id) {
    return this.apiClient
      .get(`/shoppingCart/getShoppingCart/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar carrinho:', error);
        throw error;
      });
  }

  // Método para buscar todos os carrinhos
  getAllShoppingCarts() {
    return this.apiClient
      .get('/shoppingCart/getAllShoppingCarts')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar todos os carrinhos:', error);
        throw error;
      });
  }

  // Método para criar um novo carrinho
  createShoppingCart(cartData) {
    return this.apiClient
      .post('/shoppingCart/createShoppingCart', cartData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao criar carrinho:', error);
        throw error;
      });
  }

  // Método para atualizar parcialmente um carrinho
  patchShoppingCart(id, cartData) {
    return this.apiClient
      .patch(`/shoppingCart/patchShoppingCart/${id}`, cartData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao atualizar parcialmente o carrinho:', error);
        throw error;
      });
  }

  // Método para substituir um carrinho
  putShoppingCart(id, cartData) {
    return this.apiClient
      .put(`/shoppingCart/putShoppingCart/${id}`, cartData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao substituir carrinho:', error);
        throw error;
      });
  }

  // Método para deletar um carrinho
  deleteShoppingCart(id) {
    return this.apiClient
      .delete(`/shoppingCart/deleteShoppingCart/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao deletar carrinho:', error);
        throw error;
      });
  }

}





export default new ApiClient();

