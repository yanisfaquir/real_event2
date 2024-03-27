import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FaChevronDown } from 'react-icons/fa';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';

const serviceResults = () => {
  return (
    <div>
      <div
        style={{
          marginTop: '7rem',
          marginBottom: '2rem',
          marginLeft: '5rem',
          marginRight: '5rem',
        }}
      >
        <ul class="flex flex-wrap justify-end text-sm font-medium text-center  border-b   dark:border-customBlue dark:text-black-400">
          <li class="me-2">
            <a
              href="#"
              aria-current="page"
              class="inline-block p-4 text-white-600 bg-gray-50 rounded-t-lg active dark:bg-customBlue dark:text-gray-100 border"
            >
              Catering
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-constomBlueLight dark:hover:text-gray-300"
            >
              Decoração
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-constomBlueLight dark:hover:text-gray-300"
            >
              Local
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-constomBlueLight dark:hover:text-gray-300"
            >
              Bar
            </a>
          </li>
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
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">-15</li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    15 - 30
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    30 - 45
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    45 - 60
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">+60</li>
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
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
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
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    Item 1
                  </li>
                </ul>
              </div>
            </button>
          </div>
        </div>

        <div className="max-w-[1200px] max-h-[1200px] mx-auto grid md:grid-cols-4 gap-8">
          <div class="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <Image
              src="/assets/pictures/space1.jpg"
              alt="Imagem da casa"
              width={400}
              height={400}
              layout="cover"
            />
            <p class="py-2 font-medium">Quinta da Atela</p>
            <p class="py-2 text-sm">São João da Madeira, Aveiro</p>
            <div class="flex items-center justify-start">
              <CiStar class="mr-4" />
              <p class="text-sm mr-4">4.9 (50) - Alpiarça</p>
            </div>
            <div className="flex items-center justify-start">
              <button class="w-auto h-auto justify-start rounded-full text-xs my-1 mx-0 px-1 py-1 border-2 border-gray">
                Start Trial
              </button>
            </div>
            <p class="border-b mx-2 mt-2"></p>
            <div class="flex items-center justify-start mt-6 space-x-10">
              <p className="font-medium">200$</p>
              <GlobalButton
                size="small"
                type="primary"
                path="/pageDetails"
                text="Ver mais"
              />
            </div>
          </div>

          <div class="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <Image
              src="/assets/pictures/space1.jpg"
              alt="Imagem da casa"
              width={400}
              height={400}
              layout="cover"
            />

            <p class="py-2 font-medium">Quinta da Atela</p>
            <p class="py-2 text-sm">São João da Madeira, Aveiro</p>
            <div class="flex items-center justify-start">
              <CiStar class="mr-4" />
              <p class="text-sm mr-4">4.9 (50) - Alpiarça</p>
            </div>
            <div className="flex items-center justify-start">
              <button class="w-auto h-auto justify-start rounded-full text-xs my-1 mx-0 px-1 py-1 border-2 border-gray">
                Start Trial
              </button>
            </div>
            <p class="border-b mx-2 mt-2"></p>
            <div class="flex items-center justify-start mt-6 space-x-10">
              <p className="font-medium ">200$</p>
              <GlobalButton
                size="small"
                type="primary"
                path="/pageDetails"
                text="Ver mais"
              />
            </div>
          </div>

          <div class="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <Image
              src="/assets/pictures/space1.jpg"
              alt="Imagem da casa"
              width={400}
              height={400}
              layout="cover"
            />

            <p class="py-2 font-medium">Quinta da Atela</p>
            <p class="py-2 text-sm">São João da Madeira, Aveiro</p>
            <div class="flex items-center justify-start">
              <CiStar class="mr-4" />
              <p class="text-sm mr-4">4.9 (50) - Alpiarça</p>
            </div>
            <div className="flex items-center justify-start">
              <button class="w-auto h-auto justify-start rounded-full text-xs my-1 mx-0 px-1 py-1 border-2 border-gray">
                Start Trial
              </button>
            </div>
            <p class="border-b mx-2 mt-2"></p>
            <div class="flex items-center justify-start mt-6 space-x-10">
              <p className="font-medium ">200$</p>
              <GlobalButton
                size="small"
                type="primary"
                path="/pageDetails"
                text="Ver mais"
              />
            </div>
          </div>

          <div class="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <Image
              src="/assets/pictures/space1.jpg"
              alt="Imagem da casa"
              width={400}
              height={400}
              layout="cover"
            />

            <p class="py-2 font-medium">Quinta da Atela</p>
            <p class="py-2 text-sm">São João da Madeira, Aveiro</p>
            <div class="flex items-center justify-start">
              <CiStar class="mr-4" />
              <p class="text-sm mr-4">4.9 (50) - Alpiarça</p>
            </div>
            <div className="flex items-center justify-start">
              <button class="w-auto h-auto justify-start rounded-full text-xs my-1 mx-0 px-1 py-1 border-2 border-gray">
                Start Trial
              </button>
            </div>
            <p class="border-b mx-2 mt-2"></p>
            <div class="flex items-center justify-start mt-6 space-x-10">
              <p className="font-medium ">200$</p>
              <GlobalButton
                size="small"
                type="primary"
                path="/pageDetails"
                text="Ver mais"
              />
            </div>
          </div>

          <div class="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <Image
              src="/assets/pictures/space1.jpg"
              alt="Imagem da casa"
              width={400}
              height={400}
              layout="cover"
            />

            <p class="py-2 font-medium">Quinta da Atela</p>
            <p class="py-2 text-sm">São João da Madeira, Aveiro</p>
            <div class="flex items-center justify-start">
              <CiStar class="mr-4" />
              <p class="text-sm mr-4">4.9 (50) - Alpiarça</p>
            </div>
            <div className="flex items-center justify-start">
              <button class="w-auto h-auto justify-start rounded-full text-xs my-1 mx-0 px-1 py-1 border-2 border-gray">
                Start Trial
              </button>
            </div>
            <p class="border-b mx-2 mt-2"></p>
            <div class="flex items-center justify-start mt-6 space-x-10">
              <p className="font-medium ">200$</p>
              <GlobalButton
                size="small"
                type="primary"
                path="/pageDetails"
                text="Ver mais"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default serviceResults;
