import React, { useState } from 'react';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SupplierRegister = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const services = ['Catering', 'Merchandising', 'Stands', 'Brindes'];

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    setErrorMessage(''); 
  };

  const handleSubmit = () => {
    if (!selectedService) {
      setErrorMessage('Por favor, selecione um tipo de serviço.');
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
          <h1 className='font-medium text-3xl mb-2'>TIPO DE SERVIÇO</h1>
          <h1 className='font-medium text-3xl mb-5'> PRESTADO</h1>
          <p>Selecione abaixo qual a categoria do serviço o qual gostaria de anunciar na nossa plataforma.</p>
          {services.map((service, index) => (
            <div key={index} className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-100 my-4 shadow-md">
              <input 
                id={`service-radio-${index}`} 
                type="radio" 
                value={service} 
                name="service-radio" 
                className="w-4 h-4 text-gray-900 rounded dark:focus:ring-gray-900  dark:bg-white-700 dark:border-gray-600 mt-[-5px]"
                checked={selectedService === service}
                onChange={handleServiceChange}
              /> 
              <label htmlFor={`service-radio-${index}`} className="w-full  ml-4 py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">{service}</label>
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
