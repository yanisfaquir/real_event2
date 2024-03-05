import React from 'react';
import { MdMic } from 'react-icons/md';
import { parse } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useDispatch } from 'react-redux';

const SpeechRecognitionDate = ({ field, action, state }) => {
  const dispatch = useDispatch();

  const handleSpeechRecognition = () => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'pt-PT';
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`Texto falado: ${speechResult}`);

        const parsedDate = parse(
          speechResult.replace(/de /gi, ''),
          'dd MMMM yyyy',
          new Date(),
          {
            locale: pt,
          }
        );
        const dateValue = isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
        state(dateValue);
        dispatch(action(dateValue));
      };

      recognition.start();
    } catch (error) {
      console.error('Erro ao iniciar o reconhecimento de fala:', error);
    }
  };

  return (
    <button onClick={handleSpeechRecognition}>
      <MdMic style={{ cursor: 'pointer' }} />
    </button>
  );
};

export default SpeechRecognitionDate;