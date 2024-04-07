import React, { useState, useEffect, useContext } from 'react';
import GlobalButton from './globalButton';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';
import services from '../components/services.json';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setCurrentCartSection } from '@/redux/reducers/cartReducer';
import { Popover } from 'evergreen-ui';
import { AccessibilityContext } from '../contexts/acessibility';

const Navbar = ({ inView }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(0);
  const [visibleDesktop, setVisibleDesktop] = useState(false);
  const cartItems = services.services;
  const extraItemsCount = Math.max(0, cartItems.length - 2);
  const [visibleMobile, setVisibleMobile] = useState(false);

  const {
    isCustomFont,
    toggleFont,
    toggleTextAlignment,
    getNextAlignment,
    getCurrentAlignmentTranslation,
    iconClicked,
    increaseFontSize,
    decreaseFontSize,
    increaseLineSpacing,
    increaseTextSpacing,
  } = useContext(AccessibilityContext);

  const handleCartMobileClick = () => {
    if (router.pathname !== '/shopping-cart') {
      setVisibleMobile((prevState) => !prevState);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navOpen && !event.target.closest('.sidemenu')) {
        setNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navOpen]);

  useEffect(() => {
    if (visibleDesktop || visibleMobile) {
      const popoverElement = document.querySelector('.cart-popover');
      if (popoverElement) {
        popoverElement.setAttribute('tabindex', '0');
      }
    }
  }, [visibleDesktop, visibleMobile]);

  const cartPopoverContent =
    router.pathname !== '/shopping-cart' ? (
      <div className="p-2 cart-popover">
        {cartItems.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="flex justify-between align-center items-center"
          >
            <Image
              alt={item.name}
              src={item.image}
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-[12px] ms-2 me-2 my-2"
            />
            <div className="flex flex-col my-4">
              <h2>
                <strong className="max-w-[120px]">{item.name}</strong>
              </h2>
              <p>Valor: €{item.price}</p>
            </div>
            <hr />
          </div>
        ))}
        {extraItemsCount > 0 && (
          <p className="ms-2">E mais {extraItemsCount} itens...</p>
        )}
        <div className="flex justify-between py-4">
          <li
            className="list-none rounded-[50px]"
            style={{ boxShadow: '0 0 0 2px #4A7D8B' }}
          >
            <div>
              <GlobalButton
                path={
                  router.pathname === '/shopping-cart' ? '' : '/shopping-cart'
                }
                text={'Ver mais'}
                size="small"
                type="secondary"
                width="100%"
                onClick={() => {
                  dispatch(setCurrentCartSection(1));
                  setVisibleDesktop(false);
                  handleCartMobileClick;
                  router.push('/shopping-cart');
                }}
              />
            </div>
          </li>
        </div>
      </div>
    ) : null;

  return (
    <div className="">
      <nav
        className={`desktop-navbar fixed z-10 top-0 left-1/2 transform -translate-x-1/2 mt-5 border-4 border-white bg-[#4A7D8B] rounded-[50px] pb-2 px-[2rem] h-[76px] ${
          inView
            ? ''
            : 'desktop-navbar-scrolled fixed z-10 w-[100vw] mt-[0px] mx-[0px] px-[0rem] border-none border-bottom-2 border-transparent rounded-none px-[2rem] h-[72px] bg-[#4A7D8B]'
        }`}
      >
        <div className="flex justify-between items-center">
          <section className="w-1/4 py-2 flex items-center">
            <div className="-mt-2">
              <li className="list-none relative min-w-[56px]">
                <GlobalButton
                  image="/assets/icons/logorealevent.png"
                  path="/"
                  text={`Ir à Página inicial`}
                  id="logo-navbar"
                />
              </li>
            </div>
            <li className="list-none relative min-w-[56px]">
              <GlobalButton
                image="/assets/icons/serif-icon.svg"
                text={isCustomFont ? 'Remover serifa' : 'Aplicar serifa'}
                id={isCustomFont ? 'remove-serif-navbar' : 'apply-serif-navbar'}
                onClick={toggleFont}
              />
            </li>
            <li className="list-none relative min-w-[56px]">
              <GlobalButton
                image="/assets/icons/aligment-icon.svg"
                text={`Alinhamento: ${getCurrentAlignmentTranslation()}`}
                id={`aligment-navbar-${getNextAlignment()}`}
                onClick={toggleTextAlignment}
              ></GlobalButton>
              {iconClicked && getCurrentAlignmentTranslation() && (
                <span className="absolute bottom-0 right-2 text-xs bg-white px-1 rounded-md font-bold">
                  {getCurrentAlignmentTranslation().charAt(0).toUpperCase()}
                </span>
              )}
            </li>
            <li className="list-none relative -mt-1 min-w-[56px]">
              <GlobalButton
                image="/assets/icons/leading-increase-icon.svg"
                text={`Aumentar espaçamento entre linhas`}
                id={`increase-leading-navbar`}
                onClick={increaseLineSpacing}
              />
            </li>
            <li className="list-none relative mt-2 min-w-[56px]">
              <GlobalButton
                image="/assets/icons/decrease-font-icon.svg"
                text={`Diminuir fonte`}
                id={`decrease-font-navbar`}
                onClick={decreaseFontSize}
              />
            </li>
            <li className="list-none relative mt-2 min-w-[56px]">
              <GlobalButton
                image="/assets/icons/increase-font-icon.svg"
                text={`Aumentar fonte`}
                id={`increase-font-navbar`}
                onClick={increaseFontSize}
              />
            </li>
            <li className="list-none relative mt-2 min-w-[56px]">
              <GlobalButton
                image="/assets/icons/word-spacing-icon.svg"
                text={`Aumentar espaçamento entre palavras`}
                id={`increase-leading-text-navbar`}
                onClick={increaseTextSpacing}
              />
            </li>
            <li className="list-none relative mt-2 min-w-[56px]">
              <GlobalButton
                image="/assets/icons/high-contrast-icon.svg"
                text={`Alterar contraste`}
                id={`high-contrast-navbar`}
              />
            </li>
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
              path="/supplierRegister1"
              text="Fornecedor"
            />
          </section>

          <section className="w-1/4 py-2 flex justify-end items-center align-center">
            <GlobalButton
              image="/assets/icons/user-white.svg"
              path="/login"
              text="Conecte-se"
              id="user-navbar"
            />
            <div style={{ position: 'relative', width: '24%', height: '44px' }}>
              <div style={{ position: 'absolute', right: 0, top: 6 }}>
                <GlobalButton
                  image="/assets/icons/star-icon-white.svg"
                  path="/favorites"
                  text="Ver favoritos"
                  id="star-navbar"
                />
              </div>
            </div>
            <div style={{ position: 'relative', width: '24%', height: '44px' }}>
              {router.pathname !== '/shopping-cart' ? (
                <Popover
                  content={cartPopoverContent}
                  title={
                    <strong className="text-[1.2rem]">Seu carrinho</strong>
                  }
                  trigger={router.pathname === '/shopping-cart' ? '' : 'hover'}
                  open={visibleDesktop}
                  onOpenChange={setVisibleDesktop}
                  placement="bottomRight"
                >
                  <div style={{ position: 'absolute', right: 0, top: 6 }}>
                    <GlobalButton
                      image="/assets/icons/bag-white.png"
                      path={
                        router.pathname === '/shopping-cart'
                          ? ''
                          : '/shopping-cart'
                      }
                      text={
                        router.pathname === '/shopping-cart'
                          ? 'Você está no carrinho de compras'
                          : 'Ver carrinho de compras'
                      }
                      id={
                        router.pathname === '/shopping-cart' ? 'bag-navbar' : ''
                      }
                      onClick={() => setVisibleDesktop(false)}
                    />
                  </div>
                </Popover>
              ) : (
                <div style={{ position: 'absolute', right: 0, top: 6 }}>
                  <GlobalButton
                    image="/assets/icons/bag-white.png"
                    path={
                      router.pathname === '/shopping-cart'
                        ? ''
                        : '/shopping-cart'
                    }
                    text={
                      router.pathname === '/shopping-cart'
                        ? 'Você está no carrinho de compras'
                        : 'Ver carrinho de compras'
                    }
                    id={
                      router.pathname === '/shopping-cart' ? 'bag-navbar' : ''
                    }
                    onClick={() => {
                      dispatch(setCurrentCartSection(1));
                      setVisibleDesktop(false);
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </nav>

      <nav
        className={`mobile-navbar fixed z-10 top-0 w-[100vw] top-0 mt-0 mx-0 px-[0rem] border-2 border-transparent rounded-none pb-1 px-[2rem] h-[62px] bg-[#4A7D8B]`}
      >
        <ul className="flex justify-between items-center my-1">
          <li className="-me-3 -mt-1">
            {router.pathname !== '/shopping-cart' ? (
              <Popover
                content={cartPopoverContent}
                title={<strong className="text-[1.2rem]">Seu carrinho</strong>}
                trigger={
                  router.pathname === '/shopping-cart' ? 'manual' : 'click'
                }
                open={visibleMobile}
                onOpenChange={handleCartMobileClick}
                placement="bottomLeft"
              >
                <div style={{ position: 'relative', left: 0, top: 0 }}>
                  <GlobalButton
                    image="/assets/icons/bag-white.png"
                    text={
                      router.pathname === '/shopping-cart'
                        ? 'Você está no carrinho de compras'
                        : 'Ver carrinho de compras'
                    }
                    id={
                      router.pathname === '/shopping-cart' ? 'bag-navbar' : ''
                    }
                  />
                </div>
              </Popover>
            ) : (
              <div style={{ position: 'relative', left: 0, top: 0 }}>
                <GlobalButton
                  image="/assets/icons/bag-white.png"
                  text={
                    router.pathname === '/shopping-cart'
                      ? 'Você está no carrinho de compras'
                      : 'Ver carrinho de compras'
                  }
                  id={router.pathname === '/shopping-cart' ? 'bag-navbar' : ''}
                />
              </div>
            )}
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
              path="/favorites"
              text="Favoritos"
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
