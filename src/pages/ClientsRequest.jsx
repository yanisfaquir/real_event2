import React, { useEffect, useState, useContext } from 'react';
import ApiClient from '../../apiClient';
import { AccessibilityContext } from '@/contexts/acessibility';
import GlobalButton from '@/components/globalButton';
 
const ClientRequest = () => {
  const { alignment, highContrast } = useContext(AccessibilityContext);
 
  const suppliersData = [
    {
      user: 'Vera Carpenter',
      people: 300,
      price: '200$',
      date: '14/05',
      time: '14:00 - 16:00',
      eventType: 'Aniversário',
      status: 'Activo'
    },
    {
      user: 'John Doe',
      people: 150,
      price: '500$',
      date: '21/06',
      time: '10:00 - 12:00',
      eventType: 'Casamento',
      status: 'Pendente'
    },
    {
      user: 'Jane Smith',
      people: 200,
      price: '350$',
      date: '05/07',
      time: '18:00 - 20:00',
      eventType: 'Conferência',
      status: 'Aceito'
    },
    {
      user: 'Michael Johnson',
      people: 50,
      price: '100$',
      date: '11/08',
      time: '09:00 - 11:00',
      eventType: 'Reunião',
      status: 'Recusado'
    },
  ];
 
  return (
    <div className="mt-20 container mx-auto px-4">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <p
              className={`flex flex-col pt-15 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}
              style={{
                textAlign: alignment ? alignment : 'start',
                color: highContrast ? 'white' : 'unset'
              }}
              
            >
              Os meus pedidos
            </p>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Serviço
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      N Pessoas
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hora Inicio / Hora Fim
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tipo de Evento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {suppliersData.map((supplier, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">{supplier.user}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{supplier.people}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{supplier.date}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{supplier.time}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{supplier.eventType}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ClientRequest;
 