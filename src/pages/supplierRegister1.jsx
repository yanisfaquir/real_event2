import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useContext,
} from 'react';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, isBefore, endOfDay } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActionServiceType,
} from '../redux/actions/supplierActions';
import GlobalButton from '@/components/globalButton';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import Image from 'next/image';
import MicrophoneIcon from '@/components/microphoneIcon';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { AccessibilityContext } from '@/contexts/acessibility';

const StartEvent = () => {

  const { alignment, highContrast } = useContext(AccessibilityContext);

  const dispatch = useDispatch();
  const router = useRouter();

  const [startDate, setStartDate] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [sameDay, setSameDay] = useState(true);
  const [endDate, setEndDate] = useState(null);


  const [locationEvent, setEventLocation] = useState('');
  const [currentSection, setCurrentSection] = useState({
    number: 1,
    text: 'Ir à Página Inicial',
  });
  const [selectedService, setSelectedService] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const formRef = useRef(null);



  useEffect(() => {
      if (formRef.current) {
        window.scrollTo({
       
          // top: formRef.current.offsetHeight,
          behavior: 'smooth',
        });
      }
    }, [currentSection]);

  

  
    const handleEventChange = (event) => {
      setSelectedEvent(event.target.value);
    };


  
  const handleSubmit = (e) => {
    switch (currentSection.number) {
      case 1:
        dispatch(setActionServiceType(selectedEvent));
        router.push('/supplierRegister2');
        break;
      default:
        console.error('Seção desconhecida');
        break;
    }

    setCurrentSection((prevState) => ({
      number: prevState.number ,
      text:
        prevState.number + 1 === 2
          ? 'Retornar à página de localização e data'
          : 'Retornar à página de tipos de serviço',
    }));
  };



  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const isValid = () => {
      switch (currentSection.number) {
        case 1:
          return selectedEvent && selectedEvent.length > 0;
        default:
          return false;
      }
    };

    setButtonDisabled(!isValid());
  }, [
    locationEvent,
    startDate,
    startTime,
    sameDay,
    endDate,
    endTime,
    selectedService,
    selectedEvent,
    currentSection.number,
  ]);

  return (
    <div className="w-[90vw] mx-auto mt-20">
      <div className="-mb-20 row p-4 relative">
        <div className="lg:block hidden">
          <Tooltip
            anchorSelect={`#chevron-left-home-${currentSection.number}`}
            place="right"
            style={{ fontSize: '1.2em' }}
          >
            {`${currentSection.text}`}
          </Tooltip>
        </div>
        {currentSection.number === 1 ? (
          <Link
            href="/startEvent2"
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
              text={`${currentSection.text}`}
              id={`chevron-left-home-${currentSection.number}`}
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
              setCurrentSection((prevState) => ({
                number: prevState.number - 1,
                text:
                  prevState.number - 1 === 1
                    ? 'Ir à Tipos de serviços'
                    : prevState.number - 1 === 2
                      ? 'Retornar à página de localização e data'
                      : 'Retornar à página de tipos de serviço',
              }))
            }
            text={currentSection.text}
            id={`chevron-left-home-${currentSection.number}`}
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


      <section
          className={`event-form mt-20 lg:mt-16 event-form-1 ${currentSection.number === 1 ? 'move-in visible h-auto' : 'move-out invisible h-0 overflow-hidden'}`}

          >
          <div className="flex flex-col lg:flex-row-reverse items-end align-end mt-15">
          <div className="lg:w-1/2 px-16 py-8 hidden ms-24 lg:block">
              <Image
              src={'/assets/pictures/event-type-img.png'}
              alt="Pessoas felizes confraternizando"
              width={300}
              height={100}
              style={{
                  maxWidth: '100%',
                  height: '10%',
              }}
              />
          </div>
          <div className="lg:w-1/2 px-16">
              <p className={`flex flex-col pt-20 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}
              style={{ textAlign: `${alignment ? alignment : 'start'}` }}
              >
              Tipo de Serviço
              </p>
              <p
              className="relative max-w-[90vw] mb-8 text-[1.2rem] ml-8 mt-3" 
              style={{ textAlign: `${alignment ? alignment : 'start'}` }}
              >
              Selecione abaixo qual a categoria do serviço o qual gostaria de anunciar na nossa plataforma.
              </p>

              <ul className=" text-[1.2rem]" ref={formRef}>
              <li
                  style={{
                  width: '100%',
                  height: '20px',
                  borderRadius: '8px',
                  }}
                  className={`flex items-center align-center p-8 my-8 ${highContrast ? 'border-white' : 'border-[#4A7D8B]'} shadow-md border-2`}
              >
                  <input
                  type="radio"
                  value="Catering"
                  checked={selectedEvent === 'Catering'}
                  onChange={handleEventChange}
                  className={`mx-2 ${highContrast ? 'high-contrast' : ''}`}
                  />
                  <label
                  style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                  >
                  Catering
                  </label>
              </li>

              <li
                  style={{
                  width: '100%',
                  height: '20px',
                  borderRadius: '8px',
                  }}
                  className={`flex items-center align-center p-8 my-8 ${highContrast ? 'border-white' : 'border-[#4A7D8B]'} shadow-md border-2`}
              >
                  <input
                  type="radio"
                  value="Espaço"
                  checked={selectedEvent === 'Espaço'}
                  onChange={handleEventChange}
                  className={`mx-2 ${highContrast ? 'high-contrast' : ''}`}
                  />
                  <label
                  style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                  >
                  Espaço
                  </label>
              </li>
              <li
                  style={{
                  width: '100%',
                  height: '20px',
                  borderRadius: '8px',
                  }}
                  className={`flex items-center align-center p-8 my-8 ${highContrast ? 'border-white' : 'border-[#4A7D8B]'} shadow-md border-2`}
              >
                  <input
                  type="radio"
                  value="DJ"
                  checked={selectedEvent === 'DJ'}
                  onChange={handleEventChange}
                  className={`mx-2 ${highContrast ? 'high-contrast' : ''}`}
                  />
                  <label
                  style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                  >
                  DJ
                  </label>
              </li>

              <li
                  style={{
                  width: '100%',
                  height: '20px',
                  borderRadius: '8px',
                  }}
                  className={`flex items-center align-center p-8 my-8 ${highContrast ? 'border-white' : 'border-[#4A7D8B]'} shadow-md border-2`}
              >
                  <input
                  type="radio"
                  value="Merchandising"
                  checked={selectedEvent === 'Merchandising'}
                  onChange={handleEventChange}
                  className={`mx-2 ${highContrast ? 'high-contrast' : ''}`}
                  />
                  <label
                  style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                  >
                  Merchandising
                  </label>
              </li>
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
            disabled={isButtonDisabled}
          />
        </div>
       
      </form>
    </div>
  );
};
export default StartEvent;
