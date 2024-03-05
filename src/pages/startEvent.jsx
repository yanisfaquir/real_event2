// import React, { useState, useEffect, useRef } from 'react';
// import DatePicker from 'react-datepicker';
// import pt from 'date-fns/locale/pt';
// import 'react-datepicker/dist/react-datepicker.css';
// import { MdMic } from 'react-icons/md';
// import { parse } from 'date-fns';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   setLocation,
//   setMapImageUrl,
//   setStartActionDate,
//   setStartActionTime,
//   setEndActionTime,
//   setEndActionDate,
//   setActionSameDay,
//   setStartEnd,
// } from '../redux/actions/eventActions';
// import GlobalButton from '@/components/globalButton';

// export const StartEvent = () => {
//   const dispatch = useDispatch();
//   const location = useSelector((state) => state.event.location);
//   const mapImageUrl = useSelector((state) => state.event.mapImageUrl);

//   const [startDate, setStartDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(new Date());
//   const [endTime, setEndTime] = useState(
//     new Date(new Date().setHours(new Date().getHours() + 1))
//   );

//   const [sameDay, setSameDay] = useState(true);
//   const [endDate, setEndDate] = useState(
//     sameDay ? null : new Date(new Date().setDate(new Date().getDate() + 1))
//   );

//   const [localidadeTouched, setLocationTouched] = useState(false);
//   const [coordenadas, setCoordenadas] = useState({});
//   const [error, setError] = useState(null);
//   const [altLocation, setAltLocation] = useState('');

//   const handleLocationSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
//       );
//       const data = await response.json();
//       if (data.length > 0) {
//         setAltLocation(data[0].display_name);
//         const { lat, lon } = data[0];
//         setCoordenadas({ lat: parseFloat(lat), lng: parseFloat(lon) });
//         dispatch(
//           setMapImageUrl(
//             `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lon) - 0.01}%2C${parseFloat(lat) - 0.01}%2C${parseFloat(lon) + 0.01}%2C${parseFloat(lat) + 0.01}&layer=mapnik&marker=${parseFloat(lat)}%2C${parseFloat(lon)}`
//           )
//         );
//         setError(null);
//       } else {
//         setError('Localidade não encontrada');
//       }
//     } catch (error) {
//       setError('Erro ao buscar coordenadas linha 60');
//     }
//   };

//   const handleSpeechRecognition = (field) => {
//     try {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = 'pt-PT';
//       recognition.interimResults = true;

//       recognition.onresult = (event) => {
//         const speechResult = event.results[0][0].transcript;
//         console.log(`Texto falado para ${field}: ${speechResult}`);

//         recognition.onstart = () => {
//           setIsStreaming(true);
//         };

//         switch (field) {
//           case 'location':
//             dispatch(setLocation(speechResult));
//             break;
//           case 'startDate':
//             const parsedStartDate = parseSpeechToDate(speechResult);
//             if (parsedStartDate) {
//               setStartDate(parsedStartDate);
//               dispatch(setStartActionDate(parsedStartDate.toISOString()));
//             }
//             break;
//           case 'startTime':
//             const parsedStartTime = parseSpeechToTime(speechResult);
//             if (parsedStartTime) {
//               setStartTime(parsedStartTime);
//               dispatch(setStartActionTime(parsedStartTime.toISOString()));
//             }
//             break
//           case 'endTime':
//             const parsedEndTime = parseSpeechToTime(speechResult);
//             if (parsedEndTime) {
//               setEndTime(parsedEndTime);
//               dispatch(setEndActionTime(parsedEndTime.toISOString()));
//             }
//             break;
//           case 'endDate':
//             const parsedEndtDate = parseSpeechToDate(speechResult);
//             if (parsedEndtDate) {
//               setEndDate(parsedEndtDate);
//               dispatch(setEndActionDate(parsedEndtDate.toISOString()));
//             }
//             break;
//           default:
//             break;
//         }
//       };

//       recognition.start();
//     } catch (error) {
//       console.error('Erro ao iniciar o reconhecimento de fala:', error);
//     }
//   };

//   const parseSpeechToDate = (speechResult) => {
//     try {
//       const parsedDate = parse(
//         speechResult.replace(/de /gi, ''),
//         'dd MMMM yyyy',
//         new Date(),
//         {
//           locale: pt,
//         }
//       );
//       return isNaN(parsedDate.getTime()) ? null : parsedDate;
//     } catch (error) {
//       console.error('Erro ao analisar data:', error);
//       return null;
//     }
//   };

