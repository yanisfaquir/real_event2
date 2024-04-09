import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import GlobalButton from '@/components/globalButton';
import { MiddleSection } from '@/components/homeMiddleSections/middleSection';
import { useRouter } from 'next/router';
import { AccessibilityContext } from '@/contexts/acessibility';
import { Tooltip } from 'react-tooltip';

const HomePage = () => {
  const router = useRouter();
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);
  const { alignment, highContrast, showImageInfo } =
    useContext(AccessibilityContext);

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
      image: `${showImageInfo ? '/assets/pictures/card-sm-1-home.png' : '/assets/pictures/card-sm-1-home-blue.png'}`,
      title: 'Encontre o serviço que precisas',
      text: 'Crie um evento e explore o nosso site para encontrar o serviço perfeito para o seu evento.',
      alt: 'Mulher loira mexendo no celular de frente para um laptop',
    },
    {
      image: `${showImageInfo ? '/assets/pictures/card-sm-2-home.png' : '/assets/pictures/card-sm-2-home-blue.png'}`,
      title: 'Escolha e reserve facilmente',
      text: 'Após encontrar a combinação perfeita, reserve o serviço.',
      alt: 'Um homem e uma mulher de chapéu observam algo sobre uma mesa, há quadros coloridos na parede atrás dele',
    },
    {
      image: `${showImageInfo ? '/assets/pictures/card-sm-3-home.png' : '/assets/pictures/card-sm-3-home-blue.png'}`,
      title: 'Faça acontecer',
      text: 'Desfrute do seu evento dos sonhos  e viva esse momento único.',
      alt: 'Três mulheres confraternizam sorrindo de frente a uma mesa',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="top-0 h-[92vh] z-0 top-section-home">
        {!showImageInfo && (
          <div>
            <h1
              style={{ textAlign: `${alignment ? alignment : 'center'}` }}
              className={`text-white  ${highContrast ? 'bg-black' : 'bg-unset'} relative mx-auto max-w-[850px] top-[24vh] z-10 text-[4rem] font-bold`}
            >
              CONHECE A
            </h1>
            <Image
              src="/assets/pictures/logomarca-white.png"
              alt="Logomarca Realevent"
              width={960}
              height={64}
              id="logo-navbar-home"
              className={`relative flex align-center mx-auto top-[24vh] z-10 ${highContrast ? 'bg-black' : 'bg-unset'}`}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <h2
              style={{ textAlign: `${alignment ? alignment : 'center'}` }}
              className={`text-white ${highContrast ? 'bg-black' : 'bg-unset'} relative mx-auto max-w-[850px] top-[24vh] z-10 text-[1.5rem]`}
            >
              Torne realidade o evento da sua empresa! Aqui tu encontras tudo
              aquilo que precisas para realizar workshops, conferências ou até
              mesmo um convívios.
            </h2>
            <ul
              className={`text-white relative mx-auto flex justify-center max-w-[400px] top-[32vh] z-10 ${highContrast ? 'bg-black' : 'bg-unset'}`}
            >
              {!router.pathname.includes('/start-event') && (
                <li
                  className="mx-2 rounded-[50px] md:grid-cols-12 lg:grid-cols-6"
                  style={{
                    boxShadow: `${highContrast ? '0 0 0 3px #FFF000' : 'inset 0 0 0 3px #FFFFFF'}`,
                  }}
                >
                  <GlobalButton
                    size={isDesktopOrLaptop ? 'large' : 'medium'}
                    type="custom"
                    path="/start-event"
                    text="Iniciar"
                  />
                </li>
              )}
            </ul>{' '}
          </div>
        )}
        <Image
          src="/assets/pictures/homepage-imagem.png"
          alt="3 pessoas felizes confraternizando e sorrindo bastante"
          className="brightness-50 home-bg-cover object-cover"
          fill
          sizes="100vw"
          id="cover-home"
        />

        <map name="image-map relative flex">
          <area
            alt="Pessoa 1"
            title="Pessoa 1"
            coords="10%,5%,25%,30%"
            shape="rect"
            id="map-area-1"
            className="image-info"
            style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '25%',
              height: '30%',
            }}
          />
          {showImageInfo && (
            <Tooltip
              anchorSelect={`#map-area-1`}
              place="bottom-end"
              style={{ fontSize: '1.5em', zIndex: '20' }}
            >
              Mulher de cabelo cacheado, está maqueada, possui um brinco de
              pérola, tem um sorriso no rosto, aparenta estar feliz
            </Tooltip>
          )}
          <area
            alt="Pessoa 2"
            title="Pessoa 2"
            coords="52%,45%,15%,20%"
            shape="rect"
            id="map-area-2"
            className="image-info"
            style={{
              position: 'absolute',
              top: '52%',
              left: '45%',
              width: '15%',
              height: '20%',
            }}
          />

          {showImageInfo && (
            <Tooltip
              anchorSelect={`#map-area-2`}
              place="top"
              style={{ fontSize: '1.5em', zIndex: '20' }}
            >
              Rapaz sorrindo e feliz olhando para a mulher de cabelo cacheado
            </Tooltip>
          )}
          <area
            alt="Pessoa 3"
            title="Pessoa 3"
            coords="48%,62%,20%,25%"
            shape="rect"
            id="map-area-3"
            className="image-info"
            style={{
              position: 'absolute',
              top: '48%',
              left: '62%',
              width: '20%',
              height: '25%',
            }}
          />

          {showImageInfo && (
            <Tooltip
              anchorSelect={`#map-area-3`}
              place="top"
              style={{ fontSize: '1.5em', zIndex: '20' }}
            >
              Mulher de cabelo escuro e liso, sorrindo e feliz olhando para a mulher de cabelo cacheado
            </Tooltip>
          )}
        </map>
      </div>
      <div>
        <div
          className={`${highContrast ? 'bg-black' : 'bg-[#ececec]'} middle-home-section py-8`}
        >
          {router.pathname === '/' && <MiddleSection data={middleData} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
