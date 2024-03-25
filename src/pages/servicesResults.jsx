import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FaChevronDown } from 'react-icons/fa';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';

const serviceResults = () => {
  const servico = ['catering', 'decoracao', 'local', 'bar'];
  const nPessoas = ['15 - 30', '30 - 45', '45 - 60', '+60'];
  const tipoEspaco = ['Quinta', 'Hotel', 'Restaurante', 'Praia', 'Campo'];
  const preco = ['100 - 200', '200 - 300', '300 - 400', '400 - 500', '+500'];
  const servicoQuinta = {
    quinta1: [
      { img:<Image
        src="/assets/pictures/space1.jpg"
        alt="Imagem da casa"
        width={400}
        height={400}
        layout="cover"
      />,
        nome: 'Quinta da Atela',
        local: 'São João da Madeira, Aveiro',
        classificacao: '4.9 (50) - Alpiarça',
        preco: '200$'
      }, 
      {img:<Image
        src="/assets/pictures/space1.jpg"
        alt="Imagem da casa"
        width={400}
        height={400}
        layout="cover"
      />, 
        nome: 'Quinta da Atela 2',
        local: 'São João da Madeira, Aveiro 2',
        classificacao: '4.9 (50) - Alpiarça 2',
        preco: '200$'
      }, 
      {img:<Image
        src="/assets/pictures/space1.jpg"
        alt="Imagem da casa"
        width={400}
        height={400}
        layout="cover"
      />, 
        nome: 'Quinta da Atela',
        local: 'São João da Madeira, Aveiro',
        classificacao: '4.9 (50) - Alpiarça',
        preco: '200$'
      }
    ]
  };
  
  
  return (
    <div>
      <div
        style={{marginTop: '7rem', marginBottom: '2rem', marginLeft: '5rem', marginRight: '5rem'}}>
        <ul class="flex flex-wrap justify-end text-sm font-medium text-center  border-b   dark:border-customBlue dark:text-black-400">
          {servico.map((servicoItem, index) => (
            <li class="me-2">
              <a
                href="#"
                aria-current="page"
                class="inline-block p-4 text-white-600 bg-gray-50 rounded-t-lg active dark:bg-customBlue dark:text-gray-100 border"
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
            <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
              <p className="px-4">Nº Pessoas</p>
              <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                <FaChevronDown />
              </span>
              <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                <ul className="text-left border rounded">
                  {nPessoas.map((nPessoasItem, index) => (
                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                      {nPessoasItem}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </div>

          <div className="relative flex justify-left items-left pt-0 ml-10 ">
            <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
              <p className="px-4">Tipo de espaço</p>
              <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                <FaChevronDown />
              </span>
              <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                <ul className="text-left border rounded">
                  {tipoEspaco.map((tipoEspacoItem, index) => (
                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                      {tipoEspacoItem}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </div>

          <div className="relative flex justify-left items-left pt-0 ml-10 ">
            <button className="relative flex justify-center items-center bg-white bordar focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
              <p className="px-4">Preço</p>
              <span className="bg-customBlue  border-l p-2 hover:bg-gray-100">
                <FaChevronDown />
              </span>
              <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                <ul className="text-left border rounded">
                  {preco.map((precoItem, index) => (
                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                      {precoItem}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </div>
        </div>

        <div className="max-w-[1200px] max-h-[1200px] mx-auto grid md:grid-cols-4 gap-8">
  {servicoQuinta.quinta1.map((quintaItem, index) => (
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

export default serviceResults;
