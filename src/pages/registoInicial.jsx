import React, { useState } from 'react';
import GlobalButton from '@/components/globalButton';
import Image from "next/image";
import Link from 'next/link'; // Import the Link component

const SelecaoRegisto = () => {
  const [tipoRegisto, setTipoRegisto] = useState('cliente');

  const handleSelectionChange = (event) => {
    setTipoRegisto(event.target.value);
  };

  const handleSubmit = () => {
    console.log(tipoRegisto);
  };

  return (
    <div className='p-9'>
      <div className="min-h-screen flex flex-col md:flex-row mt-8 md:mt-16 p-6 md:p-20 bg-gradient-custom bg-cover bg-no-repeat mx-4 md:my-20 md:mx-20 rounded-lg md:rounded-[40px]">
        <div className="md:w-1/2 relative hidden md:block">
          <Image
            src="/assets/pictures/registo.png"
            alt="imagem representativa"
            fill
            sizes="100vw"
            style={{
              objectFit: "contain"
            }} />
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center bg-white rounded-[40px] max-w-md md:max-w-lg mx-auto md:ml-10 mt-10 md:mt-0 p-8 shadow-lg">
          <div className="w-full max-w-xs">
            <h1 className="text-center text-4xl font-bold text-gray-700 mb-6">
              Registo
            </h1>
            <p className="text-center mb-4 text-gray-700">
              Qual tipo de registo deseja realizar?
            </p>
            <div className="flex flex-col mb-4 items-center">
              <div className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5">
                <label>
                  <input
                    type="radio"
                    name="tipoRegisto"
                    value="cliente"
                    checked={tipoRegisto === 'cliente'}
                    onChange={handleSelectionChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700 text-lg font-bold">Cliente</span>
                </label>
              </div>
              <div className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <label>
                  <input
                    type="radio"
                    name="tipoRegisto"
                    value="fornecedor"
                    checked={tipoRegisto === 'fornecedor'}
                    onChange={handleSelectionChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700 text-lg font-bold">Fornecedor</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <GlobalButton
                size="small"
                type="primary"
                path="/registo"
                text="Registar"
              />
            </div>
            <div className="text-center mt-4">
              <span className="text-gray-700">Já tem conta? </span>
              <Link href="/login">
                <span className="text-customBlue font-bold hover:text-customBlueLight-800 underline">Login</span> 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelecaoRegisto;
