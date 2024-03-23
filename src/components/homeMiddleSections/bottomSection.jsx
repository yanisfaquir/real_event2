import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GlobalButton from '../globalButton';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';

export const BottomMiddleSection = () => {
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsDesktopOrLaptop(mediaQuery.matches);

    const handler = (event) => {
      setIsDesktopOrLaptop(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return (
    <div className="mx-auto my-4 flex flex-col align-center items-center justify-center">
      <div className="services-card-home flex justify-around align-center items-center px-4 w-[86vw] lg:w-[94vw] rounded-[50px] bg-[#4A7D8B] z-0">
        <div className="p-8">
          <Image
            src="/assets/pictures/card-sm-4-home.png"
            alt="6 pessoas confraternizam sorrindo segurando garrafas de bebidas"
            id="services-card-home"
            width={400}
            height={32}
          />
        </div>
        <div className="services-card-home-text -mt-32">
          <div
            className={`flex align-center items-center ${isDesktopOrLaptop ? 'justify-center text-center' : ''}`}
          >
            <div className="mx-2 border-4 rounded-[50px] md:grid-cols-12 lg:grid-cols-6">
              <GlobalButton
                size={isDesktopOrLaptop ? 'large' : 'medium'}
                type="custom"
                path="/services"
                text="Serviços"
              />
            </div>
            <Tooltip
              anchorSelect="#chevron-right-services"
              place="top"
              style={{ fontSize: '1.2em', outline: '2px solid white' }}
            >
              Ir a Serviços
            </Tooltip>

            <Link href="/services">
              <Image
                src={'/assets/icons/chevron-right-blue.png'}
                path="/services"
                text="Ir a Serviços"
                id="chevron-right-services"
                width={isDesktopOrLaptop ? 100 : 80}
                height={80}
                alt="chevron-right"
              />
            </Link>

            <h2
              className={`text-white absolute px-4 mt-64 z-10 text-[1.3rem] max-w-[320px] ${isDesktopOrLaptop ? 'text-start' : 'text-center px-0 -ms-8'}`}
            >
              Encontre as melhores opções de catering, espaços, fotografia, DJ e
              som. Aqui na RealEvent temos fornecedores com as mais variadas
              opções para o seu evento.
            </h2>
          </div>
        </div>
      </div>
      <div
        className="flex align-center items-center text-center justify-center py-8 w-[86vw] lg:w-[94vw] rounded-[50px] z-0 relative"
        aria-label="Organizar seu evento nunca foi tão prático"
      >
        <article className="text-white absolute z-10 top-50 text-[4rem] text-bold bottom-card-home">
          Organizar seu evento
          <br />
          nunca foi tão
          <br />
          <p className="text-[10rem] font-bold bottom-card-home">Prático</p>
        </article>
        <Image
          src="/assets/pictures/card-bottom-home.png"
          alt="Três mulheres deitadas na sobre um pano que está num grama, elas estão sorrindo, sobre o pano também tem um chapéu, um cesto e um rádio"
          width={100}
          height={80}
          layout="responsive"
          className="w-full"
        />
      </div>
    </div>
  );
};
