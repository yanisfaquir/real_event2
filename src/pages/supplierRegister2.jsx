import React, { useState } from 'react';
import GlobalButton from '@/components/globalButton';
import { FaChevronDown } from 'react-icons/fa';

const SupplierRegister = () => {
  const [serviceName, setServiceName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpenLocalidade, setIsOpenLocalidade] = useState(false);
  const [isOpenTipoComida, setIsOpenTipoComida] = useState(false);
  const [isOpenPreco, setIsOpenPreco] = useState(false);

  const localidadeCatering = ['Aveiro', 'Lisboa', 'Porto', 'Braga'];
  const tipoComida = ['Italiana', 'Portuguesa', 'Mexicana', 'Tailandesa'];
  const precoCatering = ['100€ - 500€', '500€ - 1000€', '1000€ - 5000€', 'Mais de 5000€ '];

  const handleToggleDropdownLocalidade = () => {
    setIsOpenLocalidade(!isOpenLocalidade);
  };

  const handleToggleDropdownTipoComida = () => {
    setIsOpenTipoComida(!isOpenTipoComida);
  };

  const handleToggleDropdownPreco = () => {
    setIsOpenPreco(!isOpenPreco);
  };

  const handleSubmit = () => {
    if (!serviceName.trim()) {
      setErrorMessage('Por favor, preencha todos os campos');
    } else {
      setErrorMessage('');
      // router.push('/supplierRegister3'); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-left mt-10 ml-20">
        <h1 className='font-medium text-3xl mb-4'>INFORMAÇÕES</h1>
        <p className='text-base mb-8'>Queremos saber mais sobre o teu serviço de forma a conseguirmos partilhar com os nossos utilizadores.</p>
        <div className="flex flex-wrap justify-between ">
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">Nome do local/serviço</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nome"
              type="text"
              placeholder="Nome"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold" htmlFor="localidade">Localidade</label>
            <div className="relative flex justify-left items-left pt-2">
              <button
                className="relative flex justify-between items-center bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group w-full"
                onClick={handleToggleDropdownLocalidade}
              >
                <p className="px-4 text-gray-400">Localidade</p>
                <div className="flex items-center">
                  <div className="bg-customBlue p-2 hover:bg-gray-100 rounded-r">
                    <FaChevronDown />
                  </div>
                </div>
              </button>
              {isOpenLocalidade && (
                <div className="absolute z-50 top-full left-0 w-full bg-white shadow-md mt-1 rounded">
                  <ul className="text-left border rounded">
                    {localidadeCatering.map((localidadeItem, index) => (
                      <li key={index} className="px-4 py-1 hover:bg-gray-100 border-b">
                        {localidadeItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold" htmlFor="Tipo de Comida">Tipo de Comida</label>
            <div className="relative flex justify-left items-left pt-2">
              <button
                className="relative flex justify-between items-center bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group w-full"
                onClick={handleToggleDropdownTipoComida}
              >
                <p className="px-4 text-gray-400">Tipo de Comida</p>
                <div className="flex items-center">
                  <div className="bg-customBlue p-2 hover:bg-gray-100 rounded-r">
                    <FaChevronDown />
                  </div>
                </div>
              </button>
              {isOpenTipoComida && (
                <div className="absolute z-50 top-full left-0 w-full bg-white shadow-md mt-1 rounded">
                  <ul className="text-left border rounded">
                    {tipoComida.map((tipoComidaItem, index) => (
                      <li key={index} className="px-4 py-1 hover:bg-gray-100 border-b">
                        {tipoComidaItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold" htmlFor="preco">Preço</label>
            <div className="relative flex justify-left items-left pt-2">
              <button
                className="relative flex justify-between items-center bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group w-full"
                onClick={handleToggleDropdownPreco}
              >
                <p className="px-4 text-gray-400">Preço</p>
                <div className="flex items-center">
                  <div className="bg-customBlue p-2 hover:bg-gray-100 rounded-r">
                    <FaChevronDown />
                  </div>
                </div>
              </button>
              {isOpenPreco && (
                <div className="absolute z-50 top-full left-0 w-full bg-white shadow-md mt-1 rounded">
                  <ul className="text-left border rounded">
                    {precoCatering.map((precoItem, index) => (
                      <li key={index} className="px-4 py-1 hover:bg-gray-100 border-b">
                        {precoItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

        <div className='flex justify-center mr-10'>
          <GlobalButton
            size="small"
            type="primary"
            onClick={handleSubmit}
            text="Seguinte"
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierRegister;
