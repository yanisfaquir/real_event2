import React, { useState, useEffect } from 'react';
import { MdMic } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

const MicrophoneIcon = ({ handleSpeechRecognition, isStreaming, id, field, right }) => {
  const [micId, setMicId] = useState(id);

  useEffect(() => {
    if (isStreaming) {
      setMicId(`${id}-streaming`);
    } else {
      setMicId(id);
    }
  }, [isStreaming, id]);

  return (
    <>
      <MdMic
        onClick={() => handleSpeechRecognition(field, id)}
        style={{
          cursor: 'pointer',
          color: isStreaming ? 'red' : '#007BFF',
          transform: 'translateY(-50%)',
          zIndex: 9,
          transition: 'all 0.2s ease-in-out',
          transform: 'translateY(-50%)',
          position: 'absolute',
          top: '54%',
          right: `${right ? right : 10}px`,
        }}
        size={24}
        id={micId}
        className={isStreaming ? 'streaming' : 'mic-icon'}
      />
      <Tooltip
        anchorSelect={`#${micId}`}
        place="top"
        style={{ fontSize: '1.2em', zIndex: '20', zIndex: '20' }}
      >
        Microfone
      </Tooltip>
    </>
  );
};

export default MicrophoneIcon;