//   const parseSpeechToTime = (speechResult) => {
//     try {
//       let [hours, minutes] = speechResult.split(/:|e/);

//       if (hours && minutes) {
//         hours = parseInt(hours.trim(), 10);
//         minutes = parseInt(minutes.trim(), 10);

//         if (
//           Number.isInteger(hours) &&
//           Number.isInteger(minutes) &&
//           hours >= 0 &&
//           hours <= 23 &&
//           minutes >= 0 &&
//           minutes <= 59
//         ) {
//           const parsedTime = new Date();
//           parsedTime.setHours(hours, minutes, 0, 0);
//           return isNaN(parsedTime.getTime()) ? null : parsedTime;
//         }
//       }

//       return null;
//     } catch (error) {
//       console.error('Erro ao analisar hora:', error);
//       return null;
//     }
//   };

//   const handleSubmit = (e) => {
//     //e.preventDefault();

//     if (endTime.getTime() < startTime.getTime() + 60 * 60 * 1000) {
//       setError(
//         'O horário de término deve ser pelo menos uma hora após o horário de início'
//       );
//       return;
//     }

//     const combinedStartDateTime = new Date(
//       startDate.getFullYear(),
//       startDate.getMonth(),
//       startDate.getDate(),
//       startTime.getHours(),
//       startTime.getMinutes()
//     );

//     const combinedEndDateTime = new Date(
//       sameDay ? startDate.getFullYear() : endDate.getFullYear(),
//       sameDay ? startDate.getMonth() : endDate.getMonth(),
//       sameDay ? startDate.getDate() : endDate.getDate(),
//       endTime.getHours(),
//       endTime.getMinutes()
//     );

//     const unixStartTimestamp = Math.floor(
//       combinedStartDateTime.getTime() / 1000
//     );
//     const unixEndTimestamp = Math.floor(combinedEndDateTime.getTime() / 1000);

//     dispatch(setStartActionDate(unixStartTimestamp));
//     !sameDay ? dispatch(setEndActionDate(unixEndTimestamp)) : '';
//     dispatch(setStartActionTime(unixStartTimestamp));
//     dispatch(setEndActionTime(unixEndTimestamp));
//     dispatch(setStartEnd({ start: unixStartTimestamp, end: unixEndTimestamp }));

//     dispatch(setLocation(location));
//     dispatch(setMapImageUrl(mapImageUrl));
//   };

//   const handleStartTimeChange = (time) => {
//     if (endTime && time.getTime() >= endTime.getTime() - 60 * 60 * 1000) {
//       setError(
//         'O horário de início deve ser pelo menos uma hora antes do horário de fim'
//       );
//     } else {
//       setError(null);
//       setStartTime(time);
//       dispatch(setStartActionTime(time.toISOString()));
//     }
//   };

//   const handleEndTimeChange = (time) => {
//     if (startTime && time.getTime() <= startTime.getTime() + 60 * 60 * 1000) {
//       setError(
//         'O horário de fim deve ser pelo menos uma hora após o horário de início'
//       );
//     } else {
//       setError(null);
//       setEndTime(time);
//       dispatch(setEndActionTime(time.toISOString()));
//     }
//   };

//   // const handleStartTimeChange = (time) => {
//   //   if (
//   //     time &&
//   //     endTime &&
//   //     time.getTime() >= endTime.getTime() - 60 * 60 * 1000
//   //   ) {
//   //     setError(
//   //       'O horário de início deve ser pelo menos uma hora antes do horário de fim'
//   //     );
//   //   } else {
//   //     setError(null);
//   //     setStartTime(time);
//   //     dispatch(setStartActionTime(time));
//   //   }
//   // };

//   // const handleEndTimeChange = (time) => {
//   //   if (
//   //     time &&
//   //     startTime &&
//   //     time.getTime() <= startTime.getTime() + 60 * 60 * 1000
//   //   ) {
//   //     setError(
//   //       'O horário de fim deve ser pelo menos uma hora após o horário de início'
//   //     );
//   //   } else {
//   //     setError(null);
//   //     setEndTime(time);
//   //     dispatch(setEndActionTime(time));
//   //   }
//   // };

