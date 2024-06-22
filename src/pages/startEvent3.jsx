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
  
    const [localidadeTouched, setLocationTouched] = useState(false);
    const [startDateTouched, setStartDateTouched] = useState(false);
    const [endDateTouched, setEndDateTouched] = useState(false);
    const [startTimeTouched, setStartTimeTouched] = useState(false);
    const [endTimeTouched, setEndTimeTouched] = useState(false);
    const [coordenadas, setCoordenadas] = useState({});
    const [errors, setErrors] = useState({});
    const [locationEvent, setEventLocation] = useState('');
    const [altLocation, setAltLocation] = useState('');
    const [isStreaming, setIsStreaming] = useState({});
    const [currentSection, setCurrentSection] = useState({
      number: 1,
      text: 'Ir à Página Inicial',
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
  
    const handleEventChange = (event) => {
      setSelectedEvent(event.target.value);
    };
  
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
       
          top: formRef.current.offsetHeight,
          behavior: 'smooth',
        });
      }
    }, [currentSection]);
  
    
  
    const parseSpeechToDate = (speechResult) => {
      try {
        const parsedDate = parse(
          speechResult.replace(/de /gi, ''),
          'dd MMMM yyyy',
          new Date(),
          {
            locale: pt,
          }
        );
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
      } catch (error) {
        console.error('Erro ao analisar data:', error);
        return null;
      }
    };
  
    const parseSpeechToTime = (speechResult) => {
      try {
        let [hours, minutes] = speechResult.split(/:|e/);
  
        if (hours && minutes) {
          hours = parseInt(hours.trim(), 10);
          minutes = parseInt(minutes.trim(), 10);
  
          if (
            Number.isInteger(hours) &&
            Number.isInteger(minutes) &&
            hours >= 0 &&
            hours <= 23 &&
            minutes >= 0 &&
            minutes <= 59
          ) {
            const parsedTime = new Date();
            parsedTime.setHours(hours, minutes, 0, 0);
            return isNaN(parsedTime.getTime()) ? null : parsedTime;
          }
        }
  
        return null;
      } catch (error) {
        console.error('Erro ao analisar hora:', error);
        return null;
      }
    };
  
    const handleSubmit = (e) => {
      switch (currentSection.number) {
        case 1:
          dispatch(setActionEventType(selectedEvent));
          router.push('/servicesResults');
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
                <p
                              className={`flex flex-col pt-20 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}

                style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                >
                Tipos de eventos
                </p>
                <p
                className="relative max-w-[90vw] mb-8 text-[1.2rem] ml-8 mt-3" 
                style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                >
                Selecione abaixo qual o evento.
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
                    value="Jantar"
                    checked={selectedEvent === 'Jantar'}
                    onChange={handleEventChange}
                    className={`mx-2 ${highContrast ? 'high-contrast' : ''}`}
                    />
                    <label
                    style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                    >
                    Jantar
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
                    value="Cocktail"
                    checked={selectedEvent === 'Cocktail'}
                    onChange={handleEventChange}
                    className={`mx-2 ${highContrast ? 'high-contrast' : ''}`}
                    />
                    <label
                    style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                    >
                    Cocktail
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
                    value="Aniversario"
                    checked={selectedEvent === 'Aniversario'}
                    onChange={handleEventChange}
                    className={`mx-2 ${highContrast ? 'high-contrast' : ''}`}
                    />
                    <label
                    style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                    >
                    Aniversário Empresa
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
                    value="Bootcamp"
                    checked={selectedEvent === 'Bootcamp'}
                    onChange={handleEventChange}
                    className={`mx-2 ${highContrast ? 'high-contrast' : ''}`}
                    />
                    <label
                    style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                    >
                    Bootcamp
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
  