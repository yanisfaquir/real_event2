import React, { useState, useEffect } from 'react';
import ApiClient from '../../apiClient';
import { AccessibilityContext } from '@/contexts/acessibility';
import { useContext } from 'react';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';

const ServicesPage = () => {
  const { alignment, highContrast } = useContext(AccessibilityContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minCustomers: '',
    maxCustomers: '',
    availableDates: '',
    availableWeekdays: '',
    type: '', // New filter for service type
  });
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    perPage: 20,
  });
  const [showResults, setShowResults] = useState(false); // State to control showing results

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const apiClient = new ApiClient();
      const queryParams = {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minCustomers: filters.minCustomers,
        maxCustomers: filters.maxCustomers,
        availableDates: filters.availableDates,
        availableWeekdays: filters.availableWeekdays,
        type: filters.type, // Pass type filter to API request
        page: pagination.currentPage,
        limit: pagination.perPage,
      };
      try {
        const response = await apiClient.getAllServices(queryParams);
        setServices(response.services);
        setPagination({ ...pagination, total: response.total });
      } catch (error) {
        console.error('Erro ao buscar todos os serviços:', error);
        setError('Não foi possível carregar os serviços.');
      } finally {
        setLoading(false);
        setShowResults(true); // Show results after fetching
      }
    };

    if (showResults) {
      fetchServices();
    }
  }, [filters, pagination.currentPage, showResults]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, currentPage: newPage });
  };

  const handleSearch = () => {
    setShowResults(true); // Show results when search button is clicked
  };

  return (
    <div className="services-container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <section className="mb-10">
        <p className={`flex flex-col pt-25 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}

style={{
  textAlign: alignment ? alignment : 'start',
  color: highContrast ? 'white' : 'unset'
}}


        >
          Serviços
        </p>
        <p
          className={`relative max-w-[90vw] px-5 mb-4 text-[1.2rem]`}
          style={{ textAlign: `${alignment ? alignment : 'start'}` }}
        >
          Pode fazer a pesquisa de serviços de acordo com os filtros abaixo.
        </p>
      </section>
      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="mb-1">Preço Mínimo:</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Preço Máximo:</label>
          <select
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Qualquer valor</option>
            <option value="1000">Até R$ 1.000</option>
            <option value="2000">Até R$ 2.000</option>
            <option value="5000">Até R$ 5.000</option>
            <option value="10000">Até R$ 10.000</option>
            <option value="greater">Maior que</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Clientes Mínimos:</label>
          <input
            type="number"
            name="minCustomers"
            value={filters.minCustomers}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Clientes Máximos:</label>
          <select
            name="maxCustomers"
            value={filters.maxCustomers}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Qualquer quantidade</option>
            <option value="10">Até 10 clientes</option>
            <option value="20">Até 20 clientes</option>
            <option value="50">Até 50 clientes</option>
            <option value="100">Até 100 clientes</option>
            <option value="greater">Mais que</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Datas Disponíveis:</label>
          <input
            type="text"
            name="availableDates"
            value={filters.availableDates}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Dias da Semana Disponíveis:</label>
          <input
            type="text"
            name="availableWeekdays"
            value={filters.availableWeekdays}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Tipo de Serviço:</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Todos os tipos</option>
            <option value="Catering">Catering</option>
            <option value="Merchandising">Merchandising</option>
            <option value="Espaço">Espaço</option>
            <option value="DJ">DJ</option>
          </select>
        </div>
      </div>

      {/* Botão de Pesquisa */}
      {!showResults && (
        <div className="flex justify-center mb-4">
          {/* <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Pesquisar
          </button> */}
                 
          <GlobalButton
            size="medium"
            type="primary"
            onClick={handleSearch}
            text="Pesquisar"
          />
    
        </div>
      )}

      {/* Lista de Serviços */}
      {showResults && services.length > 0 ? (
        <>
          <p
             className={`flex flex-col pt-25 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}

            style={{ textAlign: `${alignment ? alignment : 'start'}` }}
          >
            Resultados
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service._id} className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white">
                <h2 className="text-xl font-bold mb-2">{service.description}</h2>
                <p className="mb-2"><strong>Preço:</strong> {service.price}</p>
                <p className="mb-2"><strong>Número de clientes:</strong> {service.num_customers}</p>
                <div className="mb-2">
                  <strong>Disponibilidade:</strong>
                  <ul className="list-disc ml-4">
                    <li><strong>Datas:</strong> {service.availability.dates.join(', ')}</li>
                    <li><strong>Dias da semana:</strong> {service.availability.weekdays.join(', ')}</li>
                    <li><strong>Horário de início:</strong> {service.availability.start_time}</li>
                  </ul>
                </div>
                <div className="mb-2">
                  <strong>Fotos:</strong>
                  <div className="grid grid-cols-3 gap-1 mt-2">
                    {service.photo.map((photo, index) => (
                      <Image key={index} src={photo} alt={`Foto ${index}`} className="rounded-lg object-cover h-24 w-full" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
  <button
    onClick={() => handlePageChange(pagination.currentPage - 1)}
    disabled={pagination.currentPage === 1}
    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
  >
    Anterior
  </button>
  <button
    onClick={() => handlePageChange(pagination.currentPage + 1)}
    disabled={pagination.currentPage * pagination.perPage >= pagination.total}
    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
  >
    Próximo
  </button>
</div>

        </>
      ) : showResults && services.length === 0 ? (
        <p className="text-center mt-10">Carregando serviços...</p>
      ) : null}
    </div>
  );
};

export default ServicesPage;
