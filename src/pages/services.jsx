import React, { useState, useEffect, useContext } from 'react';
import ApiClient from '../../apiClient';
import { AccessibilityContext } from '@/contexts/acessibility';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import Link from 'next/link'; // Importar o Link
import { Tooltip } from 'react-tooltip';
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
    <div className="services-container mx-auto pt-10 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="relative mb-16">
        <Tooltip
          anchorSelect="#chevron-left-services"
          place="right"
          style={{ fontSize: '1.2em' }}
        >
          Voltar
        </Tooltip>
        <Link
          href="/"
          style={{
            cursor: 'pointer',
            zIndex: '9',
            position: 'absolute',
            
            left: '1%',
          }}
        >
          <Image
            src={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/chevron-left-green.svg`}
            id="chevron-left-services"
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

      <section className="mb-10 ">
        <p
          className={`flex flex-col  pt-25 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}
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
              <div key={service.id} className="p-4 border rounded">
                <h3 className="text-xl font-bold">{service.name}</h3>
                <p>{service.description}</p>
                <p>Preço: R${service.price}</p>
                <p>Clientes: {service.customers}</p>
                <p>Tipo: {service.type}</p>
                <p>Datas Disponíveis: {service.availableDates}</p>
                <p>Dias da Semana Disponíveis: {service.availableWeekdays}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {pagination.currentPage > 1 && (
              <button
                className="px-4 py-2 mr-2 bg-gray-300 rounded"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {services.length === pagination.perPage && (
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                Próximo
              </button>
            )}
          </div>
        </>
      ) : (
        showResults && <p>Nenhum serviço encontrado.</p>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ServicesPage;
