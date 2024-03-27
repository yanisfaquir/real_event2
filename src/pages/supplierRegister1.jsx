import React, { useState } from 'react';
import GlobalButton from '@/components/globalButton';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  setSelectedService,
  setErrorMessage,
} from '../redux/reducers/supplierReducer1';

const SupplierRegister = () => {
  // const [selectedService, setSelectedService] = useState(null);
  const selectedService = useSelector(
    (state) => state.supplier1.selectedService
  );
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const services = ['Catering', 'Merchandising', 'Stands', 'Brindes'];

  const handleServiceChange = (event) => {
    // setSelectedService(event.target.value);
    dispatch(setSelectedService(event.target.value));
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (!selectedService) {
      setErrorMessage('Por favor, selecione um tipo de serviço.');
    } else {
      setErrorMessage('');
      router.push({
        pathname: '/supplierRegister2',
        query: { service: selectedService },
      });
    }
  };

  return (
    <div className="flex justify-center mt-30">
      <div className="grid grid-cols-2 gap-1 items-center mt-20 mr-10 w-full lg:w-3/4 xl:w-1/2">
        <div className="hidden lg:block col-span-1">
          <div className="card-home-item mx-auto relative justify-self-end">
            <Image
              className="mt-10"
              src="/assets/pictures/card-sm-1-home-blue.png"
              alt="Mulher loira de frente a um computador segurando um smartphone"
              width={400}
              height={400}
              layout="intrinsic"
            />
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 w-full lg:w-auto mt-10 ml-4 justify-self-start">
          <h1 className="font-medium text-3xl mb-2">TIPO DE SERVIÇO</h1>
          <h1 className="font-medium text-3xl mb-5"> PRESTADO</h1>
          <p>
            Selecione abaixo qual a categoria do serviço o qual gostaria de
            anunciar na nossa plataforma.
          </p>
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-100 my-4 shadow-md"
            >
              <input
                id={`service-radio-${index}`}
                type="radio"
                value={service}
                name="service-radio"
                className="w-4 h-4 text-gray-900 rounded dark:focus:ring-gray-900  dark:bg-white-700 dark:border-gray-600 mt-[-5px]"
                checked={selectedService === service}
                onChange={handleServiceChange}
              />
              <label
                htmlFor={`service-radio-${index}`}
                className="w-full  ml-4 py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"
              >
                {service}
              </label>
            </div>
          ))}
          {errorMessage && (
            <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
          )}

          <div className="flex justify-center mr-10">
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
