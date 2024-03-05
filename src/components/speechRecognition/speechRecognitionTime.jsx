import React from 'react';
import { MdMic } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const SpeechRecognitionTime = ({ field, action, state }) => {
 const dispatch = useDispatch();

 const handleSpeechRecognition = () => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'pt-PT';
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`Texto falado: ${speechResult}`);

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
            const timeValue = isNaN(parsedTime.getTime()) ? null : parsedTime.toISOString();
            state(timeValue);
            dispatch(action(timeValue));
          }
        }
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

export default SpeechRecognitionTime;