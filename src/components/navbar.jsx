import React, { useState } from 'react';
import GlobalButton from './globalButton';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';

const Navbar = ({ inView }) => {
  const [navOpen, setNavOpen] = useState(0);

  return (
    <div className="">
      <nav
        className={`desktop-navbar fixed z-10 top-0 left-1/2 transform -translate-x-1/2 mt-5 border-4 border-white rounded-[50px] pb-1 px-[2rem] h-[72px] ${
          inView
            ? ''
            : 'desktop-navbar-scrolled fixed z-10 w-[100vw] mt-[0px] mx-[0px] px-[0rem] border-none border-bottom-2 border-transparent rounded-none pb-1 px-[2rem] h-[54px] bg-[#4A7D8B]'
        }`}
      >
        <div className="flex justify-between items-center">
          <section className="w-1/4 py-2">
            <div className="-mt-2">
              <GlobalButton
                image="/assets/icons/logo-white.png"
                path="/"
                text={`Ir à Página inicial`}
                id="logo-navbar"
              />
            </div>
          </section>

          <section className="w-1/2 py-2 flex justify-center items-center">
            <GlobalButton
              size="medium"
              type="custom"
              path="/about"
              text="Sobre"
            />
            <GlobalButton
              size="medium"
              type="custom"
              path="/supplier"
              text="Fornecedor"
            />
            <GlobalButton
              size="medium"
              type="custom"
              path="/package"
              text="Pacotes"
            />
          </section>

          <section className="w-1/4 py-2 flex justify-end items-center">
            <GlobalButton
              size="medium"
              type="secondary"
              path="/login"
              text="Conecte-se"
            />
            <GlobalButton
              image="/assets/icons/bag-white.png"
              path="/shopping-cart"
              text="Ir ao carrinho de compras"
              id="bag-navbar"
            />
          </section>
        </div>
      </nav>

      <nav
        className={`mobile-navbar fixed z-10 top-0 w-[100vw] top-0 mt-0 mx-0 px-[0rem] border-2 border-transparent rounded-none pb-1 px-[2rem] h-[54px] bg-[#4A7D8B]`}
      >
        <ul className="flex justify-between items-center my-1">
          <li className="-me-3 -mt-1">
            <GlobalButton
              image="/assets/icons/bag-white.png"
              path="/shopping-cart"
              text="Ir ao carrinho de compras"
              id="bag-navbar"
            />
          </li>
          <li className="-mt-1 ms-1 w-1/2 py-2 flex justify-center items-center">
            <Link href="/">
              <Tooltip
                anchorSelect="#logo-navbar"
                place="bottom"
                style={{ fontSize: '1.2em', outline: '2px solid white' }}
              >
                Ir à Página inicial
              </Tooltip>
              <Image
                src="/assets/pictures/logomarca-white.png"
                alt="Ir à Página inicial"
                width={240}
                height={32}
                id="logo-navbar"
              />
            </Link>
          </li>
          <li
            className="-me-4"
            onClick={() => {
              setNavOpen(!navOpen);
            }}
          >
            <GlobalButton
              image="/assets/icons/menu-white.svg"
              text={`${navOpen ? 'Recolher Menu' : 'Abrir Menu'}`}
              id="menu-navbar"
            />
          </li>
        </ul>
        <ul
          className={`sidemenu flex flex-col h-[100%] items-center fixed transition-all object-cover transition duration-300 z-9 bg-[#4A7D8B] ${
            navOpen ? 'sidemenu-expanded' : 'sidemenu-collapsed'
          }`}
        >
          <li className="py-4">
            <GlobalButton
              size="large"
              type="custom"
              path="/about"
              text="Sobre"
            />
          </li>
          <li className="py-4">
            <GlobalButton
              size="large"
              type="custom"
              path="/supplier"
              text="Fornecedor"
            />
          </li>
          <li className="py-4">
            <GlobalButton
              size="large"
              type="custom"
              path="/package"
              text="Pacotes"
            />
          </li>
          <li className="py-4">
            <GlobalButton
              image="/assets/icons/user-white.svg"
              path="/login"
              text="Conecte-se"
              id="user-navbar"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
