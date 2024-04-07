import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GlobalButton from '@/components/globalButton';
import { MiddleSection } from '@/components/homeMiddleSections/middleSection';
import { useRouter } from 'next/router';
import { StartEvent } from './startEvent';

const HomePage = () => {
  const router = useRouter();
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
      <div className="top-0 h-[92vh] z-0 top-section-home">
        <h1 className="text-white relative mx-auto text-center max-w-[850px] top-[24vh] z-10 text-[4rem] font-bold">
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
        Torne realidade o evento da sua empresa ! Aqui tu encontras tudo aquilo que precisas para realizar workshops, conferências ou até mesmo um convívios.
        </h1>
        <ul className="text-white relative mx-auto flex justify-center max-w-[400px] top-[32vh] z-10">
          {!router.pathname.includes('/start-event') && (
            <li
              className="mx-2 rounded-[50px] md:grid-cols-12 lg:grid-cols-6"
              style={{ boxShadow: 'inset 0 0 0 3px #FFFFFF' }}
            >
              <GlobalButton
                size={isDesktopOrLaptop ? 'large' : 'medium'}
                type="custom"
                path="/start-event"
                text="Iniciar"
              />
            </li>
          )}
        </ul>
        <Image
          src="/assets/pictures/homepage-imagem.png"
          alt="5 pessoas felizes confraternizando e sorrindo bastante"
          layout="fill"
          className="brightness-50 home-bg-cover object-cover "
        />
      </div>
      <div>
        <div className="bg-white middle-home-section py-8">
          {router.pathname === '/' && <MiddleSection data={middleData} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
