import React from 'react';
import GlobalButton from '@/components/globalButton';

// Atualização do array services com a hora do fim
const services = [
  {
    id: 1,
    date: '20 MAR',
    time: '14:00',
    endTime: '16:00', // Hora do fim
    location: 'Local A',
    name: 'NOME DO SERVIÇO',
    client: 'CLIENTE',
    status: 'Pendente',
    price: '20€'
  },
  // Adicione mais serviços conforme necessário
];

const handleSubmit = () => {
  console.log('Botão salvar clicado');
};

const ServiceItem = ({ service }) => (
  // Ajuste na grade para acomodar a nova coluna
  <div className="grid grid-cols-8 gap-4 px-6 py-3 border-b items-center">
    <div>{service.date}</div>
    <div>{service.time}</div>
    <div>{service.endTime}</div> {/* Hora do fim */}
    <div className="col-span-2">{service.client}</div>
    <div>{service.location}</div>
    <div>{service.price}</div>
    <div className="flex gap-2">
      <button
        className="px-4 py-1 border-2 text-xs rounded-full shadow hover:bg-green-500 hover:text-white transition duration-300 font-bold"
        style={{ borderColor: 'green' }}
      >
        Aceitar
      </button>
      <button
        className="px-4 py-1 border-2 text-xs rounded-full shadow hover:bg-red-500 hover:text-white transition duration-300 font-bold"
        style={{ borderColor: 'red' }}
      >
        Recusar
      </button>
    </div>
  </div>
);

const ServiceList = () => (
  <div>
    <div style={{ marginTop: '10rem', background: '#F7F7F7' }} className="max-w-7xl mx-auto my-10 bg-white rounded-lg shadow-lg">
      <div className="text-xl font-semibold border-b p-6">Os seus pedidos</div>
      <div className="grid grid-cols-8 gap-4 px-6 py-3 border-b font-bold">
        <div>Data</div>
        <div>Início</div>
        <div>Fim</div> {/* Cabeçalho para hora do fim */}
        <div className="col-span-2">Cliente</div>
        <div>Local</div>
        <div>Preço</div>
        <div>Ações</div>
      </div>
      {services.map(service => (
        <ServiceItem key={service.id} service={service} />
      ))}
    </div>
    <div className="flex justify-center">
      <GlobalButton
        size="small"
        type="primary"
        onClick={handleSubmit}
        text="Salvar"
      />
    </div>
  </div>
);

export default ServiceList;
