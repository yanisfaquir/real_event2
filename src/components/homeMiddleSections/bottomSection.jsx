import React from 'react';
import Image from 'next/image';
import GlobalButton from '../globalButton';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';

export const BottomMiddleSection = () => {
  return (
    <div className="mx-auto my-4 flex flex-col align-center justify-center">
      <div className="services-card-home flex justify-around align-center items-center px-4 w-[92vw] rounded-[50px] bg-[#4A7D8B] z-0">
        <div className="p-8">
          <Image
            src="/assets/pictures/card-sm-4-home.png"
            alt="6 pessoas confraternizam sorrindo segurando garrafas de bebidas"
            id="services-card-home"
            width={400}
            height={32}
          />
        </div>
        <div className="services-card-home-text -mt-32 pe-20">
          <div className="flex align-center items-center">
            <div className="mx-2 border-2 rounded-[50px] md:grid-cols-12 lg:grid-cols-6">
              <GlobalButton
                size="large"
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
                width={100}
                height={80}
                alt="chevron-right"
              />
            </Link>
          </div>
          <div>
            <p className="text-white absolute px-4 z-10 text-[1.3rem] max-w-[360px]">
              Encontre as melhores opções de catering, espaços, fotografia, DJ e
              som. Aqui na RealEvent temos fornecedores com as mais variadas
              opções para o seu evento.
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex align-center items-center text-center justify-center py-8 rounded-[50px] z-0 relative"
        aria-label="Organizar seu evento nunca foi tão prático"
      >
        <article className="text-white absolute z-10 top-50 text-[4rem] text-bold bottom-card-home">
          Organizar seu evento
          <br />
          nunca foi tão
          <br />
          <p className="text-[10rem] bottom-card-home">Prático</p>
        </article>
        <Image
          src="/assets/pictures/card-bottom-home.png"
          alt="Três mulheres deitadas na sobre um pano que está num grama, elas estão sorrindo, sobre o pano também tem um chapéu, um cesto e um rádio"
          width={100}
          height={80}
          layout="responsive"
        />
      </div>
    </div>
  );
};
