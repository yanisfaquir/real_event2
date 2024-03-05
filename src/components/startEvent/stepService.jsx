import React, { useState, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import HomePage from '@/pages';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import Image from 'next/image';

const StepService = () => {
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
      <HomePage />
      <div className="bg-white border-white middle-home-section py-8 px-8">
        <div className="-mb-20 p-4">
          <Tooltip
            anchorSelect="#chevron-left-begin"
            place="top"
            style={{ fontSize: '1.2em' }}
          >
            Voltar à página de início do evento
          </Tooltip>

          <Link href="/start-event/begin">
            <Image
              src={'/assets/icons/chevron-left-green.svg'}
              path="/start-event/begin"
              text="Voltar à página de início do evento"
              id="chevron-left-begin"
              alt="chevron-left"
              width={100}
              height={80}
            />
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row items-center mt-10">
            <div className="lg:w-1/2 p-10 hidden lg:block">
                <Image
                  src={'/assets/pictures/service-type-img.png'}
                  alt="Rapaz de óculos segurando papéis e apontando para algo"
                  width={100}
                  height={80}
                  layout="responsive"
                />
            </div>
          <div className='lg:w-1/2 p-10'>
            <p className="flex flex-col text-start text-[4rem] font-bold text-middle-home">
              Tipos de serviços
            </p>
            <p className="text-black relative max-w-[90vw] text-start mb-8 text-[1.2rem]">
              Selecione abaixo qual o serviço gostaria de contratar para o seu
              evento.
            </p>

            <ul className=' text-[1.2rem]'>
              <li
                style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '8px',
                }}
                className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
              >
                <input
                  type="radio"
                  value="Catering"
                  checked={selectedService === 'Catering'}
                  onChange={handleServiceChange}
                  className="mx-2"
                />
                <label>Catering (descrição breve)</label>
              </li>

              <li
                style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '8px',
                }}
                className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
              >
                <input
                  type="radio"
                  value="Fotografia"
                  checked={selectedService === 'Fotografia'}
                  onChange={handleServiceChange}
                  className="mx-2"
                />
                <label>Fotografia (descrição breve)</label>
              </li>

              <li
                style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '8px',
                }}
                className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
              >
                <input
                  type="radio"
                  value="Espaço"
                  checked={selectedService === 'Espaço'}
                  onChange={handleServiceChange}
                  className="mx-2"
                />
                <label>Espaço (descrição breve)</label>
              </li>

              <li
                style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '8px',
                }}
                className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
              >
                <input
                  type="radio"
                  value="DJ"
                  checked={selectedService === 'DJ'}
                  onChange={handleServiceChange}
                  className="mx-2"
                />
                <label>DJ e Som (descrição breve)</label>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center py-8">
          <GlobalButton
            size="large"
            type="primary"
            path="/start-event/step-event"
            text="SEGUINTE"
          />
        </div>
      </div>
    </div>
  );
};

export default StepService;
