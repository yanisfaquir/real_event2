import React, { useState } from 'react';
import Image from "next/image";

const serviceData = {
  nome: "DJ Tomané Tomaça Music",
  avaliacao: 4.3,
  totalReviews: 7,
  localizacao: "Maia, Porto",
  descricao: "Farei do vosso casamento um dia único e especial. Realizo com mestria as funções de DJ, Animador, Coreógrafo e Wedding Planner. Perfeito para um dia único e memorável.",
  imagem: "/assets/pictures/servico.png", 
};

const PageComponent = () => {
  const [activeTab, setActiveTab] = useState('informacoes');

  return (
    <div className="pt-10 px-5">
      <div className="max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-1">
            <Image
              src={serviceData.imagem}
              alt={serviceData.nome}
              // Ajuste para um tamanho maior
              width={400}
              // Mantém a proporção da imagem
              height={250}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">{serviceData.nome}</h2>
            <div className="flex items-center my-2">
              <span style={{ color: '#4A7D8B' }} className="text-xl mr-2 text-teal-500">{ '★'.repeat(Math.round(serviceData.avaliacao)) }</span>
              <span className="font-semibold">{serviceData.avaliacao} Excelente</span>
              <span className="ml-2">· Reviews ({serviceData.totalReviews})</span>
            </div>
            <p className="text-gray-600">{serviceData.localizacao}</p>
            <p className="my-2">{serviceData.descricao}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button  style={{ backgroundColor: '#4A7D8B' }} className="py-2 px-4 text-white rounded shadow hover:bg-teal-600 transition-colors">
                Adicionar ao pedido
              </button>
              <button   style={{ borderColor: '#4A7D8B', color: '#4A7D8B' }}
 className="py-2 px-4 border bg-white rounded shadow hover:bg-teal-50 transition-colors">
                Contacto
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-100 flex justify-center py-2 rounded"> {/* Nova div com margem superior grande */}
          <button style={{ color: '#4A7D8B' }}
            className={`py-2 px-4 ${activeTab === 'informacoes' ? 'bg-white' : 'text-teal-500'} rounded cursor-pointer`}
            onClick={() => setActiveTab('informacoes')}
          >
            INFORMAÇÕES
          </button>
          <button style={{ color: '#4A7D8B' }}
            className={`py-2 px-4 ${activeTab === 'feedback' ? 'bg-white' : 'text-teal-500'} rounded cursor-pointer`}
            onClick={() => setActiveTab('feedback')}
          >
            FEEDBACK
          </button>
        </div>
        <div className="p-4 bg-white rounded shadow mt-2">
          {activeTab === 'informacoes' && (
            <div>
              <p>Descrição detalhada do serviço...</p>
            </div>
          )}
          {activeTab === 'feedback' && (
            <div>
              <p>Feedback dos clientes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageComponent;
