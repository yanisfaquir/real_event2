import React from 'react';
import Image from 'next/image';
import GlobalButton from '@/components/globalButton';
import { MiddleSection } from '@/components/homeMiddleSections/middleSection';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  const middleData = [
    {
      image: '/assets/pictures/card-sm-1-home-blue.png',
      title: 'Encontre o serviço que precisas',
      text: 'Crie um evento e explore o nosso site para encontrar o serviço perfeito para o seu evento.',
      alt: 'Mulher loira mexendo no celular de frente para um laptop',
    },
    {
      image: '/assets/pictures/card-sm-2-home-blue.png',
      title: 'Escolha e reserve facilmente',
      text: 'Após encontrar a combinação perfeita, reserve o serviço.',
      alt: 'Um homem e uma mulher de chapéu observam algo sobre uma mesa, há quadros coloridos na parede atrás dele',
    },
    {
      image: '/assets/pictures/card-sm-3-home-blue.png',
      title: 'Faça acontecer',
      text: 'Desfrute do seu evento dos sonhos  e viva esse momento único.',
      alt: 'Três mulheres confraternizam sorrindo segurando garrafas de bebida',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="top-0 h-screen max-h-[100vh] z-0 top-section-home">
        <h1 className="text-white relative flex justify-center top-[24vh] z-10 text-[4rem] font-bold">
          CONHECE A
        </h1>
        <Image
          src="/assets/pictures/logomarca-white.png"
          alt="Logomarca Realevent"
          width={960}
          height={64}
          id="logo-navbar-home"
          className="relative flex align-center mx-auto top-[24vh] z-10"
        />

        <h1 className="text-white relative mx-auto max-w-[850px] top-[24vh] z-10 text-center text-[1.5rem]">
          Torne realidade o seu evento dos sonhos! Aqui tu encontras tudo aquilo
          que precisas para realizar qualquer tipo de evento, desde batizados à
          convívios.
        </h1>
        <ul className="text-white relative mx-auto flex justify-center max-w-[400px] top-[32vh] z-10">
          {!router.pathname.includes('/start-event') && (
            <li className="mx-2 border-2 rounded-[50px] md:grid-cols-12 lg:grid-cols-6">
              <GlobalButton
                size="large"
                type="custom"
                path="/start-event/begin"
                text="Iniciar"
              />
            </li>
          )}
          <li className="mx-2 md:grid-cols-12 lg:grid-cols-6">
            <GlobalButton
              size="large"
              type="secondary"
              path="/package"
              text="Pacotes"
            />
          </li>
        </ul>
        <Image
          src="/assets/pictures/homepage-bg-1.png"
          alt="5 pessoas felizes confraternizando e sorrindo bastante"
          layout="fill"
          className="brightness-50 home-bg-cover object-cover"
        />
      </div>
      <div>
        {router.pathname === '/' && (
          <div className="bg-white middle-home-section py-8">
            <MiddleSection data={middleData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
