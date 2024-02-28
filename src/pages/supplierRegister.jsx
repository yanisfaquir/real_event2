import React from 'react';
import GlobalButton from '@/components/globalButton';

const SupplierRegister = () => {
  return (
    <div className="flex justify-center mt-30">
      <div className="grid grid-cols-2 gap-1 items-center mt-20 mr-10">
        <div className="card-home-item mx-auto relative justify-self-end">
          <img className='w-80 h-90' src='/assets/pictures/card-sm-1-home-blue.png' />
        </div>
        <div className='mr-1 w-85 justify-self-start'>
          <h1 className='font-bold'>TIPO DE SERVIÇO PRESTADO</h1>
          <p>Selecione abaixo qual a categoria do serviço o qual gostaria de anunciar na nossa plataforma. </p>
          <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-100 my-4 shadow-md">
            <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-[-5px]"/> 
            <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Default radio</label>
          </div>

          <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-100 my-4 shadow-md">
            <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-[-5px]"/>
            <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Default radio</label>
          </div>

          <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-100 my-4 shadow-md">
            <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-[-5px]"/> 
            <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Default radio</label>
          </div>

          <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-100 my-4 shadow-md">
            <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-[-5px]"/>
            <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Default radio</label>
          </div>

          <div className='flex justify-center mr-10'>
        <GlobalButton
          size="small"
          type="primary"
          path="/"
          text="Seguinte"
        />
      </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierRegister;
