import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import GlobalButton from '@/components/globalButton';
import { MiddleSection } from '@/components/homeMiddleSections/middleSection';
import { useRouter } from 'next/router';
import { AccessibilityContext } from '@/contexts/acessibility';
import { Tooltip } from 'react-tooltip';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  const keywords = [
    'Workshops',
    'Palestras',
    'Networking',
    'Exposições',
    'Team Buildings',
    'Convívios',
    'Webinars',
    'Congressos',
    'Feiras de emprego',
    'E muito mais!',
  ];

  return (
    <div>
      <Helmet>
        <title>RealEvent</title>
        <meta
          name="description"
          content="Portal para conectar utilizadores, servidores e empresas para promover eventos."
        />
        <meta
          name="keywords"
          content="eventos, empresarial, empresas, serviços, plataforma"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div>
        <Image
          src="/assets/pictures/circles-top-spread-screen.png"
          className={`absolute z-0 top-0 right-0 cover-spread`}
          alt="Background Realevent"
          width={1000}
          height={1000}
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'fill',
          }}
        />
        <div className={`flex justify-start p-4 mx-8 relative z-1`}>
          <Image
            src="/assets/icons/white-logo-spread.svg"
            alt="Logo RealEvent"
            width={36}
            height={36}
            id="logo-spread-page"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          className={`flex justify-center md:flex-row flex-col-reverse md:flex-row md:justify-between items-center align-top p-2 md:p-4 md:mx-4 relative`}
          style={{ zIndex: 1 }}
        >
          <div
            className={`3/5 md:w-2/5 flex flex-col justify-center align-middle`}
          >
            <Image
              src="/assets/pictures/phone-spread-screen.png"
              alt="Telemóvel com a futura página da RealEvent"
              width={1000}
              height={320}
              id="phone-realevent-page"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </div>
          <div
            className={`md:w-3/5 w-100 flex justify-start flex-col items-center align-top gap-4 text-center`}
          >
            <h1
              className={`text-white text-4xl md:text-8xl font-bold text-center`}
            >
              Em breve
            </h1>
            <Image
              src="/assets/pictures/logomarca-white.png"
              alt="Logomarca Realevent"
              width={960}
              height={64}
              id="logo-navbar-home"
              className={``}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <h2
              className={`text-white relative mx-auto z-10 text-xl md:text-3xl text-center`}
            >
              O lançamento de uma nova era na organização de eventos
              corporativos está por começar! Não perca o lançamento da
              plataforma da RealEvent.
            </h2>
            <div className={`flex justify-center gap-4 md:gap-16 mt-8`}>
              <GlobalButton
                image="/assets/pictures/linkedin-green-icon.svg"
                path="https://www.linkedin.com/company/realevent-app/posts/?feedView=all"
                text={`LinkedIn RealEvent`}
                id="linkedin-realevent"
                width={`64px`}
              />
              <GlobalButton
                image="/assets/pictures/instagram-green-icon.svg"
                path="https://www.instagram.com/realevent.app/"
                text={`Instagram RealEvent`}
                id="instagram-realevent"
                width={`64px`}
              />
            </div>
          </div>
        </div>
        <div
          className={`bg-[#F4F4F4] py-16 md:py-32 relative z-1 -mt-24 md:-mt-40`}
          style={{
            borderRadius: `50% 50% 0 0 / 8% 8% 0 0`,
          }}
        >
          <h1
            className={`text-[#1E373E] text-4xl md:text-8xl font-bold text-center my-8`}
          >
            Quem somos?
          </h1>
          <h2
            className={`text-[#1E373E] relative mx-auto mb-8 z-10 text-xl md:text-3xl text-center px-4`}
          >
            A RealEvent é uma empresa que tem como missão, transformar suas
            ideias de eventos corporativos em realidade. Oferecemos os melhores
            serviços:{' '}
          </h2>
          <div
            className={`flex flex-wrap justify-center gap-4 mt-8 px-8 md:px-32`}
          >
            {keywords.map((key) => (
              <div
                key={key}
                className="p-2 md:p-8 mb-2 bg-white rounded-full shadow-md"
              >
                <p
                  className={`text-[#1E373E] relative text-xl md:text-2xl text-center`}
                >
                  {key}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`py-16 md:py-32 relative z-1 flex md:flex-row flex-col-reverse justify-center md:justify-between items-center px-4 md:px-32`}
        >
          <div
            className={`w-100 md:w-2/5 flex flex-col justify-center align-middle`}
          >
            <Image
              src="/assets/pictures/services-examples.png"
              alt="Exemplos de futuros serviços disponíveis na página da RealEvent"
              width={1000}
              height={320}
              id="examples-realevent-page"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </div>
          <div
            className={`md:w-3/5 w-100 flex justify-center md:justify-start flex-col items-center md:items-start md:ms-8 align-top gap-4 text-center md:text-start`}
          >
            <h1
              className={`text-white text-4xl md:text-8xl font-bold text-center md:text-start my-4 md:my-8`}
            >
              Diversos serviços
            </h1>
            <h2
              className={`text-white relative mb-4 md:mb-16 text-xl md:text-3xl text-center md:text-start`}
            >
              O lançamento de uma nova era na organização de eventos
              corporativos está por começar! Não perca o lançamento da
              plataforma da RealEvent e faça parte dessa revolução.{' '}
            </h2>
          </div>
        </div>
        <div
          className={`bg-[#1E373E] flex justify-center flex-col items-center pt-32 pb-24 align-top gap-4 text-center`}
        >
          <h1 className={`text-white text-8xl font-bold text-center mb-8`}>
            Make it happen
          </h1>
          <Image
            src="/assets/pictures/logomarca-white.png"
            alt="Logomarca Realevent"
            width={320}
            height={64}
            id="logo-navbar-home"
            className={``}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </div>
  );

  // const router = useRouter();
  // const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);
  // const { alignment, highContrast, showImageInfo } =
  //   useContext(AccessibilityContext);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(min-width: 1024px)');
  //   setIsDesktopOrLaptop(mediaQuery.matches);

  //   const handler = (event) => {
  //     setIsDesktopOrLaptop(event.matches);
  //   };

  //   mediaQuery.addEventListener('change', handler);
  //   return () => mediaQuery.removeEventListener('change', handler);
  // }, []);
  // const middleData = [
  //   {
  //     image: `${showImageInfo ? '/assets/pictures/card-sm-1-home.png' : '/assets/pictures/card-sm-1-home-blue.png'}`,
  //     title: 'Encontre o serviço que precisas',
  //     text: 'Crie um evento e explore o nosso site para encontrar o serviço perfeito para o seu evento.',
  //     alt: 'Mulher loira mexendo no celular de frente para um laptop',
  //   },
  //   {
  //     image: `${showImageInfo ? '/assets/pictures/card-sm-2-home.png' : '/assets/pictures/card-sm-2-home-blue.png'}`,
  //     title: 'Escolha e reserve facilmente',
  //     text: 'Após encontrar a combinação perfeita, reserve o serviço.',
  //     alt: 'Um homem e uma mulher de chapéu observam algo sobre uma mesa, há quadros coloridos na parede atrás dele',
  //   },
  //   {
  //     image: `${showImageInfo ? '/assets/pictures/card-sm-3-home.png' : '/assets/pictures/card-sm-3-home-blue.png'}`,
  //     title: 'Faça acontecer',
  //     text: 'Desfrute do seu evento dos sonhos  e viva esse momento único.',
  //     alt: 'Três mulheres confraternizam sorrindo de frente a uma mesa',
  //   },
  // ];

  // return (
  //   <div className="flex flex-col">
  //     <div className="top-0 h-[92vh] z-0 top-section-home">
  //       {!showImageInfo && (
  //         <div>
  //           <h1
  //             style={{ textAlign: `${alignment ? alignment : 'center'}` }}
  //             className={`text-white  ${highContrast ? 'bg-black' : 'bg-unset'} relative mx-auto max-w-[800px] top-[24vh] z-10 text-[4rem] font-bold`}
  //           >
  //             CONHECE A
  //           </h1>
  //           <Image
  //             src="/assets/pictures/logomarca-white.png"
  //             alt="Logomarca Realevent"
  //             width={960}
  //             height={64}
  //             id="logo-navbar-home"
  //             className={`relative flex align-center mx-auto top-[24vh] z-10 ${highContrast ? 'bg-black' : 'bg-unset'}`}
  //             style={{
  //               maxWidth: '100%',
  //               height: 'auto',
  //             }}
  //           />
  //           <h2
  //             style={{ textAlign: `${alignment ? alignment : 'center'}` }}
  //             className={`text-white ${highContrast ? 'bg-black' : 'bg-unset'} relative mx-auto max-w-[850px] top-[24vh] z-10 text-[1.5rem]`}
  //           >
  //             Torne realidade o evento da sua empresa! Aqui você encontra tudo
  //             aquilo que precisa para realizar workshops, conferências ou até
  //             mesmo um convívio.
  //           </h2>
  //           <ul
  //             className={`text-white relative mx-auto flex justify-center max-w-[400px] top-[32vh] z-10 ${highContrast ? 'bg-black' : 'bg-unset'}`}
  //           >
  //             {!router.pathname.includes('/startEvent') && (
  //               <li
  //                 className="mx-2 rounded-[50px] md:grid-cols-12 lg:grid-cols-6"
  //                 style={{
  //                   boxShadow: `${highContrast ? '0 0 0 3px #FFF000' : 'inset 0 0 0 3px #FFFFFF'}`,
  //                 }}
  //               >
  //                 <GlobalButton
  //                   size={isDesktopOrLaptop ? 'large' : 'medium'}
  //                   type="custom"
  //                   path="/startEvent"
  //                   text="Iniciar"
  //                 />
  //               </li>
  //             )}
  //           </ul>{' '}
  //         </div>
  //       )}
  //       <Image
  //         src="/assets/pictures/homepage-imagem.png"
  //         alt="3 pessoas felizes confraternizando e sorrindo bastante"
  //         className="brightness-50 home-bg-cover object-cover"
  //         fill
  //         sizes="100vw"
  //         id="cover-home"
  //       />

  //       <map name="image-map relative flex">
  //         <area
  //           alt="Pessoa 1"
  //           title="Pessoa 1"
  //           coords="10%,5%,25%,30%"
  //           shape="rect"
  //           id="map-area-1"
  //           className="image-info"
  //           style={{
  //             position: 'absolute',
  //             top: '10%',
  //             left: '5%',
  //             width: '25%',
  //             height: '30%',
  //           }}
  //         />
  //         {showImageInfo && (
  //           <Tooltip
  //             anchorSelect={`#map-area-1`}
  //             place="bottom-end"
  //             style={{ fontSize: '1.5em', zIndex: '20' }}
  //           >
  //             Mulher de cabelo cacheado, está maqueada, possui um brinco de
  //             pérola, tem um sorriso no rosto, aparenta estar feliz
  //           </Tooltip>
  //         )}
  //         <area
  //           alt="Pessoa 2"
  //           title="Pessoa 2"
  //           coords="52%,45%,15%,20%"
  //           shape="rect"
  //           id="map-area-2"
  //           className="image-info"
  //           style={{
  //             position: 'absolute',
  //             top: '52%',
  //             left: '45%',
  //             width: '15%',
  //             height: '20%',
  //           }}
  //         />

  //         {showImageInfo && (
  //           <Tooltip
  //             anchorSelect={`#map-area-2`}
  //             place="top"
  //             style={{ fontSize: '1.5em', zIndex: '20' }}
  //           >
  //             Rapaz sorrindo e feliz olhando para a mulher de cabelo cacheado
  //           </Tooltip>
  //         )}
  //         <area
  //           alt="Pessoa 3"
  //           title="Pessoa 3"
  //           coords="48%,62%,20%,25%"
  //           shape="rect"
  //           id="map-area-3"
  //           className="image-info"
  //           style={{
  //             position: 'absolute',
  //             top: '48%',
  //             left: '62%',
  //             width: '20%',
  //             height: '25%',
  //           }}
  //         />

  //         {showImageInfo && (
  //           <Tooltip
  //             anchorSelect={`#map-area-3`}
  //             place="top"
  //             style={{ fontSize: '1.5em', zIndex: '20' }}
  //           >
  //             Mulher de cabelo escuro e liso, sorrindo e feliz olhando para a mulher de cabelo cacheado
  //           </Tooltip>
  //         )}
  //       </map>
  //     </div>
  //     <div>
  //       <div
  //         className={`${highContrast ? 'bg-black' : 'bg-[#ececec]'} middle-home-section py-8`}
  //       >
  //         {router.pathname === '/' && <MiddleSection data={middleData} />}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default HomePage;
