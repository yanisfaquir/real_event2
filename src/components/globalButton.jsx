import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';

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
}) => {
  const buttonSizes = {
    small: 'py-1 px-2 text-[1.25rem] min-w-32',
    medium: 'py-2 px-3 text-[1.5rem] min-w-40',
    large: 'py-3 px-4 text-[1.75rem] min-w-48',
    custom: 'py-4 px-4',
  };

  const buttonColors = {
    primary: 'bg-[#4A7D8B] text-white hover:bg-[#3B6D7A]',
    secondary: 'bg-white text-black hover:bg-[#C8C8C8]',
    terciary: 'bg-[#FFA451] text-white hover:bg-[#E59441]',
    custom: 'bg-transparent text-white hover:bg-[#f2EBEB]/[.3]',
  };

  const buttonStyle = `rounded-[50px] focus:outline-none font-bold transition-all object-cover transition duration-300 ${width ? `w-[${width}]` : ''} ${buttonSizes[size]} ${buttonColors[type]}`;

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      handleClick(event);
    }
  };

  return (
    <>
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
          className="transition duration-300 hover:scale-125 mx-4"
          id={id}
          type="button"
        >
          {path ? (
            <Link href={path}>
              <Image src={image} alt={text} width={32} height={32} />
            </Link>
          ) : (
            <Image src={image} alt={text} width={32} height={32} />
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
    </>
  );
};

export default GlobalButton;
