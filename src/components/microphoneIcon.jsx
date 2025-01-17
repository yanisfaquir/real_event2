import React, { useState, useEffect, useContext } from 'react';
import { MdMic } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { AccessibilityContext } from '@/contexts/acessibility';

const MicrophoneIcon = ({
  handleSpeechRecognition,
  isStreaming,
  id,
  field,
  right,
}) => {
  const [micId, setMicId] = useState(id);
  const { highContrast } = useContext(AccessibilityContext);

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
          color: isStreaming ? '#990000' : `${highContrast ? '#fff000' : '#007BFF'}`,
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
        place="end"
        style={{ fontSize: '1.2em', zIndex: '20', zIndex: '20' }}
      >
        Microfone
      </Tooltip>
    </>
  );
};

export default MicrophoneIcon;
