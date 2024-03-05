import React, { useState, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import HomePage from '@/pages';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import Image from 'next/image';

const StepEvent = () => {
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
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
            anchorSelect="#chevron-left-service"
            place="top"
            style={{ fontSize: '1.2em' }}
          >
            Voltar à página de tipos de serviço
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
            />
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row-reverse items-center mt-10">
            <div className="lg:w-1/2 p-10 hidden lg:block">
                <Image
                  src={'/assets/pictures/event-type-img.png'}
                  alt="Pessoas felizes confraternizando"
                  width={100}
                  height={80}
                  layout="responsive"
                />
            </div>
          <div className='lg:w-1/2 p-10'>
            <p className="flex flex-col text-start text-[4rem] font-bold text-middle-home">
              Tipos de eventos
            </p>
            <p className="text-black relative max-w-[90vw] text-start mb-8 text-[1.2rem]">
            Selecione abaixo qual o evento.
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
                  value="Jantar"
                  checked={selectedEvent === 'Jantar'}
                  onChange={handleEventChange}
                  className="mx-2"
                />
                <label>Jantar</label>
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
                  value="Cocktail"
                  checked={selectedEvent === 'Cocktail'}
                  onChange={handleEventChange}
                  className="mx-2"
                />
                <label>Cocktail</label>
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
                  value="Aniversario"
                  checked={selectedEvent === 'Aniversario'}
                  onChange={handleEventChange}
                  className="mx-2"
                />
                <label>Aniversário Empresa</label>
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
                  value="Bootcamp"
                  checked={selectedEvent === 'Bootcamp'}
                  onChange={handleEventChange}
                  className="mx-2"
                />
                <label>Bootcamp</label>
              </li>
            </ul>
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

export default StepEvent;
