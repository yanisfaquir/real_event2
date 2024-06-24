import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ApiClient from '../../apiClient';
import { AccessibilityContext } from '@/contexts/acessibility';
import GlobalButton from '@/components/globalButton';
import { Tooltip } from 'react-tooltip';

const Suppliers = () => {
  const { alignment, highContrast } = useContext(AccessibilityContext);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name_company: '',
    postal_code: '',
    address: '',
    min_stars: '',
    max_stars: '',
    popularity_seal: '',
  });
  const [pagination, setPagination] = useState({
    total: 0,
    offset: 0,
    limit: 20,
  });
  const [selectedSupplierServices, setSelectedSupplierServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Estado para controlar se o modal está visível e o fornecedor selecionado
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const apiClient = new ApiClient();
      const response = await apiClient.getAllSuppliers({
        ...filters,
        offset: pagination.offset,
      });
      console.log('Dados dos fornecedores:', response);
      if (response && Array.isArray(response.suppliers)) {
        setSuppliers(response.suppliers);
        setPagination((prev) => ({ ...prev, total: response.total }));
      } else {
        setError('A resposta da API não é um array.');
      }
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      setError('Erro ao buscar fornecedores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showResults) {
      fetchSuppliers();
    }
  }, [showResults, filters, pagination.offset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = (direction) => {
    setPagination((prev) => ({
      ...prev,
      offset: Math.max(0, prev.offset + direction * prev.limit),
    }));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = async (supplier) => {
    const apiClient = new ApiClient();
    setSelectedSupplier(supplier);
    setLoadingServices(true);
  
    try {
      const response = await apiClient.getAllServicesBySupplierId(supplier._id);
      setSelectedSupplierServices(response);
    } catch (error) {
      console.error('Erro ao carregar serviços do supplier:', error);
      setSelectedSupplierServices('Não existem serviços para esse fornecedor.');
    } finally {
      setLoadingServices(false);
      setShowModal(true);
    }
  };

  const districtLocations = {
    Aveiro: 'Aveiro',
    Beja: 'Beja',
    Braga: 'Braga',
    Bragança: 'Bragança',
    'Castelo Branco': 'Castelo Branco',
    Coimbra: 'Coimbra',
    Estarreja: 'Estarreja',
    Faro: 'Faro',
    Guarda: 'Guarda',
    Leiria: 'Leiria',
    Lisboa: 'Lisboa',
    Porto: 'Porto',
    'São João da Madeira': 'São João da Madeira',
    'São Roque': 'São Roque',
    Setubal: 'Setúbal',
    'Viana do Castelo': 'Viana do Castelo',
    'Vila Real': 'Vila Real',
    Viseu: 'Viseu',
  };

  return (
    <div className="mt-20 container mx-auto px-4">
      <div className="relative mb-16">
        <Tooltip
          anchorSelect="#chevron-left-home-1"
          place="right"
          style={{ fontSize: '1.2em' }}
        >
          Voltar à Página Inicial
        </Tooltip>
        <Link
          href="/"
          style={{
            cursor: 'pointer',
            zIndex: '9',
            position: 'absolute',
            left: '1%',
            top: '1.2rem',
          }}
        >
          <Image
            src={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/chevron-left-green.svg`}
            id="chevron-left-home-1"
            alt="chevron-left"
            width={80}
            height={80}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
      </div>
      <section className="mb-10">
        <p
          className={`flex flex-col pt-20 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}
          style={{
            textAlign: alignment ? alignment : 'start',
            color: highContrast ? 'white' : 'unset'
          }}
          
        >
          Fornecedores
        </p>
        <p
          className={`relative max-w-[90vw] px-5 mb-4 text-[1.2rem]`}
          style={{ textAlign: `${alignment ? alignment : 'start'}` }}
        >
          Pode fazer a pesquisa de fornecedores de acordo com os filtros abaixo.
        </p>
      </section>
      <form className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="mb-1">Nome da Empresa:</label>
          <input
            type="text"
            name="name_company"
            value={filters.name_company}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Código Postal:</label>
          <input
            type="text"
            name="postal_code"
            value={filters.postal_code}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Distrito:</label>
          <select
            name="address"
            value={filters.address}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Todos</option>
            {Object.entries(districtLocations).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Min Estrelas:</label>
          <input
            type="number"
            name="min_stars"
            value={filters.min_stars}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Max Estrelas:</label>
          <input
            type="number"
            name="max_stars"
            value={filters.max_stars}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Selo de Popularidade:</label>
          <select
            name="popularity_seal"
            value={filters.popularity_seal}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Todos</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
      </form>

      {!showResults && (
        <div className="flex items-center justify-center mb-5">
          <GlobalButton
            size="medium"
            type="primary"
            onClick={() => setShowResults(true)}
            text="Pesquisar"
          />
        </div>
      )}

      {loading ? (
        <div className="text-center mt-10">Carregando...</div>
      ) : error ? (
        <div className="text-center mt-10 text-red-500">{error}</div>
      ) : showResults && (
        
        <div>
        <p
          className={`flex flex-col pt-20 px-5 text-[3rem] font-bold text-middle-home items-right justify-right text-gray-900`}

          style={{ textAlign: `${alignment ? alignment : 'start'}` }}
        >
          Resultados
        </p>
          {suppliers.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suppliers.map((supplier) => (
                  <div
                    key={supplier._id}
                    className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300"
                  >
                    <h2 className="text-xl font-bold">{supplier.name_company}</h2>
                    <p>Endereço: {supplier.address}</p>
                    <p>Código Postal: {supplier.postal_code}</p>
                    <p>Estrelas: {supplier.stars}</p>
                    <p>Selo de Popularidade: {supplier.popularity_seal ? 'Sim' : 'Não'}</p>
                    <button
                      className="mt-2 text-blue-500 underline"
                      onClick={() => openModal(supplier)}
                    >
                      Ver Serviços
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  className={`px-4 py-2 border rounded ${pagination.offset === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
                    }`}
                  onClick={() => handlePageChange(-1)}
                  disabled={pagination.offset === 0}
                >
                  Anterior
                </button>
                <button
                  className={`px-4 py-2 border rounded ${pagination.offset + pagination.limit >= pagination.total ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
                    }`}
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.offset + pagination.limit >= pagination.total}
                >
                  Próxima
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-10">Nenhum fornecedor encontrado.</div>
          )}
        </div>
      )}

      {/* Modal de Serviços */}
      {showModal && selectedSupplier && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Serviços de {selectedSupplier.name_company}</h2>
            {loadingServices ? (
              <p>Carregando serviços...</p>
            ) : (
              <ul>
                {Array.isArray(selectedSupplierServices) ? (
                  selectedSupplierServices.map((service, index) => (
                    <li key={index} className={`my-4`}>
                      <p>{service.title}</p>
                      <p>{service.description}</p>
                      <p>{service.price}</p>
                    </li>
                  ))
                ) : (
                  <p>{selectedSupplierServices}</p>
                  
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
