import React from 'react';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';

const SupplierRegister = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-left mt-10 ml-20">
            <h1 className='font-bold text-xl'>INFORMAÇÕES</h1>
            <p className='text-base'>Queremos saber mais sobre o teu serviço de forma a conseguirmos partilhar com os nossos utilizadores.</p>
            <div className="mb-5 mr-20 flex">
                <form className="bg-white pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                        Nome do local/serviço
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="Nome"
                            type="Nome"
                            placeholder="Nome"
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

            <div className='flex justify-center mr-10'>
                <GlobalButton
                size="small"
                type="primary"
                path="/"
                text="Seguinte"
                />
            </div>
        </div>  
    </div>
  );
};

export default SupplierRegister;
