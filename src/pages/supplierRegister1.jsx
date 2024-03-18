import React, { useState } from 'react';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SupplierRegister = () => {
  const [checkedState, setCheckedState] = useState([false, false, false, false]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    setErrorMessage(''); 
  };

  const handleSubmit = () => {
    const isSelected = checkedState.some((item) => item);

    if (!isSelected) {
      setErrorMessage('Por favor, selecione pelo menos um tipo de serviço.');
    } else {
      setErrorMessage('');
      router.push('/supplierRegister2'); 
    }
  };

  return (
    <div className="flex justify-center mt-30">
      <div className="grid grid-cols-2 gap-1 items-center mt-20 mr-10">
        <div className="card-home-item mx-auto relative justify-self-end">
          <Image src='/assets/pictures/card-sm-1-home-blue.png' alt="Mulher loira de frente a um computador segurando um smartphone" width={400} height={400} layout="cover" />
        </div>
        <div className='mr-1 w-85 justify-self-start'>
          <h1 className='font-bold'>TIPO DE SERVIÇO PRESTADO</h1>
          <p>Selecione abaixo qual a categoria do serviço o qual gostaria de anunciar na nossa plataforma.</p>
          {checkedState.map((item, index) => (
            <div key={index} className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-100 my-4 shadow-md">
              <input 
                id={`bordered-checkbox-${index}`} 
                type="checkbox" 
                value="" 
                name="bordered-checkbox" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-[-5px]"
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              /> 
              <label htmlFor={`bordered-checkbox-${index}`} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Opção de serviço {index + 1}</label>
            </div>
          ))}
          {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
          <div className='flex justify-center mr-10'>
            <GlobalButton
              size="small"
              type="primary"
              onClick={handleSubmit}
              text="Seguinte"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierRegister;
