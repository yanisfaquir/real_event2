import React from 'react';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';

const Registo = () => {
  return (
    <div className="min-h-screen flex mt-16 p-20 bg-[url('/assets/pictures/fundo.png')] bg-cover bg-no-repeat my-20 mx-20 rounded-[40px]">
      <div className="w-1/2 relative">
        <Image
          src="/assets/pictures/registo.png"
          alt="duas pessoas no pc"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center bg-white rounded-[40px] max-w-md md:max-w-lg ml-10">
        <div className="w-full max-w-xs">
          <h1 className="text-center text-4xl font-bold text-gray-700 mb-6">
            Registo
          </h1>
          <form className="bg-white px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Nome
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Nome"
                type="Nome"
                placeholder="Nome"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="flex justify-center">
              <GlobalButton
                size="small"
                type="primary"
                path="/"
                text="Registar"
              />
            </div>
            <div className="text-center mt-4">
              <span className="text-gray-700">Já tem conta? </span>
              <a href="/register" className="">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registo;
