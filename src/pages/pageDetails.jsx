import React, { useState } from 'react';
import Image from 'next/image';

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
    <div style={{ paddingTop: '5rem' }}>
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1rem',
      }}>
        <div style={{ flex: 1 }}>
          <Image
            src={serviceData.imagem}
            alt={serviceData.nome}
            width={500} 
            height={300} 
            layout="responsive"
          />
        </div>
        <div style={{ flex: 1, paddingLeft: '1rem' }}>
          <h2>{serviceData.nome}</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem', color:'#4A7D8B'}}>{'★'.repeat(Math.round(serviceData.avaliacao))}</span>
            <span>{serviceData.avaliacao} Excelente</span>
            <span style={{ marginLeft: '0.5rem' }}>· Reviews ({serviceData.totalReviews})</span>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <span>{serviceData.localizacao}</span>
          </div>
          <p>{serviceData.descricao}</p>
          <div style={{ display: 'flex', marginTop: '1rem' }}>
            <button style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              border: 'none',
              backgroundColor: '#4A7D8B',
              color: '#fff',
              cursor: 'pointer',
            }}>
              Adicionar ao pedido
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              border: '1px solid #4A7D8B',
              backgroundColor: '#fff',
              color: '#4A7D8B',
              cursor: 'pointer',
            }}>
              Contacto
            </button>
          </div>
        </div>
      </div>
      <div style={{
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        padding: '0.5rem 0',
      }}>
        <button style={{
          padding: '0.5rem 1rem',
          border: 'none',
          color: '#4A7D8B',
          backgroundColor: activeTab === 'informacoes' ? '#fff' : 'transparent',
          cursor: 'pointer',
        }} onClick={() => setActiveTab('informacoes')}>
          INFORMAÇÕES
        </button>
        <button style={{
          padding: '0.5rem 1rem',
          border: 'none',
          color: '#4A7D8B',
          backgroundColor: activeTab === 'feedback' ? '#fff' : 'transparent',
          cursor: 'pointer',
        }} onClick={() => setActiveTab('feedback')}>
          FEEDBACK
        </button>
      </div>
      <div>
        {activeTab === 'informacoes' && (
          <div style={{ padding: '1rem' }}>
            {/* Conteúdo de informações */}
            <p>Descrição detalhada do serviço...</p>
          </div>
        )}
        {activeTab === 'feedback' && (
          <div style={{ padding: '1rem' }}>
            {/* Conteúdo de feedback */}
            <p>Feedback dos clientes...</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default PageComponent;
