import { useState, useEffect, useContext } from 'react';
import { AccessibilityContext } from '@/contexts/acessibility';

const GlobalInput = ({ label, value, required, onChange, type }) => {
  const [inputValue, setInputValue] = useState(value);
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);
  const { alignment, highContrast } = useContext(AccessibilityContext);
  const [isValidEmail, setIsValidEmail] = useState(true);

  useEffect(() => {
    setShowRequiredMessage(false);
  }, [inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);

    if (type == 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value !== '') {
        setIsValidEmail(emailRegex.test(value));
      }
    }
  };

  const handleInputBlur = () => {
    if (required && inputValue.trim() === '') {
      setShowRequiredMessage(true);
    }
  };

  return (
    <label
      style={{
        textAlign: `${alignment ? alignment : 'start'}`,
      }}
      className="text-xl md:text-2xl font-bold"
    >
      {label}:
      <div className="flex flex-col" style={{ position: 'relative' }}>
        <input
          type={`${type ? type : 'text'}`}
          value={inputValue}
          className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === 'Space') {
              e.preventDefault();
              handleInputChange();
            }
          }}
          placeholder="Digite aqui"
          required={required}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginTop: '5px',
            paddingRight: '30px',
            width: '100%',
          }}
        />
        {!isValidEmail && (
          <p
            className={` ${'text-red-600 mt-1'}`}
            style={{
              fontSize: '16px',
              marginTop: '4px',
              textAlign: `${alignment ? alignment : 'start'}`,
            }}
          >
            Insira um email válido
          </p>
        )}
        <p
          className={` ${
            required && showRequiredMessage
              ? 'visible text-red-600'
              : 'invisible'
          }`}
          style={{
            marginTop: `${required && showRequiredMessage ? '4px' : ''}`,
            fontSize: '16px',
            textAlign: `${alignment ? alignment : 'start'}`,
          }}
        >
          Campo obrigatório
        </p>
      </div>
    </label>
  );
};

export default GlobalInput;
