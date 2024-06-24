import React, { useEffect } from 'react';
import { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../apiClient';
import { useRouter } from 'next/router';

const UseServiceResults = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedService = useSelector((state) => state.serviceResult.selectedService);
  const supplierId = useSelector((state) => state.serviceResult.supplierId);
  const title = useSelector((state) => state.serviceResult.title);
  const description = useSelector((state) => state.serviceResult.description);
  const price = useSelector((state) => state.serviceResult.price);
  const address = useSelector((state) => state.serviceResult.address);
  const num_customers = useSelector((state) => state.serviceResult.num_customers);
  const photo = useSelector((state) => state.serviceResult.photo);
  const status = useSelector((state) => state.serviceResult.status);

  const [openPreco, setOpenPreco] = useState(false);
  const [selectedPreco, setSelectedPreco] = useState('');

  const user = useSelector((state) => state.user.user);

  // const [filtroPreco, setFiltroPreco] = useState('');
  // const [filtroTipoEspaco, setFiltroTipoEspaco] = useState('');

  //const serviceType = useSelector((state) => state.event.serviceType);
  const servico = ['catering', 'local', 'bar'];
  const nPessoas = ['15 - 30', '30 - 45', '45 - 60', '+60'];
  const tipoEspaco = [
    'Todos',
    'Quinta',
    'Hotel',
    'Restaurante',
    'Praia',
    'Campo',
  ];
  const preco = ['Todos', '200$', '400$', '600$', '800$', '1000$'];

  //const UseServiceResults = () => {
  const [filtroPreco, setFiltroPreco] = useState('');
  const [filtroTipoEspaco, setFiltroTipoEspaco] = useState('');
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const serviceType = useSelector((state) => state.event.serviceType);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchServices();
  }, [serviceType]);

  const fetchServices = async (service) => {
    setActiveTab(service);
    const apiClient = new ApiClient();
    setLoading(true);
    try {
      const queryParams = {
        type: service,
      };
      const response = await apiClient.getAllServices(queryParams);
      setServicos(response.services || []);
    } catch (error) {
      setError('Erro ao buscar serviços.');
      console.error('Erro ao buscar serviços:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemData) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.serviceId === itemData.id
    );
    if (existingItemIndex !== -1) {
      alert('Item já adicionado ao carrinho.');
      return;
    }

    console.log(itemData)

    const newItem = {
      userId: user._id,
      items: [
        {
          serviceId: itemData._id,
          quantity: 1,
          price: itemData.price,
          description: itemData.description,
          supplierId: itemData.supplierId,
          supplierName: itemData.title,
        },
      ],
      totalPrice: itemData.price,
      discounts: 0,
      points: 0,
    };

    setCartItems([...cartItems, newItem]);
    const apiClient = new ApiClient();

    try {
      const response = await apiClient.createShoppingCart(newItem);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao adicionar ao carrinho');
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const [activeTab, setActiveTab] = useState(serviceType[0]);

  return (
    <div className="mt-20 container mx-auto px-4">
      <div
        style={{
          marginTop: '7rem',
          marginBottom: '2rem',
          marginLeft: '5rem',
          marginRight: '5rem',
        }}
      >
        <ul className="flex flex-wrap justify-end text-sm font-medium text-center border-b dark:border-customBlue dark:text-black-400">
          {serviceType.map((servicoItem, index) => (
            <li key={index} className="me-2 " >
              <a
                href="#"
                className={`inline-block p-4 rounded-t-lg ${
                  servicoItem === activeTab
                    ? 'text-white bg-gray-100 active dark:bg-customBlue dark:text-white'
                    : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                }`}
                onClick={() => fetchServices(servicoItem)}
              >
                {servicoItem}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {activeTab === 'Catering' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicos.length > 0 ? (
            servicos.map((serv, index) => (
              <div
                key={index}
                className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white cursor-pointer"
              >
                <Image
                  src={serv.photos[0]}
                  alt={serv.title}
                  className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg"
                  width={80}
                  height={80}
                  style={{ filter: 'grayscale(100%)' }}
                />
                <p className="py-2 font-medium">{serv.title}</p>
                <p className="py-2 text-sm">{serv.address}</p>
                <div className="flex items-center justify-start">
                  <CiStar className="mr-4" />
                  <p className="text-sm mr-4">{serv.description}</p>
                </div>
                <div className="flex items-center justify-start">
                  <button className="w-auto h-auto justify-start rounded-full text-xs my-1 mx-0 px-1 py-1 border-2 border-gray">
                    Start Trial
                  </button>
                </div>
                <p className="border-b mx-2 mt-2"></p>
                <div className="flex items-center justify-start mt-6 space-x-10">
                  <p className="font-medium">{serv.price}</p>
                  <GlobalButton
                    size="small"
                    type="primary"
                    text="Adicionar ao Carrinho"
                    onClick={() => addToCart(serv)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4">
              <p>Não há serviços disponíveis para esse tipo.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UseServiceResults;
