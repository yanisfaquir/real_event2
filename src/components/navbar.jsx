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
import { useSelector } from 'react-redux';
import ApiClient from '../../apiClient';
import { clearUser, logout } from '@/redux/reducers/userReducer';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';

const Navbar = ({ inView }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const [visibleDesktop, setVisibleDesktop] = useState(false);
  const cartItems = services.services;
  const extraItemsCount = Math.max(0, cartItems.length - 2);
  const [visibleMobile, setVisibleMobile] = useState(false);
  const [isAcessibilityOpen, setIsAcessibilityOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const isWindows =
    typeof window !== 'undefined'
      ? window.navigator.userAgent.includes('Win')
      : false;

  const toggleAcessibilityList = () => {
    setIsShortcutsOpen(false);
    setIsAcessibilityOpen(!isAcessibilityOpen);
  };

  const toggleShortcutsList = () => {
    setIsShortcutsOpen(!isShortcutsOpen);
    setIsAcessibilityOpen(false);
  };

  const handleLogout = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logout());
    dispatch(clearUser());

    window.location.reload();
  };

  const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    transition: 'width 0.3s, margin 0.3s',
    marginLeft: theme.spacing(1),
    marginTop: "-4px", 
    marginRight: "-12px",
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    transition: theme.transitions.create('width'),
    width: '0',
    '&.expanded': {
      width: '200px', 
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      color: 'white',
    },
  }));;

  const [searchOpen, setSearchOpen] = React.useState(false);

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    const apiInstance = new ApiClient();
    // apiInstance.refreshAccessToken().then((response) => {
    //   if (!response) {
    //     handleLogout();
    //     return;
    //   }
    // });

    const handleRouteChange = (url) => {
      console.log('Rota alterada para:', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, dispatch]);

  useEffect(() => {
    if (isAcessibilityOpen) {
      document.querySelector('.accessibility-options').focus();
    }
  }, [isAcessibilityOpen]);

  useEffect(() => {
    if (isShortcutsOpen) {
      document.querySelector('.shortcuts-options').focus();
    }
  }, [isShortcutsOpen]);

  const {
    isCustomFont,
    toggleFont,
    getNextAlignment,
    getCurrentAlignmentTranslation,
    iconClicked,
    increaseFontSize,
    decreaseFontSize,
    increaseLineSpacing,
    increaseTextSpacing,
    toggleShortcut,
    enableShortcut,
    resetStyles,
    alignment,
    toggleAlignment,
    toggleHighContrast,
    highContrast,
    toggleImageInfo,
    showImageInfo,
  } = useContext(AccessibilityContext);

  const handleCartMobileClick = () => {
    if (router.pathname !== '/shopping-cart') {
      setVisibleMobile((prevState) => !prevState);
    }
  };

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navOpen && !event.target.closest('#menu-navbar')) {
        setTimeout(() => {
          setNavOpen(false);
        }, 200);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navOpen]);

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setNavOpen((prevNavOpen) => !prevNavOpen);
  };

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
      <div
        className={`p-2 cart-popover ${highContrast ? 'bg-black' : 'bg-white'}`}
      >
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
              className="rounded-[12px] ms-2 me-2 my-2"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
            <div
              className={`flex flex-col my-4 ${highContrast ? 'text-white' : 'text-black'}`}
            >
              <h2>
                <strong className="max-w-[120px]">{item.name}</strong>
              </h2>
              <p>Valor: €{item.price}</p>
            </div>
            <hr />
          </div>
        ))}
        {extraItemsCount > 0 && (
          <p className={`ms-2 ${highContrast ? 'text-white' : 'text-black'}`}>
            E mais {extraItemsCount} itens...
          </p>
        )}
        <div className="flex justify-between py-4">
          <li
            className="list-none rounded-[50px] w-[100%]"
            style={{
              boxShadow: `${highContrast ? '0 0 0 2px #fff000' : '0 0 0 2px #4A7D8B'}`,
            }}
          >
            <div>
              <GlobalButton
                path={
                  router.pathname === '/shopping-cart' ? '' : '/shopping-cart'
                }
                text={'Ver mais'}
                size="small"
                type="secondary"
                width="100"
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
      <div className="relative">
        <div
          className={`${enableShortcut ? 'flex' : 'hidden'} text-white shortcuts-container fixed bottom-[8%] z-10 border-[4px] border-white ${highContrast ? 'bg-black' : 'bg-[#4A7D8B]'} rounded-[50px] py-3 shadow-lg`}
        >
          {enableShortcut && (
            <li className={`list-none relative min-w-[56px] mx-2`}>
              <GlobalButton
                image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/shortcut-icon.svg`}
                text={
                  enableShortcut
                    ? 'Abrir lista de atalhos'
                    : 'Fechar lista de atalhos'
                }
                id={
                  enableShortcut
                    ? 'open-shortcuts-navbar'
                    : 'close-shortcuts-navbar'
                }
                onClick={toggleShortcutsList}
              />
            </li>
          )}

          {isShortcutsOpen && (
            <ul
              className={`${highContrast ? 'bg-black' : 'bg-[#4A7D8B]'} shortcuts-options ${isShortcutsOpen ? 'open' : ''}`}
            >
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">shift + c</strong>:
                Habilitar/Desabilitar Image Mapping
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">shift + x</strong>:
                Habilitar/Desabilitar Atalhos
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">shift + z</strong>: Restaurar
                estilização original
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + q</strong>: Alternar
                alinhamento do texto
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + b</strong>: Aumentar
                espaçamento entre linhas
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + shift + z</strong>:
                Diminuir tamanho da fonte
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + shift + x</strong>:
                Aumentar tamanho da fonte
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + shift + c</strong>:
                Aumentar espaçamento entre palavras
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + alt + q</strong>: Alterar
                Contraste
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + alt + d</strong>: Ir para a
                página inicial
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + alt + a</strong>: Ir para
                iniciar evento
              </li>
              <li className="list-none relative min-w-[56px]">
                <strong className="uppercase">ctrl + alt + s</strong>: Ir para
                carrinho de compras
              </li>
            </ul>
          )}
        </div>
        <div
          className={`accessibility-container fixed bottom-[8%] z-10 border-[4px] border-white ${highContrast ? 'bg-black' : 'bg-[#4A7D8B]'} rounded-[50px] py-3 shadow-lg`}
        >
          <li className={`list-none relative min-w-[56px]`}>
            <GlobalButton
              image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/acessibility-icon.svg`}
              text={
                isAcessibilityOpen
                  ? 'Fechar opções de acessibilidade'
                  : 'Abrir opções de acessibilidade'
              }
              id={
                isAcessibilityOpen
                  ? 'close-options-navbar'
                  : 'open-options-navbar'
              }
              onClick={toggleAcessibilityList}
            />
          </li>
          {isAcessibilityOpen && (
            <ul
              className={`${highContrast ? 'bg-black' : 'bg-[#4A7D8B]'} accessibility-options ${isAcessibilityOpen ? 'open' : ''}`}
            >
              <li className="list-none relative min-w-[56px]">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/serif-icon.svg`}
                  text={isCustomFont ? 'Remover serifa' : 'Aplicar serifa'}
                  id={
                    isCustomFont ? 'remove-serif-navbar' : 'apply-serif-navbar'
                  }
                  onClick={toggleFont}
                />
              </li>
              <li className="list-none relative min-w-[56px]">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/aligment-icon.svg`}
                  text={`Alinhamento: ${getCurrentAlignmentTranslation() ? getCurrentAlignmentTranslation() : 'clique para definir'}`}
                  id={`aligment-navbar-${getNextAlignment()}`}
                  onClick={toggleAlignment}
                ></GlobalButton>
                {iconClicked && getCurrentAlignmentTranslation() && (
                  <span className="absolute bottom-0 right-2 text-xs bg-white px-1 rounded-md font-bold">
                    {getCurrentAlignmentTranslation().charAt(0).toUpperCase()}
                  </span>
                )}
              </li>
              <li className="list-none relative -mt-1 min-w-[56px]">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/leading-increase-icon.svg`}
                  text={`Aumentar espaçamento entre linhas`}
                  id={`increase-leading-navbar`}
                  onClick={increaseLineSpacing}
                />
              </li>
              <li className="list-none relative mt-2 min-w-[56px]">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/decrease-font-icon.svg`}
                  text={`Diminuir fonte`}
                  id={`decrease-font-navbar`}
                  onClick={decreaseFontSize}
                />
              </li>
              <li className="list-none relative mt-2 min-w-[56px]">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/increase-font-icon.svg`}
                  text={`Aumentar fonte`}
                  id={`increase-font-navbar`}
                  onClick={increaseFontSize}
                />
              </li>
              <li className="list-none relative mt-2 min-w-[56px]">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/word-spacing-icon.svg`}
                  text={`Aumentar espaçamento entre palavras`}
                  id={`increase-leading-text-navbar`}
                  onClick={increaseTextSpacing}
                />
              </li>
              <li className="list-none relative mt-2 min-w-[56px]">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/high-contrast-icon.svg`}
                  text={`Alterar contraste`}
                  id={`high-contrast-navbar`}
                  onClick={toggleHighContrast}
                />
              </li>
              <li className="list-none relative mt-2 min-w-[56px] image-mapping-button">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/mark-icon.svg`}
                  text={
                    showImageInfo
                      ? 'Desabilitar Image Mapping'
                      : `Habilitar Image Mapping`
                  }
                  id={`mark-navbar`}
                  onClick={toggleImageInfo}
                />
              </li>
              {isWindows && (
                <li className="list-none relative mt-2 min-w-[46px] shortcut-button">
                  <GlobalButton
                    image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/shortcut-icon.svg`}
                    text={
                      enableShortcut
                        ? 'Desabilitar atalhos'
                        : 'Habilitar atalhos'
                    }
                    id={`shortcuts-navbar`}
                    onClick={toggleShortcut}
                  />
                </li>
              )}
              <li className="list-none relative mt-2 min-w-[56px]">
                <GlobalButton
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/font-regular-icon.svg`}
                  text={`Restaurar estilização`}
                  id={`reset-style-navbar`}
                  onClick={resetStyles}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
      <nav
        className={`desktop-navbar fixed z-10 top-0 left-1/2 transform -translate-x-1/2 mt-5 border-4 border-white ${highContrast ? 'bg-black' : 'bg-[#4A7D8B]'} rounded-[50px] pb-2 px-[2rem] h-[60px] ${
          inView
            ? ''
            : `desktop-navbar-scrolled fixed z-10 w-[100vw] mt-[0px] mx-[0px] px-[0rem] border-none border-bottom-2 border-transparent rounded-none px-[2rem] h-[55px] ${highContrast ? 'bg-black' : 'bg-[#4A7D8B]'}`
        }`}
      >
        <div className="flex justify-between items-center">
          <section className="w-1/4 py-2 flex items-center">
            <div className="-mt-2">
              <GlobalButton
                image="/assets/icons/realevent-icon.png"
                path="/"
                text={`Ir à Página inicial`}
                id="logo-navbar"
              />
            </div>
          </section>

          <section className="w-1/2 pb-2 gap-2 flex justify-center items-center">
            <GlobalButton
              size="medium"
              type="custom"
              path="/about"
              text="Sobre"
            />
            <GlobalButton
              size="medium"
              type="custom"
              path="/suppliers"
              text="Fornecedores"
            />
            <GlobalButton
              size="medium"
              type="custom"
              path="/services"
              text="Serviços"
            />
          </section>

          <section className="w-1/4 py-2 flex justify-end items-center align-center">
            {/* <div className={`mb-[2px]`}>
              <GlobalButton
                image={`${user ? user?.photo : `/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/user-white.svg`}`}
                path={`${user ? '/profile' : '/login'}`}
                text={`${user ? user?.name : 'Conecte-se'}`}
                id="user-navbar"
                width="40"
                customClass={`${user?.photo ? 'rounded-button' : ''}`}
              />
            </div> */}
            <div className={`mb-[2px] flex`}>
            {/* <Search sx={{ marginLeft: searchOpen ? '0' : 'auto' }}>
                <SearchIconWrapper>
                  <IconButton size="large" aria-label="search" color="inherit" onClick={handleSearchToggle}>
                  <SearchIcon sx={{ color: 'white', fontSize: '2rem' }} />
                  </IconButton>
                </SearchIconWrapper>
                <StyledInputBase
                  className={searchOpen ? 'expanded' : ''}
                  placeholder="Pesquisar..."
                  inputProps={{ 'aria-label': 'search' }}
                  color='white'
                />
              </Search> */}


            </div>
            <div className={`mb-[2px] flex`}>
              <GlobalButton
                image={`${user ? user?.photo : `/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/user-white.svg`}`}
                path={`${user ? '/profile' : '/login'}`}
                text={`${user ? user.name || user.name_company  : 'Conecte-se'}`}
                id="user-navbar"
                width="30"
                customClass={`${user?.photo ? 'rounded-button' : ''}`}
              />
            </div>
            {user && (
              <div
                style={{ position: 'relative', width: '18%', height: '44px' }}
              >
                <div style={{ position: 'absolute', right: 0, top: 6 }}>
                  <GlobalButton
                    image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/logout-icon.svg`}
                    text={`Encerrar sessão`}
                    id="logout-navbar"
                    onClick={handleLogout}
                    width="36"
                  />
                </div>
              </div>
            )}

            <div style={{ position: 'relative', width: '18%', height: '44px' }}>
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
                      image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/bag-white.svg`}
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
                    image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/bag-white.svg`}
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
        className={`mobile-navbar fixed z-10 top-0 w-[100vw] top-0 mt-0 mx-0 px-[0rem] border-2 border-transparent rounded-none pb-1 px-[2rem] h-[62px] ${highContrast ? 'bg-black' : 'bg-[#4A7D8B]'}`}
      >
        <ul className="flex justify-between items-center mt-2">
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
                    image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/bag-white.svg`}
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
                  image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/bag-white.svg`}
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
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </Link>
          </li>
          <li className="-me-4" onClick={handleButtonClick}>
            <GlobalButton
              image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/menu-white.svg`}
              text={`${navOpen ? 'Recolher Menu' : 'Abrir Menu'}`}
              id="menu-navbar"
            />
          </li>
        </ul>
        <ul
          className={`sidemenu flex flex-col h-[100%] items-center fixed transition-all object-cover transition duration-300 z-9 ${highContrast ? 'bg-black' : 'bg-[#4A7D8B]'} ${
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
              path="/suppliers"
              text="Fornecedores"
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
              image={`${user ? user.photo : `/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/user-white.svg`}`}
              path={`${user ? '/profile' : '/login'}`}
              text={`${user ? user.name || user.name_company : 'Conecte-se'}`}
              id="user-navbar"
              width="40"
              customClass={`${user?.photo ? 'rounded-button' : ''}`}
            />
          </li>
          <li className="py-4">
            {user && (
              <GlobalButton
                text={`Encerrar sessão`}
                size="large"
                type="custom"
                onClick={handleLogout}
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
