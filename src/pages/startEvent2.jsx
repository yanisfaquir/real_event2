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
    setLocation,
    setMapImageUrl,
    setStartActionDate,
    setStartActionTime,
    setEndActionTime,
    setEndActionDate,
    setActionSameDay,
    setStartEnd,
    setActionServiceType,
    setActionEventType,
  } from '../redux/actions/eventActions';
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
    const formId = uuidv4();
    const dispatch = useDispatch();
    const router = useRouter();
    const location = useSelector((state) => state.event.location);
    const mapImageUrl = useSelector((state) => state.event.mapImageUrl);
  
    const [startDate, setStartDate] = useState(null);
  
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [sameDay, setSameDay] = useState(true);
    const [endDate, setEndDate] = useState(null);
  
    const [currentSection2, setCurrentSection2] = useState({
      number: 1,
      text: 'Ir à Página Informações do Evento',
    });
    const [selectedService, setSelectedService] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const formRef = useRef(null);
  
    useEffect(() => {
      const unixStartTimestamp = Math.floor(new Date().getTime() / 1000);
      const unixEndTimestamp = Math.floor(
        new Date().setHours(new Date().getHours() + 1) / 1000
      );
      const unixEndTimestampNextDay = Math.floor(
        new Date().setDate(new Date().getDate() + 1) / 1000
      );
  
      dispatch(setStartActionDate(unixStartTimestamp));
      dispatch(setStartActionTime(unixStartTimestamp));
      dispatch(setEndActionTime(unixEndTimestamp));
      dispatch(setActionSameDay(sameDay));
    }, []);
  

  
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
  
    useEffect(() => {
        if (formRef.current) {
          window.scrollTo({
         
            // top: formRef.current.offsetHeight,
            behavior: 'smooth',
          });
        }
      }, [currentSection2]);

  
    
    const handleSubmit = (e) => {

          dispatch(setActionServiceType(selectedService));


          console.error('Seção desconhecida');
        //   setCurrentSection2(prevState.number) 
      
    }
  
    const [isButtonDisabled, setButtonDisabled] = useState(true);
  
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
    }, [
      startDate,
      startTime,
      sameDay,
      endDate,
      endTime,
      selectedService,
      selectedEvent,
      currentSection2.number,
    ]);
  
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

  
          <section
            className={`event-form mt-20 lg:mt-12 event-form-2 ${currentSection2.number === 1 ? 'move-in visible h-auto' : 'move-out invisible h-0 overflow-hidden'}`}
          >
            <div className="flex flex-col lg:flex-row items-end align-end mt-10">
              <div className="lg:w-1/2 px-16 py-8 hidden lg:block ms-24">
                <Image
                  src={'/assets/pictures/service-type-img.png'}
                  alt="Rapaz de óculos segurando papéis e apontando para algo"
                  width={300}
                  height={100}
                  style={{
                      maxWidth: '100%',
                      height: '10%',
                  }}
                />
              </div>
              <div className="lg:w-1/2 px-16">
              <p
                className={`flex flex-col pt-20 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}
                style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                >
                Tipos de Serviço
                </p>
                <p
                  className={`relative max-w-[90vw] mb-8 text-[1.2rem] ml-8 mt-3`}
                  style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                >
                  Selecione abaixo qual dos serviços gostaria de contratar para o
                  seu evento.
                </p>
  
                <ul ref={formRef} className=" text-[1.2rem]">
                  <li
                    style={{
                      width: '100%',
                      height: '20px',
                      borderRadius: '8px',
                    }}
                    className={`flex items-center align-center p-8 my-8 ${highContrast ? 'border-white' : 'border-[#4A7D8B]'} shadow-md border-2`}
                  >
                    <input
                      type="checkbox"
                      value="Catering"
                      checked={selectedService.includes('Catering')}
                      onChange={handleServiceChange}
                      className={`mx-2 w-[1rem] date-checkbox cursor-pointer ${highContrast ? 'high-contrast' : ''}`}
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
                      type="checkbox"
                      value="Mechardising"
                      checked={selectedService.includes('Mechardising')}
                      onChange={handleServiceChange}
                      className={`mx-2 w-[1rem] date-checkbox cursor-pointer ${highContrast ? 'high-contrast' : ''}`}
                    />
                    <label
                      style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                    >
                      Mechandising
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
                      type="checkbox"
                      value="Espaço"
                      checked={selectedService.includes('Espaço')}
                      onChange={handleServiceChange}
                      className={`mx-2 w-[1rem] date-checkbox cursor-pointer ${highContrast ? 'high-contrast' : ''}`}
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
                      type="checkbox"
                      value="DJ"
                      checked={selectedService.includes('DJ')}
                      onChange={handleServiceChange}
                      className={`mx-2 w-[1rem] date-checkbox cursor-pointer ${highContrast ? 'high-contrast' : ''}`}
                    />
                    <label
                      style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                    >
                      DJ e Som
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
              path="/startEvent3"
              disabled={isButtonDisabled}
            />
          </div>
        </form>
      </div>
    );
  };
  export default StartEvent;
  