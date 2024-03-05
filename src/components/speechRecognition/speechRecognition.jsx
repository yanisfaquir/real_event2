import React from 'react';
import { MdMic } from 'react-icons/md';
import { parse } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useDispatch } from 'react-redux';

const SpeechRecognition = ({ type, field, actions }) => {
  const dispatch = useDispatch();

  const handleSpeechRecognition = () => {
    console.log(type, field, actions[field]);
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'pt-PT';
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`Texto falado: ${speechResult}`);

        let parsedValue;
        switch (type) {
          case 'date':
            parsedValue = parseSpeechToDate(speechResult);
            break;
          case 'time':
            parsedValue = parseSpeechToTime(speechResult);
            break;
          default:
            parsedValue = speechResult;
            break;
        }
        Object.entries(actions).forEach(([key, action]) => {
          if (key === field) {
            dispatch(action(parsedValue));
          } else {
            console.error(`Ação não encontrada para o campo: ${field}`);
          }
        });
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

  return (
    <button onClick={handleSpeechRecognition}>
      <MdMic style={{ cursor: 'pointer' }} />
    </button>
  );
};

export default SpeechRecognition;
