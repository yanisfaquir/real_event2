import React, { useState, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import HomePage from '@/pages';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import Image from "next/image";
import { IoIosAttach } from "react-icons/io";

const SupplierRegister = () => {
    const [selectedService, setSelectedService] = useState('');
  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, []);

  return (
    <div>

      <div className="bg-white border-white middle-home-section py-8 px-8">
        <div className="-mb-20 p-4 mt-20">
          <Tooltip
            anchorSelect="#chevron-left-service"
            place="top"
            style={{ fontSize: '1.2em' }}
          >
            Voltar 
          </Tooltip>

          <Link href="/start-event/step-service">
            <Image
              src={'/assets/icons/chevron-left-green.svg'}
              path="/start-event/step-service"
              text=" Voltar à página de tipos de serviço"
              id="chevron-left-service"
              alt="chevron-left"
              width={100}
              height={80}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row-reverse items-center mt-10">
            <div className="lg:w-1/2 p-10 hidden lg:block card-home-item mx-auto relative justify-self-end">
                <Image
                  src='/assets/pictures/card-sm-1-home-blue.png'
                  alt="Mulher loira de frente a um computador segurando um smartphone"
                  width={400}
                  height={600} />
            </div>

          <div className='lg:w-1/2 p-10'>
            <h1 className='font-bold text-4xl '>OUTRAS INFORMAÇÕES</h1>

            <p className="text-black relative max-w-[90vw] text-start mb-8 text-[1.2rem]">
                Faça uma descrição do seu espaço e adicione fotos e outros detalhes que ache pertinente.
            </p>
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
            >
            Imagem
            </label>
    
            <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-100 my-4 shadow-xl">
                <span class="bg-customBlue border-l p-2 hover:bg-gray-100 ml-auto">
                    <IoIosAttach />
                </span>
            </div>


            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
            >
            Descrição 
            </label>
    
            <div class="flex items-center ps-4 border border-gray-200 h-20 rounded dark:border-gray-100 my-4 shadow-xl">
            <input type="text" class="p-0 text-gray-400 bg-transparent " placeholder="Descrição" />
            </div>

            <div className='mt-10'>
                <input
                    type="radio"
                    value="Catering"
                    //   checked={selectedService === 'Catering'}
                    onChange={handleServiceChange}
                    className="mx-5"
                    />
                    <label>Vigilância</label>

                    <input
                    type="radio"
                    value="Catering"
                    //   checked={selectedService === 'Catering'}
                    onChange={handleServiceChange}
                    className="mx-5"
                    />
                    <label>Luzes</label>
            </div>

        
        
        </div>
        </div>
        <div className="flex justify-center py-8">
          <GlobalButton
            size="large"
            type="primary"
            text="SEGUINTE"
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierRegister;
