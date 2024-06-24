import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActionServiceType } from '../redux/actions/eventActions';
import GlobalButton from '@/components/globalButton';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { AccessibilityContext } from '@/contexts/acessibility';

const StartEvent = () => {
  const { alignment, highContrast } = useContext(AccessibilityContext);
  const formId = uuidv4();
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceType = useSelector((state) => state.event.serviceType);

  const [selectedService, setSelectedService] = useState(serviceType); // Inicializa com o valor da store Redux
  const [currentSection2, setCurrentSection2] = useState({
    number: 1,
    text: 'Ir à Página Informações do Evento',
  });
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const formRef = useRef(null);

  // Array de serviços
  const services = [
    { value: 'Catering', label: 'Catering' },
    { value: 'Mechardising', label: 'Mechardising' },
    { value: 'Espaço', label: 'Espaço' },
    { value: 'DJ', label: 'DJ e Som' },
  ];

  // Atualiza o estado de disabled do botão com base na validação dos campos
  useEffect(() => {
    const isValid = () => {
      switch (currentSection2.number) {
        case 1:
          return selectedService && selectedService.length > 0;
        default:
          return false;
      }
    };

    setButtonDisabled(!isValid());
  }, [selectedService, currentSection2.number]);

  // Atualiza a store Redux com os serviços selecionados ao submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setActionServiceType(selectedService));
    router.push('/startEvent3');
  };

  // Função para lidar com a mudança de seleção dos serviços
  const handleServiceChange = (event) => {
    const value = event.target.value;

    if (event.target.checked) {
      setSelectedService((prevServices) => [...prevServices, value]);
    } else {
      setSelectedService((prevServices) =>
        prevServices.filter((service) => service !== value)
      );
    }
  };

  // Efeito para atualizar o estado de disabled do botão ao mudar a seção
  useEffect(() => {
    if (formRef.current) {
      window.scrollTo({
        behavior: 'smooth',
      });
    }
  }, [currentSection2]);

  return (
    <div className="w-[90vw] mx-auto mt-20">
      <div className="-mb-20 row p-4 relative">
        <div className="lg:block hidden">
          <Tooltip
            anchorSelect={`#chevron-left-home-${currentSection2.number}`}
            place="right"
            style={{ fontSize: '1.2em' }}
          >
            {`${currentSection2.text}`}
          </Tooltip>
        </div>
        {currentSection2.number === 1 ? (
          <Link
            href="/startEvent1"
            style={{
              cursor: 'pointer',
              zIndex: '9',
              position: 'absolute',
              top: '2rem',
              left: '1%',
            }}
          >
            <Image
              src={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/chevron-left-green.svg`}
              path="/"
              text={`${currentSection2.text}`}
              id={`chevron-left-home-${currentSection2.number}`}
              alt="chevron-left"
              width={80}
              height={80}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Link>
        ) : (
          <Image
            src={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/chevron-left-green.svg`}
            onClick={() =>
              setCurrentSection2((prevState) => ({
                number: prevState.number - 1,
                text:
                  prevState.number - 1 === 1
                    ? 'Ir à Página Inicial'
                    : prevState.number - 1 === 2
                    ? 'Retornar à página de localização e data'
                    : 'Retornar à página de tipos de serviço',
              }))
            }
            text={currentSection2.text}
            id={`chevron-left-home-${currentSection2.number}`}
            alt="chevron-left"
            width={80}
            height={80}
            style={{
              cursor: 'pointer',
              zIndex: '9',
              position: 'absolute',
              top: '2rem',
              left: '1%',
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <section className={`event-form mt-20 lg:mt-12 event-form-2 ${currentSection2.number === 1 ? 'move-in visible h-auto' : 'move-out invisible h-0 overflow-hidden'}`}>
          <div className="flex flex-col lg:flex-row items-end align-end mt-10">
            <div className="lg:w-1/2 px-16 py-8 hidden lg:block ms-24">
              <Image
                src={'/assets/pictures/service-type-img.png'}
                alt="Rapaz de óculos segurando papéis e apontando para algo"
                width={300}
                height={100}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className="lg:w-1/2 px-16">
              <p className={`flex flex-col pt-20 px-5 text-[3rem] font-bold text-middle-home text-gray-900`} style={{ textAlign: `${alignment ? alignment : 'start'}` }}>
                Tipos de Serviço
              </p>
              <p className={`relative max-w-[90vw] mb-8 text-[1.2rem] ml-8 mt-3`} style={{ textAlign: `${alignment ? alignment : 'start'}` }}>
                Selecione abaixo qual dos serviços gostaria de contratar para o seu evento.
              </p>

              <ul ref={formRef} className="text-[1.2rem]">
                {services.map((service) => (
                  <li
                    key={service.value}
                    style={{
                      width: '100%',
                      height: '20px',
                      borderRadius: '8px',
                    }}
                    className={`flex items-center align-center p-8 my-8 ${highContrast ? 'border-white' : 'border-[#4A7D8B]'} shadow-md border-2`}
                  >
                    <input
                      type="checkbox"
                      value={service.value} 
                      checked={selectedService.includes(service.value)} 
                      onChange={handleServiceChange} 
                      className={`mx-2 w-[1rem] date-checkbox cursor-pointer ${highContrast ? 'high-contrast' : ''}`}
                    />
                    <label style={{ textAlign: `${alignment ? alignment : 'start'}` }}>
                      {service.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className={`flex justify-center p-8`}>
          <GlobalButton
            size="large"
            type="primary"
            onClick={handleSubmit}
            text="Seguinte"
            path="/startEvent3"
            disabled={isButtonDisabled}
          />
        </div>
      </form>
    </div>
  );
};

export default StartEvent;
