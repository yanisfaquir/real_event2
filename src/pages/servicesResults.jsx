import React from 'react';
import { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaChevronDown } from 'react-icons/fa';
import GlobalButton from '@/components/globalButton';
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { setActionServiceType } from '@/redux/actions/eventActions';

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
  console.log('typle', serviceType)
  console.log('serviiii', serviceType[0]);



  const servico = ['catering', 'local', 'bar'];
  const nPessoas = ['15 - 30', '30 - 45', '45 - 60', '+60'];
  const tipoEspaco = ['Todos','Quinta', 'Hotel', 'Restaurante', 'Praia', 'Campo'];
  const preco = ['Todos','200$', '400$', '600$', '800$', '1000$'];

  const servicoQuinta = {
    quinta1: [
      { img:<Image
        src="/assets/pictures/space1.jpg"
        alt="Imagem da casa"
        width={400}
        height={400}
        key="quinta1-1" />,
        nome: 'Quinta da Atela',
        local: 'Aveiro',
        classificacao: '4.9 (50) - Alpiarça',
        preco: '400$', 
        tipoEspaco: 'Quinta'
      }, 
      {img:<Image
        src="/assets/pictures/space1.jpg"
        alt="Imagem da casa"
        width={400}
        height={400}
        key="quinta1-2" />, 
        nome: 'Quinta da Atela 2',
        local: 'Aveiro',
        classificacao: '4.9 (50) - Alpiarça 2',
        preco: '200$', 
        tipoEspaco: 'Hotel'
      }, 
      {img:<Image
        src="/assets/pictures/space1.jpg"
        alt="Imagem da casa"
        width={400}
        height={400}
        key="quinta1-3" />, 
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
    <div>
      <div
        style={{marginTop: '7rem', marginBottom: '2rem', marginLeft: '5rem', marginRight: '5rem'}}>
          <ul className="flex flex-wrap justify-end text-sm font-medium text-center border-b dark:border-customBlue dark:text-black-400">
            {serviceType.map((servicoItem, index) => (
              <li key={index} className="me-2">
                <a
                  href="#"
                  className={`inline-block p-4 text-white-600 bg-gray-50 rounded-t-lg ${
                    servicoItem === activeTab ? 'active dark:bg-customBlue dark:text-gray-100 border' : ''
                  }`}
                  onClick={() => setActiveTab(servicoItem)}
                >
                  {servicoItem}
                </a>
              </li>
            ))}
          </ul>
      </div>
      <div className="w-full px-4 bg-white">
        <div className="flex items-center justify-start">
          <div className="relative flex justify-left items-left pt-0 ml-20 ">
            <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group"
              onClick={() => setOpenNPessoas(!openNPessoas)}
            >
              <p className="px-4">{selectedNPessoas || 'Nº Pessoas'}</p>
              <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                <FaChevronDown />
              </span>
              {openNPessoas && (
                <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                  <ul className="text-left border rounded">
                  {nPessoas.map((nPessoasItem, index) => (
                  <li
                    key={index}
                    className="px-4 py-1 hover:bg-gray-100 border-b cursor-pointer"
                    onClick={() => {
                      setSelectedNPessoas(nPessoasItem);
                      setOpenNPessoas(false);
                    }}
                  >
                    {nPessoasItem}
                  </li>
                ))}
                  </ul>
                </div>
              )}
            </button>
          </div>

          <div className="relative flex justify-left items-left pt-0 ml-10 ">
          <button
              className="relative flex justify-center items-center bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group"
              onClick={() => setOpenTipoEspaco(!openTipoEspaco)}
            >
              <p className="px-4">{selectedTipoEspaco || 'Tipo de espaço'}</p>
              <span className="bg-customBlue border-l p-2 hover:bg-gray-100">
                <FaChevronDown />
              </span>
              {openTipoEspaco && (
                <div className="absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                  <ul className="text-left border rounded">
                    {tipoEspaco.map((tipoEspacoItem, index) => (
                      <li
                        key={index}
                        className="px-4 py-1 hover:bg-gray-100 border-b cursor-pointer"
                        onClick={() => {
                          setSelectedTipoEspaco(tipoEspacoItem);
                          setFiltroTipoEspaco(tipoEspacoItem === 'Todos' ? '' : tipoEspacoItem);
                          setOpenTipoEspaco(false);
                        }}
                      >
                        {tipoEspacoItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>

          </div>

          <div className="relative flex justify-left items-left pt-0 ml-10 ">
          <button
              className="relative flex justify-center items-center bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group"
              onClick={() => setOpenPreco(!openPreco)}
            >
              <p className="px-4">{selectedPreco || 'Preço'}</p>
              <span className="bg-customBlue border-l p-2 hover:bg-gray-100">
                <FaChevronDown />
              </span>
              {openPreco && (
                <div className="absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                  <ul className="text-left border rounded">
                  {preco.map((precoItem, index) => (
                    <li
                      key={index}
                      className="px-4 py-1 hover:bg-gray-100 border-b cursor-pointer"
                      onClick={() => {
                        setSelectedPreco(precoItem);
                        setFiltroPreco(precoItem === 'Todos' ? '' : precoItem); 
                        setOpenPreco(false);
                      }}
                    >
                      {precoItem}
                    </li>
                  ))}
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>


        

        <div className="max-w-[1200px] max-h-[1200px] mx-auto grid md:grid-cols-4 gap-8 ml-20">
        {activeTab === 'Catering' &&
          filteredQuintaItems.map((quintaItem, index) => (
            <div key={index} className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
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


      {activeTab === 'bar' &&
          servicoQuinta.quinta1.map((quintaItem, index) => (
            <div key={index} className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
              {quintaItem.img}
              <p className="py-2 font-medium">{quintaItem.nome}</p>
              <p className="py-2 text-sm">{quintaItem.local}</p>
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

      </div>
    </div>
  );
};

export default UseServiceResults;