//   const handleEndDateChange = (date) => {
//     if (date && startDate && date.getTime() < startDate.getTime()) {
//       setError('A data de fim deve ser após a data de início');
//     } else {
//       setError(null);
//       setEndDate(date);
//       dispatch(setEndActionDate(date.toISOString()));
//     }
//   };

//   const handleSameDayChange = (event) => {
//     setSameDay(event.target.checked);
//     setEndDate(null);
//     dispatch(setActionSameDay(event.target.checked));
//     if (!event.target.checked) {
//       setEndDate(new Date(new Date().setDate(startDate.getDate() + 1)));
//     }
//   };

//   const isFormValid = location !== '' && error == null;

//   return (
//     <div>
//       <p className="flex flex-col text-start pt-20 px-10 text-[4rem] font-bold text-middle-home">
//         Informações do Evento
//       </p>
//       <p className="text-black relative max-w-[90vw] text-start mb-4 px-10 text-[1.2rem]">
//         Queremos saber mais sobre o teu serviço de forma a conseguirmos
//         partilhar com os nossos utilizadores.
//       </p>

//       <form onSubmit={handleSubmit}>
//         <section className="shadow-md flex flex-col lg:flex-row justify-center min-h-[240px] my-8 py-8 px-4 border-[#4A7D8B] bg-white rounded-[8px] border-2 w-[90vw] mx-auto">
//           <div className="p-4 w-full lg:w-1/3 min-h-[180px] lg:border-r border-b lg:border-b-0 border-gray-500 relative flex justify-center align-center">
//             <div className="flex flex-col justify-center align-center mx-auto">
//               <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                 Localidade:
//                 <div className="flex row" style={{ position: 'relative' }}>
//                   <input
//                     type="text"
//                     value={location}
//                     onChange={(e) => dispatch(setLocation(e.target.value))}
//                     placeholder="Digite aqui"
//                     onFocus={() => setLocationTouched(false)}
//                     onBlur={() => setLocationTouched(true)}
//                     required
//                     style={{
//                       padding: '10px',
//                       borderRadius: '5px',
//                       border: '1px solid #ccc',
//                       marginTop: '5px',
//                       paddingRight: '30px',
//                       width: '100%',
//                     }}
//                   />
//                   <MdMic
//                     onClick={() => handleSpeechRecognition('location')}
//                     style={{
//                       cursor: 'pointer',
//                       color: '#007BFF',
//                       position: 'absolute',
//                       top: '54%',
//                       right: '68px',
//                       transform: 'translateY(-50%)',
//                       zIndex: 9,
//                     }}
//                     size={24}
//                   />

