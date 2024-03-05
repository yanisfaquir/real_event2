// SpeechRecognitionString.js
import React from 'react';
import { MdMic } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const SpeechRecognitionString = ({ action }) => {
 const dispatch = useDispatch();

 const handleSpeechRecognition = () => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'pt-PT';
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`Texto falado: ${speechResult}`);
        dispatch(action(speechResult)); // Despacha a ação com o valor analisado
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

export default SpeechRecognitionString;