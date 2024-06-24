import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const PageDetails = () => {
  const selectedService = useSelector((state) => state.serviceResult.selectedService);

  if (!selectedService) {
    return <div>Nenhum serviço selecionado.</div>;
  }

  return (
    <div className="pt-10 px-5">
      <div className="max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-1">
            <Image
              src={selectedService.img.props.src}
              alt={selectedService.nome}
              width={400}
              height={250}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }}
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">{selectedService.nome}</h2>
            <div className="flex items-center my-2">
              <span style={{ color: '#4A7D8B' }} className="text-xl mr-2 text-teal-500">{ '★'.repeat(Math.round(selectedService.classificacao.split(' ')[0])) }</span>
              <span className="font-semibold">{selectedService.classificacao.split(' ')[0]} Excelente</span>
              <span className="ml-2">· Reviews ({selectedService.classificacao.split(' ')[2]})</span>
            </div>
            <p className="text-gray-600">{selectedService.local}</p>
            <p className="my-2">{selectedService.descricao}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button  style={{ backgroundColor: '#4A7D8B' }} className="py-2 px-4 text-white rounded shadow hover:bg-teal-600 transition-colors">
                Adicionar ao pedido
              </button>
              <button style={{ borderColor: '#4A7D8B', color: '#4A7D8B' }}
 className="py-2 px-4 border bg-white rounded shadow hover:bg-teal-50 transition-colors">
                Contacto
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-100 flex justify-center py-2 rounded"> {/* Nova div com margem superior grande */}
          <button style={{ color: '#4A7D8B' }}
            className={`py-2 px-4 rounded cursor-pointer`}
          >
            INFORMAÇÕES
          </button>
          <button style={{ color: '#4A7D8B' }}
            className={`py-2 px-4 rounded cursor-pointer`}
          >
            FEEDBACK
          </button>
        </div>
        <div className="p-4 bg-white rounded shadow mt-2">
          <div>
            <p>Descrição detalhada do serviço...</p>
          </div>
          <div>
            <p>Feedback dos clientes...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetails;