//                   <GlobalButton
//                     image={'/assets/icons/search-green.svg'}
//                     text="Localizar"
//                     type="button"
//                     id="search-location"
//                     onClick={handleLocationSearch}
//                   />
//                 </div>
//               </label>
//               <p
//                 className={
//                   !location && localidadeTouched ? 'visible' : 'invisible'
//                 }
//                 style={{ color: 'red', marginTop: '5px' }}
//               >
//                 Campo obrigatório
//               </p>
//               <div className="flex flex-col justify-center items-center text-[1.2rem]">
//                 {error?.includes('localização') ? (
//                   <div>{error}</div>
//                 ) : mapImageUrl ? (
//                   <div>
//                     <div className="max-w-[400px] text-center">
//                       {altLocation}{' '}
//                     </div>
//                     <iframe
//                       width="100%"
//                       height="120"
//                       src={mapImageUrl}
//                       style={{ border: 0 }}
//                       alt={`Mapa mostrando ao centro ${altLocation}`}
//                     ></iframe>
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//           <div className="p-4 w-full lg:w-1/3 min-h-[180px] lg:border-r border-b lg:border-b-0 border-gray-500 relative flex flex-col justify-center align-center">
//             <div className="flex flex-col justify-center mx-auto align-center py-4">
//               <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                 Data de Início:
//                 <div className="flex row relative">
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(date) => {
//                       setStartDate(date);
//                       dispatch(setStartActionDate(date.toISOString()));
//                     }}
//                     dateFormat="dd 'de' MMMM 'de' yyyy"
//                     locale={pt}
//                     minDate={startDate ? new Date() : null}
//                     required
//                     className="datePicker"
//                     placeholderText="Digite aqui"
//                   />
//                   <MdMic
//                     onClick={() => handleSpeechRecognition('startDate')}
//                     style={{
//                       cursor: 'pointer',
//                       color: '#007BFF',
//                       position: 'absolute',
//                       top: '54%',
//                       right: '10px',
//                       transform: 'translateY(-50%)',
//                       zIndex: 9,
//                     }}
//                     size={24}
//                   />
//                 </div>
//               </label>
//               <p
//                 className={!startDate ? 'visible' : 'invisible'}
//                 style={{ color: 'red', marginTop: '5px' }}
//               >
//                 Campo obrigatório
//               </p>
//             </div>

//             {!sameDay && (
//               <div
//                 className={
//                   sameDay
//                     ? 'flex flex-col justify-center mx-auto align-center py-4 disabled'
//                     : 'flex flex-col justify-center mx-auto align-center py-4'
//                 }
//               >
//                 <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                   Data de fim:
//                   <div className="flex row relative">
//                     <DatePicker
//                       selected={endDate}
//                       onChange={handleEndDateChange}
//                       minDate={
//                         endDate && !sameDay
//                           ? new Date(
//                               new Date().setDate(startDate.getDate() + 1)
//                             )
//                           : ''
//                       }
//                       dateFormat="dd 'de' MMMM 'de' yyyy"
//                       locale={pt}
//                       required
//                       className="datePicker"
//                       placeholderText="Digite aqui"
//                     />
//                     <MdMic
//                       onClick={() => handleSpeechRecognition('endDate')}
//                       style={{
//                         cursor: 'pointer',
//                         color: '#007BFF',
//                         position: 'absolute',
//                         top: '54%',
//                         right: '10px',
//                         transform: 'translateY(-50%)',
//                         zIndex: 9,
//                       }}
//                       size={24}
//                     />
//                   </div>
//                 </label>
//                 <p
//                   className={!endDate && !sameDay ? 'visible' : 'invisible'}
//                   style={{ color: 'red', marginTop: '5px' }}
//                 >
//                   Campo obrigatório
//                 </p>
//               </div>
//             )}
//             <label
//               className={`flex align-center justify-start mx-auto text-[1.2rem] ${!sameDay ? 'md:mb-0' : 'lg:-mb-10'}`}
//             >
//               Este evento acontecerá no mesmo dia:
//               <input
//                 type="checkbox"
//                 className="mt-1 ms-1 date-checkbox"
//                 checked={sameDay}
//                 onChange={handleSameDayChange}
//               />
//             </label>
//           </div>

//           {/* <div className="p-4 w-full lg:w-1/3 min-h-[180px] relative flex flex-col justify-center items-center align-center">
//             <div className="flex flex-col justify-center mx-auto align-center py-4 -mt-4">
//               <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                 Hora de Início:
//                 <div className="flex row relative">
//                   <DatePicker
//                     selected={startTime}
//                     onChange={handleStartTimeChange}
//                     showTimeSelect
//                     showTimeSelectOnly
//                     timeIntervals={1}
//                     timeCaption="Horário"
//                     dateFormat="HH:mm"
//                     timeFormat="HH:mm"
//                     className="datePicker"
//                     placeholderText="Digite aqui"
//                   />
//                   <MdMic
//                     onClick={() => handleSpeechRecognition('startTime')}
//                     style={{
//                       cursor: 'pointer',
//                       color: '#007BFF',
//                       position: 'absolute',
//                       top: '54%',
//                       right: '10px',
//                       transform: 'translateY(-50%)',
//                       zIndex: 9,
//                     }}
//                     size={24}
//                   />
//                 </div>
//                 <p
//                   className={!startTime ? 'visible' : 'invisible'}
//                   style={{ color: 'red', marginTop: '5px' }}
//                 >
//                   Campo obrigatório
//                 </p>
//               </label>
//             </div>

//             <div className="flex flex-col justify-center mx-auto align-center py-4 -mt-1">
//               <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                 Hora de Fim:
//                 <div className="flex row relative">
//                   <DatePicker
//                     selected={endTime}
//                     onChange={handleEndTimeChange}
//                     showTimeSelect
//                     showTimeSelectOnly
//                     timeIntervals={1}
//                     timeCaption="Horário"
//                     dateFormat="HH:mm"
//                     timeFormat="HH:mm"
//                     className="datePicker"
//                     placeholderText="Digite aqui"
//                     minTime={
//                       endTime ? new Date(
//                         new Date().setHours(
//                           startTime.getHours() + 1,
//                           startTime.getMinutes()
//                         )
//                       ) : null
//                     }
//                     maxTime={new Date().setHours(23, 59, 59, 999)}
//                   />
//                   <MdMic
//                     onClick={() => handleSpeechRecognition('endTime')}
//                     style={{
//                       cursor: 'pointer',
//                       color: '#007BFF',
//                       position: 'absolute',
//                       top: '54%',
//                       right: '10px',
//                       transform: 'translateY(-50%)',
//                       zIndex: 9,
//                     }}
//                     size={24}
//                   />
//                 </div>
//                 <p
//                   className={!endTime ? 'visible' : 'invisible'}
//                   style={{ color: 'red', marginTop: '5px' }}
//                 >
//                   Campo obrigatório
//                 </p>
//               </label>
//             </div>
//           </div> */}
//           <div className="p-4 w-full lg:w-1/3 min-h-[180px] relative flex flex-col justify-center items-center align-center">
//             <div className="flex flex-col justify-center mx-auto align-center py-4 -mt-4">
//               <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                 Hora de Início:
//                 <div className="flex row relative">
//                   <DatePicker
//                     selected={startTime}
//                     onChange={handleStartTimeChange}
//                     showTimeSelect
//                     showTimeSelectOnly
//                     timeIntervals={1}
//                     timeCaption="Horário"
//                     dateFormat="HH:mm"
//                     timeFormat="HH:mm"
//                     className="datePicker"
//                     placeholderText="Digite aqui"
//                   />
//                   <MdMic
//                     onClick={() => handleSpeechRecognition('startTime')}
//                     style={{
//                       cursor: 'pointer',
//                       color: '#007BFF',
//                       position: 'absolute',
//                       top: '54%',
//                       right: '10px',
//                       transform: 'translateY(-50%)',
//                       zIndex: 9,
//                     }}
//                     size={24}
//                   />
//                 </div>
//               </label>
//               <p
//                 className={!startTime ? 'visible' : 'invisible'}
//                 style={{ color: 'red', marginTop: '5px' }}
//               >
//                 Campo obrigatório
//               </p>
//             </div>

//             <div className="flex flex-col justify-center mx-auto align-center py-4 -mt-1">
//               <label style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                 Hora de Fim:
//                 <div className="flex row relative">
//                   <DatePicker
//                     selected={endTime}
//                     onChange={handleEndTimeChange}
//                     showTimeSelect
//                     showTimeSelectOnly
//                     timeIntervals={1}
//                     timeCaption="Horário"
//                     dateFormat="HH:mm"
//                     timeFormat="HH:mm"
//                     className="datePicker"
//                     placeholderText="Digite aqui"
//                     minTime={
//                       startTime
//                         ? new Date(
//                             new Date().setHours(
//                               startTime.getHours() + 1,
//                               startTime.getMinutes()
//                             )
//                           )
//                         : new Date().setHours(0, 0, 0, 0)
//                     }
//                     maxTime={new Date().setHours(23, 59, 59, 999)}
//                   />
//                   <MdMic
//                     onClick={() => handleSpeechRecognition('endTime')}
//                     style={{
//                       cursor: 'pointer',
//                       color: '#007BFF',
//                       position: 'absolute',
//                       top: '54%',
//                       right: '10px',
//                       transform: 'translateY(-50%)',
//                       zIndex: 9,
//                     }}
//                     size={24}
//                   />
//                 </div>
//               </label>
//               <p
//                 className={!endTime ? 'visible' : 'invisible'}
//                 style={{ color: 'red', marginTop: '5px' }}
//               >
//                 Campo obrigatório
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* <p className="text-black relative mx-auto max-w-[850px] text-center text-[1.2rem]">
//         Atualmente, estamos atendendo apenas no distrito de Aveiro, por favor,
//         escolha uma localidade dentro dos limites desse distrito
//       </p> */}

//         <div className="flex justify-center">
//           <GlobalButton
//             size="large"
//             type="primary"
//             path="/start-event/step-service"
//             onClick={handleSubmit}
//             text="SEGUINTE"
//           />
//         </div>

//         {/* <button type="submit" disabled={!isFormValid}>
//           Enviar
//         </button> */}
//       </form>
//     </div>
//   );
// };

import React from 'react';
import { useRouter } from 'next/router';
import BeginEvent from '@/components/startEvent/beginEvent';

const StartEvent = () => {
  const router = useRouter();

  if (router.pathname.startsWith('/start-event/begin')) {
    return <BeginEvent />;
  }

  return null;
};

export default StartEvent;