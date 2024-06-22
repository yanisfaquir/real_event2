import React from 'react';
import { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import GlobalButton from '@/components/globalButton';
import Image from "next/image";
import { useSelector } from 'react-redux';

const UseServiceResults = () => {
  const [openNPessoas, setOpenNPessoas] = useState(false);
  const [selectedNPessoas, setSelectedNPessoas] = useState('');

  const [openTipoEspaco, setOpenTipoEspaco] = useState(false);
  const [selectedTipoEspaco, setSelectedTipoEspaco] = useState('');

  const [openPreco, setOpenPreco] = useState(false);
  const [selectedPreco, setSelectedPreco] = useState('');
  
  const [filtroPreco, setFiltroPreco] = useState('');
  const [filtroTipoEspaco, setFiltroTipoEspaco] = useState('');

  const serviceType = useSelector((state) => state.event.serviceType);
  const servico = ['catering', 'local', 'bar'];
  const nPessoas = ['15 - 30', '30 - 45', '45 - 60', '+60'];
  const tipoEspaco = ['Todos','Quinta', 'Hotel', 'Restaurante', 'Praia', 'Campo'];
  const preco = ['Todos','200$', '400$', '600$', '800$', '1000$'];

  const servicoQuinta = {
    quinta1: [
      { img: <Image src="/assets/pictures/space1.jpg" alt="Imagem da casa" width={400} height={400} key="quinta1-1" />,
        nome: 'Quinta da Atela',
        local: 'Aveiro',
        classificacao: '4.9 (50) - Alpiarça',
        preco: '400$', 
        tipoEspaco: 'Quinta'
      }, 
      { img: <Image src="/assets/pictures/space1.jpg" alt="Imagem da casa" width={400} height={400} key="quinta1-2" />, 
        nome: 'Quinta da Atela 2',
        local: 'Aveiro',
        classificacao: '4.9 (50) - Alpiarça 2',
        preco: '200$', 
        tipoEspaco: 'Hotel'
      }, 
      { img: <Image src="/assets/pictures/space1.jpg" alt="Imagem da casa" width={400} height={400} key="quinta1-3" />, 
        nome: 'Quinta da Atela',
        local: 'Porto',
        classificacao: '4.9 (50) - Alpiarça',
        preco: '200$', 
        tipoEspaco: 'Restaurante'
      }
    ]
  };

  const [activeTab, setActiveTab] = useState(serviceType[0]);
    
  const filteredQuintaItems = servicoQuinta.quinta1.filter((quintaItem) => {
    const matchPreco = filtroPreco === '' || quintaItem.preco === filtroPreco;
    const matchTipoEspaco = filtroTipoEspaco === '' || quintaItem.tipoEspaco === filtroTipoEspaco;
    return matchPreco && matchTipoEspaco;
  });

  return (
    <div className="mt-20 container mx-auto px-4">
      <div style={{ marginTop: '7rem', marginBottom: '2rem', marginLeft: '5rem', marginRight: '5rem' }}>
        <ul className="flex flex-wrap justify-end text-sm font-medium text-center border-b dark:border-customBlue dark:text-black-400">
          {serviceType.map((servicoItem, index) => (
            <li key={index} className="me-2">
              <a
                href="#"
                className={`inline-block p-4 rounded-t-lg ${
                  servicoItem === activeTab ? 
                  'text-white bg-gray-100 active dark:bg-customBlue dark:text-white' : 
                  'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(servicoItem)}
              >
                {servicoItem}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 container mx-auto">
        <form className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1">Filtro 1</label>
            <select
              name="popularity_seal"
              value={tipoEspaco}
              // onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Filtro 2</label>
            <select
              name="popularity_seal"
              value={tipoEspaco}
              // onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Filtro 3</label>
            <select
              name="popularity_seal"
              value={tipoEspaco}
              // onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Filtro 4</label>
            <select
              name="popularity_seal"
              value={tipoEspaco}
              // onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Filtro 5</label>
            <select
              name="popularity_seal"
              value={tipoEspaco}
              // onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
        </form>
      </div>

      {activeTab === 'Catering' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredQuintaItems.map((quintaItem, index) => (
            <div
              key={index}
              className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white cursor-pointer"
              // onClick={() => openModal(quintaItem)}
            >
              {quintaItem.img}
              <p className="py-2 font-medium">{quintaItem.nome}</p>
              <p className="py-2 text-sm">{quintaItem.local} - {quintaItem.tipoEspaco} </p>
              <div className="flex items-center justify-start">
                <CiStar className="mr-4" />
                <p className="text-sm mr-4">{quintaItem.classificacao}</p>
              </div>
              <div className="flex items-center justify-start">
                <button className="w-auto h-auto justify-start rounded-full text-xs my-1 mx-0 px-1 py-1 border-2 border-gray">
                  Start Trial
                </button>
              </div>
              <p className="border-b mx-2 mt-2"></p>
              <div className="flex items-center justify-start mt-6 space-x-10">
                <p className="font-medium">{quintaItem.preco}</p>
                <GlobalButton
                  size="small"
                  type="primary"
                  path="/pageDetails"
                  text="Ver mais"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UseServiceResults;
