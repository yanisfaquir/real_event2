import axios from 'axios';
import Dialog from '@/components/Dialog';
import ReactDOM from 'react-dom';

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

function showResponseDialog(title, text, type) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(div);
  };

  const root = ReactDOM.createRoot(div);
  root.render(
    <Dialog
      isOpen={true}
      onClose={handleClose}
      title={title}
      text={text}
      type={type}
      buttonText="Fechar"
    />
  );
}

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
      .then((response) => {
        console.log(response);
        showResponseDialog(
          'Registro Concluído',
          'Usuário registrado com sucesso!',
          'success'
        );
        return response.data;
      })
      .catch((error) => {
        showResponseDialog(
          error.response.data.message,
          error.response.data.data,
          'error'
        );
      });
  }

  // Método para registrar um novo fornecedor
  registerSupplier(supplierData) {
    return this.apiClient
      .post('/supplier/register', supplierData)
      .then((response) => {
        console.log(response);
        showResponseDialog(
          'Registo Concluído',
          'Fornecedor criado com sucesso!',
          'success'
        );
        return response.data;
      })
      .catch((error) => {
        console.error('Erro ao criar fornecedor:', error);
        showResponseDialog(
          error.response.data.message,
          error.response.data.data,
          'error'
        );
      });
  }

  // Função para buscar um usuário pelo ID
  getUserById(id) {
    return this.apiClient
      .get(`/user/profile/${id}`)
      .then((response) => response)
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

  updateUser(id, userData) {
    const accessToken = getCookie('accessToken');

    return this.apiClient
      .patch(`/user/updateUser/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        showResponseDialog(
          'Atualização Concluída',
          'Utilizador atualizado com sucesso!',
          'success'
        );
        return response.data;
      })
      .catch((error) => {
        console.error('Erro ao atualizar utilizador:', error);
        showResponseDialog(
          error.response.data.message,
          error.response.data.data,
          'error'
        );
      });
  }

  // Método para atualizar um fornecedor
  updateSupplier(id, supplierData) {
    return this.apiClient
      .patch(`/supplier/updateSupplier/${id}`, supplierData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        showResponseDialog(
          'Atualização Concluída',
          'Fornecedor atualizado com sucesso!',
          'success'
        );
        return response.data;
      })
      .catch((error) => {
        console.error('Erro ao atualizar fornecedor:', error);
        showResponseDialog(
          error.response.data.message,
          error.response.data.data,
          'error'
        );
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
      .get('/supplier/allSuppliers', {
        params: queryParams,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar todos os fornecedores:', error);
        throw error;
      });
  }

  // Método para buscar todos os serviços
  getAllServices(queryParams) {
    return this.apiClient
      .get('/service/allServices', {
        params: queryParams,
      })
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

  getAllServicesBySupplierId(supplierId) {
    return this.apiClient
      .get(`/service/service/supplier/${supplierId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro ao buscar serviços do supplier:', error);
        throw error;
      });
  }
}
