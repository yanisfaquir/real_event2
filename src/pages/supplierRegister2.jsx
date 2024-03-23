import React, { useState, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/router';

const SupplierRegister = () => {
  const [serviceName, setServiceName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!serviceName.trim()) {
      setErrorMessage('Por favor, preencha todos os campos');
    } else {
      setErrorMessage('');
      router.push('/supplierRegister3'); 
    }
  };

  useEffect(() => {
    const { service } = router.query;
    if (service) {
      console.log('Valor do serviço:', service);
    } else {
      console.log('Não há valor de serviço');
    }
  }, [router.query]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-left mt-10 ml-20">
        <h1 className='font-bold text-xl'>INFORMAÇÕES</h1>
        <p className='text-base'>Queremos saber mais sobre o teu serviço de forma a conseguirmos partilhar com os nossos utilizadores.</p>
        <div className="mb-5 mr-20 flex">
          <form className="bg-white pt-6 pb-8 mb-4" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
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
          </form>

                <div className="flex flex-col items-start mt-7 ml-9 ">
                    <label
                        className="block text-gray-700 text-sm font-bold"
                        htmlFor="email"
                    >
                    Localidade
                    </label>
                    <div className="relative flex justify-left items-left pt-2 ">
                        <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
                            <p className="px-4  text-gray-400">Localidade</p>
                            <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                                <FaChevronDown />
                            </span>
                            <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                                <ul className="text-left border rounded">
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                </ul>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-start mt-7 ml-9 ">
                    <label
                        className="block text-gray-700 text-sm font-bold"
                        htmlFor="email"
                    >
                    Tipo de espaço
                    </label>
                    <div className="relative flex justify-left items-left pt-2 ">
                        <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
                            <p className="px-4  text-gray-400">Tipo de espaço</p>
                            <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                                <FaChevronDown />
                            </span>
                            <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                                <ul className="text-left border rounded">
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                </ul>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-start mt-7 ml-9 ">
                    <label
                        className="block text-gray-700 text-sm font-bold"
                        htmlFor="email"
                    >
                    Capacidade
                    </label>
                    <div className="relative flex justify-left items-left pt-2 ">
                        <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
                            <p className="px-4  text-gray-400">Capacidade</p>
                            <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                                <FaChevronDown />
                            </span>
                            <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                                <ul className="text-left border rounded">
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                </ul>
                            </div>
                        </button>
                    </div>
                </div>


                <div className="flex flex-col items-start mt-7 ml-9 ">
                    <label
                        className="block text-gray-700 text-sm font-bold"
                        htmlFor="email"
                    >
                    Preço por pessoa
                    </label>
                    <div className="relative flex justify-left items-left pt-2 ">
                        <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
                            <p className="px-4  text-gray-400">Preço</p>
                            <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                                <FaChevronDown />
                            </span>
                            <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                                <ul className="text-left border rounded">
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                </ul>
                            </div>
                        </button>
                    </div>
                </div>


                
                <div className="flex flex-col items-start mt-7 ml-9 ">
                    <label
                        className="block text-gray-700 text-sm font-bold"
                        htmlFor="email"
                    >
                    Categoria de Evento
                    </label>
                    <div className="relative flex justify-left items-left pt-2 ">
                        <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
                            <p className="px-4  text-gray-400">Categoria</p>
                            <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                                <FaChevronDown />
                            </span>
                            <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                                <ul className="text-left border rounded">
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                                        Item 1
                                    </li>
                                </ul>
                            </div>
                        </button>
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