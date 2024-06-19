import React, { useEffect, useState } from 'react';
import ApiClient from '../../apiClient';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [selectedSupplierServices, setSelectedSupplierServices] = useState(null);
  const [loadingServices, setLoadingServices] = useState(false);

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
    fetchSuppliers();
  }, [filters, pagination.offset]);

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

  //   const openModal = (supplier) => {
  //     setSelectedSupplier(supplier);
  //     setShowModal(true);
  //   };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  const openModal = async (supplier) => {
    const apiClient = new ApiClient();
    setSelectedSupplier(supplier);
    setLoadingServices(true);
  
    try {
      const response = await apiClient.getAllServicesBySupplierId(supplier._id);
      setSelectedSupplierServices(response.length ? response : 'Não existem serviços para esse fornecedor.');
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
    <div className="mt-20 container mx-auto">
      <h1 className="text-2xl font-bold mb-5">Fornecedores</h1>
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
        <button
          type="button"
          onClick={fetchSuppliers}
          className="mt-4 p-2 bg-blue-500 text-white rounded self-end"
        >
          Buscar
        </button>
      </form>
      <div>
        {suppliers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <div
                key={supplier._id}
                className="border rounded p-4 shadow cursor-pointer"
                onClick={() => openModal(supplier)}
              >
                <h2 className="text-xl font-bold">{supplier.name_company}</h2>
                <p>Distrito: {supplier.address}</p>
                <p>Código Postal: {supplier.postal_code}</p>
                <p>Clientes: {supplier.num_customers}</p>
                <p>
                  Selo de Popularidade:{' '}
                  {supplier.popularity_seal ? 'Sim' : 'Não'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-10">Nenhum fornecedor encontrado.</p>
        )}
      </div>

      {/* Modal de Detalhes do Fornecedor */}
      {showModal && selectedSupplier && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Detalhes do Fornecedor
                </h3>
                <div className="mt-2">
                  <p>Nome da Empresa: {selectedSupplier.name_company}</p>
                  <p>Distrito: {selectedSupplier.address}</p>
                  <p>Código Postal: {selectedSupplier.postal_code}</p>
                  <p>Clientes: {selectedSupplier.num_customers}</p>
                  <p>
                    Selo de Popularidade:{' '}
                    {selectedSupplier.popularity_seal ? 'Sim' : 'Não'}
                  </p>
                </div>
              </div>

              {loadingServices ? (
  <p className="text-center mt-10">Carregando serviços...</p>
) : selectedSupplierServices ? (
  Array.isArray(selectedSupplierServices) ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {selectedSupplierServices.map((service) => (
                    <div
                      key={service._id}
                      className="border rounded p-4 shadow cursor-pointer"
                    >
                      <div>
                        <strong>Description:</strong> {service?.description}
                      </div>
                      <div>
                        <strong>Price:</strong> {service?.price}
                      </div>
                      <div>
                        <strong>Customers:</strong> {service?.num_customers}
                      </div>
                      <div>
                        <strong>Availability:</strong>
                      </div>
                      <ul>
                        <li>
                          <strong>Dates:</strong>{' '}
                          {service?.availability?.dates.join(', ')}
                        </li>
                        <li>
                          <strong>Weekdays:</strong>{' '}
                          {service?.availability?.weekdays.join(', ')}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center mt-10">{selectedSupplierServices}</p>
              )
            ) : null}

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Fim do Modal */}

      <div className="flex justify-between mt-10">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={pagination.offset === 0}
          className="p-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => handlePageChange(1)}
          disabled={pagination.offset + pagination.limit >= pagination.total}
          className="p-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Suppliers;
