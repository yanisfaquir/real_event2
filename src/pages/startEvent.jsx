import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { parse } from 'date-fns';
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

export const StartEvent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const location = useSelector((state) => state.event.location);
  const mapImageUrl = useSelector((state) => state.event.mapImageUrl);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(new Date().setHours(new Date().getHours() + 1))
  );
  const [sameDay, setSameDay] = useState(true);
  const [endDate, setEndDate] = useState(
    sameDay ? null : new Date(new Date().setDate(new Date().getDate() + 1))
  );

  const [localidadeTouched, setLocationTouched] = useState(false);
  const [coordenadas, setCoordenadas] = useState({});
  const [error, setError] = useState(null);
  const [locationEvent, setEventLocation] = useState('');
  const [altLocation, setAltLocation] = useState('');
  const [isStreaming, setIsStreaming] = useState({});
  const [currentSection, setCurrentSection] = useState({
    number: 1,
    text: 'Ir à Página Inicial',
  });
  const [selectedService, setSelectedService] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    const unixStartTimestamp = Math.floor(new Date().getTime() / 1000);
    const unixEndTimestamp = Math.floor(new Date().setHours(new Date().getHours() + 1) / 1000);
    const unixEndTimestampNextDay = Math.floor(new Date().setDate(new Date().getDate() + 1) / 1000);
  
    dispatch(setStartActionDate(unixStartTimestamp));
    dispatch(setStartActionTime(unixStartTimestamp));
    dispatch(setEndActionTime(unixEndTimestamp));
    dispatch(setActionSameDay(sameDay));
  }, []);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  useEffect(() => {
    if (formRef.current) {
      window.scrollTo({
        top: formRef.current.offsetTop + formRef.current.offsetHeight,
        behavior: 'smooth',
      });
    }
  }, [currentSection]);

  const handleLocationSearch = async () => {
    dispatch(setLocation(locationEvent));
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationEvent)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setAltLocation(data[0].display_name);
        const { lat, lon } = data[0];
        setCoordenadas({ lat: parseFloat(lat), lng: parseFloat(lon) });
        dispatch(
          setMapImageUrl(
            `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lon) - 0.01}%2C${parseFloat(lat) - 0.01}%2C${parseFloat(lon) + 0.01}%2C${parseFloat(lat) + 0.01}&layer=mapnik&marker=${parseFloat(lat)}%2C${parseFloat(lon)}`
          )
        );
        setError(null);
      } else {
        setError('Localidade não encontrada');
      }
    } catch (error) {
      setError('Erro ao buscar coordenadas linha 60');
    }
  };

  const handleSpeechRecognition = (field, id) => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'pt-PT';
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsStreaming((prevState) => ({ ...prevState, [id]: true }));
      };

      recognition.onend = () => {
        setIsStreaming((prevState) => ({ ...prevState, [id]: false }));
      };

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`Texto falado para ${field}: ${speechResult}`);

        recognition.onstart = () => {
          setIsStreaming(true);
        };

        switch (field) {
          case 'location':
            setEventLocation(speechResult);
            break;
          case 'startDate':
            const parsedStartDate = parseSpeechToDate(speechResult);
            if (parsedStartDate) {
              setStartDate(parsedStartDate);
            }
            break;
          case 'startTime':
            const parsedStartTime = parseSpeechToTime(speechResult);
            if (parsedStartTime) {
              setStartTime(parsedStartTime);
            }
            break;
          case 'endTime':
            const parsedEndTime = parseSpeechToTime(speechResult);
            if (parsedEndTime) {
              setEndTime(parsedEndTime);
            }
            break;
          case 'endDate':
            const parsedEndtDate = parseSpeechToDate(speechResult);
            if (parsedEndtDate) {
              setEndDate(parsedEndtDate);
            }
            break;
          default:
            break;
        }
      };

      recognition.start();
    } catch (error) {
      console.error('Erro ao iniciar o reconhecimento de fala:', error);
    }
  };

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
        if (endTime.getTime() < startTime.getTime() + 60 * 60 * 1000) {
          setError(
            'O horário de término deve ser pelo menos uma hora após o horário de início'
          );
          return;
        }
    
        const combinedStartDateTime = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startTime.getHours(),
          startTime.getMinutes()
        );
    
        const combinedEndDateTime = new Date(
          sameDay ? startDate.getFullYear() : endDate.getFullYear(),
          sameDay ? startDate.getMonth() : endDate.getMonth(),
          sameDay ? startDate.getDate() : endDate.getDate(),
          endTime.getHours(),
          endTime.getMinutes()
        );
    
        const unixStartTimestamp = Math.floor(
          combinedStartDateTime.getTime() / 1000
        );
        const unixEndTimestamp = Math.floor(combinedEndDateTime.getTime() / 1000);
    
        dispatch(setStartActionDate(unixStartTimestamp));
        !sameDay ? dispatch(setEndActionDate(unixEndTimestamp)) : '';
        dispatch(setStartActionTime(unixStartTimestamp));
        dispatch(setEndActionTime(unixEndTimestamp));
        dispatch(setStartEnd({ start: unixStartTimestamp, end: unixEndTimestamp }));
    
        dispatch(setLocation(location));
        dispatch(setMapImageUrl(mapImageUrl));
        break;
      case 2:
        dispatch(setActionServiceType(selectedService));
        break;
        case 3:
        dispatch(setActionEventType(selectedEvent));
        router.push('/servicesResults');
        break;
      default:
        console.error('Seção desconhecida');
        break;
    }

    setCurrentSection((prevState) => ({
      number: prevState.number + 1,
      text:
        prevState.number + 1 === 2
          ? 'Retornar à página de localização e data'
          : 'Retornar à página de tipos de serviço',
    }));
  };

  const handleStartTimeChange = (time) => {
    if (endTime && time.getTime() >= endTime.getTime() - 60 * 60 * 1000) {
      setError(
        'O horário de início deve ser pelo menos uma hora antes do horário de fim'
      );
    } else {
      setError(null);
      setStartTime(time);
      dispatch(setStartActionTime(time.toISOString()));
    }
  };

  const handleEndTimeChange = (time) => {
    if (startTime && time.getTime() <= startTime.getTime() + 60 * 60 * 1000) {
      setError(
        'O horário de fim deve ser pelo menos uma hora após o horário de início'
      );
    } else {
      setError(null);
      setEndTime(time);
      dispatch(setEndActionTime(time.toISOString()));
    }
  };

  const handleEndDateChange = (date) => {
    if (date && startDate && date.getTime() < startDate.getTime()) {
      setError('A data de fim deve ser após a data de início');
    } else {
      setError(null);
      setEndDate(date);
      dispatch(setEndActionDate(date.toISOString()));
    }
  };

  const handleSameDayChange = (event) => {
    setSameDay(event.target.checked);
    setEndDate(null);
    dispatch(setActionSameDay(event.target.checked));
    if (!event.target.checked) {
      const newEndDate = new Date(new Date().setDate(startDate.getDate() + 1));
      setEndDate(newEndDate);
      dispatch(setEndActionDate(newEndDate.toISOString()));
    }
  };

  const isFormValid = location !== '' && error == null;

  return (
    <div>
      <div className="-mb-20 p-4 relative">
        <Tooltip
          anchorSelect={`#chevron-left-home-${currentSection.number}`}
          place="top"
          style={{ fontSize: '1.2em' }}
        >
          {`${currentSection.text}`}
        </Tooltip>
        {currentSection.number === 1 ? (
          <Link
            href="/"
            style={{
              cursor: 'pointer',
              zIndex: '9',
              position: 'absolute',
              top: '2rem',
              left: '2%',
            }}
          >
            <Image
              src={'/assets/icons/chevron-left-green.svg'}
              path="/"
              text={`${currentSection.text}`}
              id={`chevron-left-home-${currentSection.number}`}
              alt="chevron-left"
              width={100}
              height={80}
            />
          </Link>
        ) : (
          <Image
            src={'/assets/icons/chevron-left-green.svg'}
            onClick={() =>
              setCurrentSection((prevState) => ({
                number: prevState.number - 1,
                text:
                  prevState.number - 1 === 1
                    ? 'Ir à Página Inicial'
                    : prevState.number - 1 === 2
                      ? 'Retornar à página de localização e data'
                      : 'Retornar à página de tipos de serviço',
              }))
            }
            text={currentSection.text}
            id={`chevron-left-home-${currentSection.number}`}
            alt="chevron-left"
            width={100}
            height={80}
            style={{
              cursor: 'pointer',
              zIndex: '9',
              position: 'absolute',
              top: '2rem',
              left: '2%',
            }}
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <section
          className={`event-form mt-20 lg:mt-16 event-form-1 ${currentSection.number === 1 ? 'move-in visible h-auto' : 'move-out invisible h-0 overflow-hidden'}`}
        >
          <p className="flex flex-col text-start pt-20 px-10 text-[4rem] font-bold text-middle-home">
            Informações do Evento
          </p>
          <p className="text-black relative max-w-[90vw] text-start mb-4 px-10 text-[1.2rem]">
            Queremos saber mais sobre o teu serviço de forma a conseguirmos
            partilhar com os nossos utilizadores.
          </p>
          <section
            ref={formRef}
            className="event-form-1 shadow-md flex flex-col lg:flex-row justify-center min-h-[240px] my-8 py-8 px-4 border-[#4A7D8B] bg-white rounded-[8px] border-2 w-[90vw] mx-auto"
          >
            <div className="p-4 w-full lg:w-1/3 min-h-[180px] lg:border-r border-b lg:border-b-0 border-gray-500 relative flex justify-center align-center">
              <div className="flex flex-col justify-center align-center mx-auto">
                <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  Localidade:
                  <div className="flex row" style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={locationEvent}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="Digite aqui"
                      onFocus={() => setLocationTouched(false)}
                      onBlur={() => setLocationTouched(true)}
                      required
                      style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginTop: '5px',
                        paddingRight: '30px',
                        width: '100%',
                      }}
                    />
                    <MicrophoneIcon
                      handleSpeechRecognition={handleSpeechRecognition}
                      isStreaming={isStreaming['micLocation']}
                      id="micLocation"
                      field="location"
                      right="68"
                    />
                    <GlobalButton
                      image={'/assets/icons/search-green.svg'}
                      text="Localizar"
                      type="button"
                      id="search-location"
                      onClick={handleLocationSearch}
                    />
                  </div>
                </label>
                <p
                  className={
                    !locationEvent && localidadeTouched
                      ? 'visible'
                      : 'invisible'
                  }
                  style={{ color: 'red', marginTop: '5px' }}
                >
                  Campo obrigatório
                </p>
                <div className="flex flex-col justify-center items-center text-[1.2rem]">
                  {error?.includes('localização') ? (
                    <div>{error}</div>
                  ) : mapImageUrl ? (
                    <div>
                      <div className="max-w-[400px] text-center">
                        {altLocation}{' '}
                      </div>
                      <iframe
                        width="100%"
                        height="120"
                        src={mapImageUrl}
                        style={{ border: 0 }}
                        alt={`Mapa mostrando ao centro ${altLocation}`}
                      ></iframe>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="p-4 w-full lg:w-1/3 min-h-[180px] lg:border-r border-b lg:border-b-0 border-gray-500 relative flex flex-col justify-center align-center">
              <div className="flex flex-col justify-center mx-auto align-center py-4">
                <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  Data de Início:
                  <div className="flex row relative">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        if (date) {
                          setStartDate(date);
                          dispatch(setStartActionDate(date.toISOString()));
                        } else {
                          const now = new Date();
                          setStartDate(now);
                          dispatch(setStartActionDate(now.toISOString()));
                        }
                      }}
                      dateFormat="dd 'de' MMMM 'de' yyyy"
                      locale={pt}
                      minDate={startDate ? new Date() : null}
                      required
                      className="datePicker"
                      placeholderText="Digite aqui"
                    />
                    <MicrophoneIcon
                      handleSpeechRecognition={handleSpeechRecognition}
                      isStreaming={isStreaming['micStartDate']}
                      id="micStartDate"
                      field="startDate"
                    />
                  </div>
                </label>
                <p
                  className={!startDate ? 'visible' : 'invisible'}
                  style={{ color: 'red', marginTop: '5px' }}
                >
                  Campo obrigatório
                </p>
              </div>

              {!sameDay && (
                <div
                  className={
                    sameDay
                      ? 'flex flex-col justify-center mx-auto align-center py-4 disabled'
                      : 'flex flex-col justify-center mx-auto align-center py-4'
                  }
                >
                  <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Data de fim:
                    <div className="flex row relative">
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        minDate={
                          endDate && !sameDay
                            ? new Date(
                                new Date().setDate(startDate.getDate() + 1)
                              )
                            : ''
                        }
                        dateFormat="dd 'de' MMMM 'de' yyyy"
                        locale={pt}
                        required
                        className="datePicker"
                        placeholderText="Digite aqui"
                      />
                      <MicrophoneIcon
                        handleSpeechRecognition={handleSpeechRecognition}
                        isStreaming={isStreaming['micEndDate']}
                        id="micEndDate"
                        field="endDate"
                      />
                    </div>
                  </label>
                  <p
                    className={!endDate && !sameDay ? 'visible' : 'invisible'}
                    style={{ color: 'red', marginTop: '5px' }}
                  >
                    Campo obrigatório
                  </p>
                </div>
              )}
              <label
                className={`flex align-center justify-start mx-auto text-[1.2rem] ${!sameDay ? 'md:mb-0' : 'lg:-mb-10'}`}
              >
                Este evento acontecerá no mesmo dia:
                <input
                  type="checkbox"
                  className="mt-1 ms-1 date-checkbox cursor-pointer"
                  checked={sameDay}
                  onChange={handleSameDayChange}
                />
              </label>
            </div>
            <div className="p-4 w-full lg:w-1/3 min-h-[180px] relative flex flex-col justify-center items-center align-center">
              <div className="flex flex-col justify-center mx-auto align-center py-4 -mt-4">
                <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  Hora de Início:
                  <div className="flex row relative">
                    <DatePicker
                      selected={startTime}
                      onChange={handleStartTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      timeCaption="Horário"
                      dateFormat="HH:mm"
                      timeFormat="HH:mm"
                      className="datePicker"
                      placeholderText="Digite aqui"
                    />
                    <MicrophoneIcon
                      handleSpeechRecognition={handleSpeechRecognition}
                      isStreaming={isStreaming['micStartTime']}
                      id="micStartTime"
                      field="startTime"
                    />
                  </div>
                </label>
                <p
                  className={!startTime ? 'visible' : 'invisible'}
                  style={{ color: 'red', marginTop: '5px' }}
                >
                  Campo obrigatório
                </p>
              </div>

              <div className="flex flex-col justify-center mx-auto align-center py-4 -mt-1">
                <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  Hora de Fim:
                  <div className="flex row relative">
                    <DatePicker
                      selected={endTime}
                      onChange={handleEndTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      timeCaption="Horário"
                      dateFormat="HH:mm"
                      timeFormat="HH:mm"
                      className="datePicker"
                      placeholderText="Digite aqui"
                      minTime={
                        startTime
                          ? new Date(
                              new Date().setHours(
                                startTime.getHours() + 1,
                                startTime.getMinutes()
                              )
                            )
                          : new Date().setHours(0, 0, 0, 0)
                      }
                      maxTime={new Date().setHours(23, 59, 59, 999)}
                    />
                    <MicrophoneIcon
                      handleSpeechRecognition={handleSpeechRecognition}
                      isStreaming={isStreaming['micEndTime']}
                      id="micEndTime"
                      field="endTime"
                    />
                  </div>
                </label>
                <p
                  className={!endTime ? 'visible' : 'invisible'}
                  style={{ color: 'red', marginTop: '5px' }}
                >
                  Campo obrigatório
                </p>
              </div>
            </div>
          </section>
        </section>

        <section
          className={`event-form mt-20 lg:mt-12 event-form-2 ${currentSection.number === 2 ? 'move-in visible h-auto' : 'move-out invisible h-0 overflow-hidden'}`}
        >
          <div className="flex flex-col lg:flex-row items-center mt-10">
            <div className="lg:w-1/2 p-16 hidden lg:block ms-24">
              <Image
                src={'/assets/pictures/service-type-img.png'}
                alt="Rapaz de óculos segurando papéis e apontando para algo"
                width={500}
                height={80}
                layout="intrinsic"
              />
            </div>
            <div className="lg:w-1/2 px-16">
              <p className="flex flex-col text-start text-[4rem] font-bold text-middle-home">
                Tipos de serviços
              </p>
              <p className="text-black relative max-w-[90vw] text-start mb-8 text-[1.2rem]">
                Selecione abaixo qual o serviço gostaria de contratar para o seu
                evento.
              </p>

              <ul ref={formRef} className=" text-[1.2rem]">
                <li
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                  }}
                  className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
                >
                  <input
                    type="radio"
                    value="Catering"
                    checked={selectedService === 'Catering'}
                    onChange={handleServiceChange}
                    className="mx-2"
                  />
                  <label>Catering (descrição breve)</label>
                </li>

                <li
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                  }}
                  className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
                >
                  <input
                    type="radio"
                    value="Fotografia"
                    checked={selectedService === 'Fotografia'}
                    onChange={handleServiceChange}
                    className="mx-2"
                  />
                  <label>Fotografia (descrição breve)</label>
                </li>

                <li
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                  }}
                  className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
                >
                  <input
                    type="radio"
                    value="Espaço"
                    checked={selectedService === 'Espaço'}
                    onChange={handleServiceChange}
                    className="mx-2"
                  />
                  <label>Espaço (descrição breve)</label>
                </li>

                <li
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                  }}
                  className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
                >
                  <input
                    type="radio"
                    value="DJ"
                    checked={selectedService === 'DJ'}
                    onChange={handleServiceChange}
                    className="mx-2"
                  />
                  <label>DJ e Som (descrição breve)</label>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section
          className={`event-form event-form-3 ${currentSection.number === 3 ? 'move-in visible h-auto' : 'move-out invisible h-0 overflow-hidden'}`}
        >
          <div className="flex flex-col lg:flex-row-reverse items-center mt-10">
            <div className="lg:w-1/2 p-16 hidden ms-24 lg:block">
              <Image
                src={'/assets/pictures/event-type-img.png'}
                alt="Pessoas felizes confraternizando"
                width={500}
                height={80}
                layout="intrinsic"
              />
            </div>
            <div className="lg:w-1/2 px-16">
              <p className="flex flex-col text-start text-[4rem] font-bold text-middle-home">
                Tipos de eventos
              </p>
              <p className="text-black relative max-w-[90vw] text-start mb-8 text-[1.2rem]">
                Selecione abaixo qual o evento.
              </p>

              <ul className=" text-[1.2rem]" ref={formRef}>
                <li
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                  }}
                  className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
                >
                  <input
                    type="radio"
                    value="Jantar"
                    checked={selectedEvent === 'Jantar'}
                    onChange={handleEventChange}
                    className="mx-2"
                  />
                  <label>Jantar</label>
                </li>

                <li
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                  }}
                  className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
                >
                  <input
                    type="radio"
                    value="Cocktail"
                    checked={selectedEvent === 'Cocktail'}
                    onChange={handleEventChange}
                    className="mx-2"
                  />
                  <label>Cocktail</label>
                </li>
                <li
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                  }}
                  className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
                >
                  <input
                    type="radio"
                    value="Aniversario"
                    checked={selectedEvent === 'Aniversario'}
                    onChange={handleEventChange}
                    className="mx-2"
                  />
                  <label>Aniversário Empresa</label>
                </li>

                <li
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                  }}
                  className="flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2"
                >
                  <input
                    type="radio"
                    value="Bootcamp"
                    checked={selectedEvent === 'Bootcamp'}
                    onChange={handleEventChange}
                    className="mx-2"
                  />
                  <label>Bootcamp</label>
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
            text="SEGUINTE"
          />
        </div>
      </form>
    </div>
  );
};
