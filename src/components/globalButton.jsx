import React, {useContext} from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Tooltip } from 'react-tooltip';
import { AccessibilityContext } from '@/contexts/acessibility';

const GlobalButton = ({
  size = 'medium',
  type = 'primary',
  path,
  onClick,
  text,
  customElements,
  image,
  id,
  width,
  disabled = false,
  customClass = '',
}) => {
  const { highContrast } = useContext(AccessibilityContext);
  const buttonSizes = {
    small: 'py-1 px-2 text-1xl min-w-32',
    medium: 'py-2 px-3 text-2xl min-w-40',
    large: 'py-3 px-3 text-3xl min-w-44',
    custom: 'py-4 px-4',
  };

  const buttonColors = {
    primary: `${highContrast ? 'bg-[#fff000] text-black hover:bg-[#878787]' : 'bg-[#4A7D8B] text-white hover:bg-[#3B6D7A]' }`,
    secondary: `${highContrast ? 'bg-black text-[#fff000] hover:bg-[#878787]' : 'bg-white text-black hover:bg-[#C8C8C8]'}`,
    terciary: `${highContrast ? 'bg-[#fff000] text-black hover:bg-[#878787]' : 'bg-[#FFA451] text-white hover:bg-[#E59441]'}`,
    custom: `${highContrast ? 'bg-black text-[#fff000] hover:bg-[#878787]' : 'bg-transparent text-white hover:bg-[#f2EBEB]/[.3]'}`,
  };

  const buttonStyle = `rounded-[50px] focus:outline-none font-bold transition-all object-cover transition duration-300 ${width ? `w-[${width}%]` : ''} ${buttonSizes[size]} ${buttonColors[type]} ${disabled ? 'filter contrast-50 cursor-not-allowed' : ''}`;

  const handleClick = (event) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event) => {
    if (!disabled && (event.code === 'Enter' || event.code === 'Space')) {
      event.preventDefault();
      handleClick(event);
    }
  };

  return <>
    <Tooltip
      anchorSelect={`#${id}`}
      place="bottom"
      style={{ fontSize: '1.2em', outline: '2px solid white' }}
    >
      {text}
    </Tooltip>
    {image ? (
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={text}
        className={`transition duration-300 hover:scale-125 mx-4 ${customClass ? customClass : ''}`}
        id={id}
        type="button"
      >
        {path ? (
          <Link href={path}>
            <Image
              src={image}
              alt={text}
              width={width ? width : 26}
              height={26}
              style={{
                maxWidth: `${customClass ? '' : '100%'}`,
                height: `${customClass ? `${width}px` : 'auto'}`,
                width: `${customClass ? `${width}px` : ''}`,
              }} />
          </Link>
        ) : (
          <Image
            src={image}
            alt={text}
            width={width ? width : 26}
            height={26}
            style={{
              maxWidth: `${customClass ? '' : '100%'}`,
              height: `${customClass ? `${width}px` : 'auto'}`,
              width: `${customClass ? `${width}px` : ''}`,
            }} />
        )}
      </button>
    ) : (
      <>
        {path ? (
          <Link href={path}>
            <button
              className={buttonStyle}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              title={text}
            >
              {text || 'Button'}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className={buttonStyle}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            title={text}
          >
            {text || 'Button'}
          </button>
        )}
      </>
    )}

    {customElements && <div className="mt-2">{customElements}</div>}
  </>;
};

export default GlobalButton;
