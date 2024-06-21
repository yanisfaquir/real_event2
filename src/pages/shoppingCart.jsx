import React, { useState, useEffect, useContext } from 'react';
import services from '../components/services.json';
import MicrophoneIcon from '@/components/microphoneIcon';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'evergreen-ui';
import { setCurrentCartSection } from '@/redux/reducers/cartReducer';
import { AccessibilityContext } from '@/contexts/acessibility';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(services.services);
  const [isStreaming, setIsStreaming] = useState({});
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [currentSection, setCurrentSection] = useState({
    number: 1,
    text: 'Ir à Página Inicial',
  });
  const currentSectionNumber = useSelector(
    (state) => state.cart.currentSection
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const { highContrast, alignment, showImageInfo } =
    useContext(AccessibilityContext);

  const handleCartSectionClick = () => {
    setCurrentSection((prevState) => ({
      number: prevState.number + 1,
      text:
        prevState.number + 1 === 2
          ? 'Retornar ao carrinho'
          : 'Retornar ao checkout',
    }));
    dispatch(setCurrentCartSection(currentSection.number + 1));
  };

  const handlePaymentClick = (id) => {
    setSelectedPaymentId(id);
  };

  const handleReturnToCartClick = () => {
    setCurrentSection((prevState) => ({
      number: prevState.number - 1,
      text:
        prevState.number - 1 === 1
          ? 'Retornar ao checkout'
          : 'Retornar ao carrinho',
    }));
    dispatch(setCurrentCartSection(currentSection.number - 1));
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsDesktopOrLaptop(mediaQuery.matches);

    const handler = (event) => {
      setIsDesktopOrLaptop(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  let total = 0;

  const handlePromoSubmit = () => {
    let discountRate;
    switch (promoCode.toLowerCase()) {
      case 'real10':
        discountRate = 0.1;
        break;
      case 'real15':
        discountRate = 0.15;
        break;
      case 'real20':
        discountRate = 0.2;
        break;
      default:
        setDiscount(0);
        setPromoError('Este cupom não existe, tente outro');
        setAppliedPromoCode('');
        return;
    }
    setPromoError('');
    setDiscount(discountRate);
    setAppliedPromoCode(promoCode);
  };

  const handleOpenDialog = (item) => {
    setDialogOpen(true);
    setItemToRemove(item);
  };

  const handleRemoveItem = (itemToRemove) => {
    setDialogOpen(false);
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
  };

  const handleRemoveDiscount = () => {
    setDiscount(0);
    setPromoError('Seu cupom foi removido');
    setAppliedPromoCode('');
  };

  const handleSpeechRecognition = (field, id) => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'pt-PT';
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsStreaming((prevState) => ({ ...prevState, [id]: true }));
      };

      recognition.onend = () => {
        setIsStreaming((prevState) => ({ ...prevState, [id]: false }));
      };

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`Texto falado para ${field}: ${speechResult}`);

        recognition.onstart = () => {
          setIsStreaming(true);
        };

        switch (field) {
          case 'promoCode':
            setPromoCode((prevState) => prevState + speechResult);
            break;
          default:
            break;
        }
      };

      recognition.start();
    } catch (error) {
      console.error('Erro ao iniciar o reconhecimento de fala:', error);
    }
  };

  return (
    <div
      className={`flex justify-between w-full px-[5vw] ${isDesktopOrLaptop ? '' : 'flex-col'}`}
    >
      <section
        className={`view-cart-elements cart-form-1 ${currentSectionNumber == '1' ? 'move-in visible h-auto block' : 'hidden move-out invisible h-0 overflow-hidden'} mb-8 shadow-md rounded-[50px] ${highContrast ? 'bg-black' : 'bg-[#F7F7F7]'} relative ${isDesktopOrLaptop ? 'min-w-[42vw]' : 'min-w-[60vw] mx-auto left-50 right-50 px-4'} mt-20 lg:mt-32`}
      >
        <h1
          className={`font-bold text-[1.5rem] relative left-1/2 transform -translate-x-1/2 p-8`}
          style={{
            textAlign: `${alignment ? alignment : 'start'}`,
          }}
        >
          MEU CARRINHO
          <hr />
        </h1>

        <ul className="flex flex-col justify-center items-center w-[100%]">
          {cartItems.map((item, index) => {
            total += item.price;
            return (
              <li
                id={`item-${index}`}
                key={index}
                style={{
                  width: '90%',
                  minHeight: '120px',
                  borderRadius: '8px',
                }}
                className={`flex items-center align-center p-8 my-8 ${highContrast ? 'border-white' : 'border-[#4A7D8B]'} shadow-md border-2 ${isDesktopOrLaptop ? '' : 'flex-col'}`}
              >
                <div
                  className={`flex justify-between items-center w-[100%] ${isDesktopOrLaptop ? '' : 'flex-col'}`}
                >
                  <div
                    className={`flex justify-start items-center w-[100%] ${isDesktopOrLaptop ? '' : 'flex-col'}`}
                  >
                    <Image
                      alt={item.name}
                      src={item.image}
                      width={100}
                      height={100}
                      className="rounded-[12px] mx-4"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      className={`flex w-[100%] ${isDesktopOrLaptop ? 'flex-col justify-start items-start' : 'flex-col justify-center items-center'}`}
                    >
                      <p
                        className={`font-bold text-[1.2rem]`}
                        style={{
                          textAlign: `${alignment ? alignment : 'start'}`,
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className={`font-[.8rem]`}
                        style={{
                          color: '#666a74',
                          textAlign: `${alignment ? alignment : 'start'}`,
                        }}
                      >
                        €{item.price}
                      </p>
                      <p
                        className={`font-[.8rem]`}
                        style={{
                          color: '#666a74',
                          textAlign: `${alignment ? alignment : 'start'}`,
                        }}
                      >
                        {item.location}
                      </p>
                      <p
                        className="font-[.8rem]"
                        style={{
                          color: '#666a74',
                          textAlign: `${alignment ? alignment : 'start'}`,
                        }}
                      >
                        {' '}
                        <Image
                          src={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/star-icon-black.svg`}
                          alt="Avaliação"
                          id="star-evaluation"
                          width={16}
                          className="inline -mt-1"
                          height={16}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                          }}
                        />{' '}
                        <span
                          className="inline font-bold"
                          style={{
                            textAlign: `${alignment ? alignment : 'start'}`,
                          }}
                        >
                          {item.rating}{' '}
                        </span>
                        <span
                          className="inline font-regular"
                          style={{
                            textAlign: `${alignment ? alignment : 'start'}`,
                          }}
                        >
                          ({item.reviews})
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`rounded-[50px] flex justify-center py-3 ${highContrast ? 'border-white shadow-white' : 'border-[#4A7D8B] shadow-[#dddddd]'} shadow-md`}
                  >
                    <GlobalButton
                      image={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/trash-black.svg`}
                      onClick={() => handleOpenDialog(item)}
                      text={'Remover item da lista do carrinho'}
                      id={'remove-item'}
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <li>
            {' '}
            <div
              className={`flex justify-between p-8 ${isDesktopOrLaptop ? 'w-[40vw]' : 'w-[80vw]'} `}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Total</h2>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#000000',
                }}
              >
                €{total}
              </h2>
            </div>
          </li>
        </ul>
      </section>

      <section
        className={`cart-form-2 ${currentSectionNumber == '2' ? 'move-in visible h-auto' : 'move-out invisible h-0 overflow-hidden'} mb-8 shadow-md rounded-[50px] bg-[#F7F7F7] relative ${isDesktopOrLaptop ? 'min-w-[42vw]' : 'min-w-[60vw] mx-auto left-50 right-50 px-4'} mt-20 lg:mt-32`}
      >
        <h1
          className={`font-bold text-[1.5rem] relative left-1/2 transform -translate-x-1/2 p-8`}
        >
          FORMAS DE PAGAMENTO
          <hr />
        </h1>
        <h2
          className={`font-bold text-[1rem] relative left-1/2 transform -translate-x-1/2 px-8 py-2`}
        >
          Selecione abaixo qual a forma que irás efetuar o pagamento
        </h2>

        <ul
          className={`grid p-9 ${isDesktopOrLaptop ? 'grid-cols-2 grid-rows-2' : 'grid-cols-1'} justify-center items-center w-[100%] gap-4`}
        >
          <li
            style={{
              width: '160px',
              minHeight: '160px',
              borderRadius: '8px',
              margin: 'auto',
              cursor: 'pointer',
              backgroundColor:
                selectedPaymentId === 'pay-multibanco' ? '#E0E0E0' : '#F7F7F7',
              border:
                selectedPaymentId === 'pay-multibanco'
                  ? '2px solid #4A7D8B'
                  : 'none',
            }}
            className={`flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2 bg-[#F7F7F7] hover:bg-[#E0E0E0] transition-colors duration-200`}
            onClick={() => handlePaymentClick('pay-multibanco')}
          >
            <Image
              src={'/assets/pictures/multibanco_mbway1.png'}
              alt="Logomarca Multibanco"
              id="pay-multibanco"
              width={100}
              height={100}
              className="w-full"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </li>{' '}
          <li
            style={{
              width: '160px',
              minHeight: '160px',
              borderRadius: '8px',
              margin: 'auto',
              cursor: 'pointer',
              backgroundColor:
                selectedPaymentId === 'pay-mbway' ? '#E0E0E0' : '#F7F7F7',
              border:
                selectedPaymentId === 'pay-mbway'
                  ? '2px solid #4A7D8B'
                  : 'none',
            }}
            className={`flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2 bg-[#F7F7F7] hover:bg-[#E0E0E0] transition-colors duration-200`}
            onClick={() => handlePaymentClick('pay-mbway')}
          >
            <Image
              src={'/assets/pictures/multibanco_mbway3.png'}
              alt="Logomarca MBWAY"
              id="pay-mbway"
              width={100}
              height={100}
              className="w-full"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </li>
          <li
            style={{
              width: '160px',
              minHeight: '160px',
              borderRadius: '8px',
              margin: 'auto',
              cursor: 'pointer',
              backgroundColor:
                selectedPaymentId === 'pay-paypal' ? '#E0E0E0' : '#F7F7F7',
              border:
                selectedPaymentId === 'pay-paypal'
                  ? '2px solid #4A7D8B'
                  : 'none',
            }}
            className={`flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2 bg-[#F7F7F7] hover:bg-[#E0E0E0] transition-colors duration-200`}
            onClick={() => handlePaymentClick('pay-paypal')}
          >
            <Image
              src={'/assets/pictures/Paypal_2014_logo1.png'}
              alt="Logomarca Paypal"
              id="pay-paypal"
              width={100}
              height={100}
              className="w-full"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </li>
          <li
            style={{
              width: '160px',
              minHeight: '160px',
              borderRadius: '8px',
              margin: 'auto',
              cursor: 'pointer',
              backgroundColor:
                selectedPaymentId === 'pay-credit-card' ? '#E0E0E0' : '#F7F7F7',
              border:
                selectedPaymentId === 'pay-credit-card'
                  ? '2px solid #4A7D8B'
                  : 'none',
            }}
            className={`flex items-center align-center p-8 my-8 border-[#4A7D8B] shadow-md border-2 bg-[#F7F7F7] hover:bg-[#E0E0E0] transition-colors duration-200`}
            onClick={() => handlePaymentClick('pay-credit-card')}
          >
            <Image
              src={'/assets/pictures/Visa-mastercard-logos1.png'}
              alt="Logomarca Visa e Mastercad"
              id="pay-credit-card"
              width={100}
              height={100}
              className="w-full"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </li>
        </ul>
      </section>

      <section
        className={`cart-form-3 ${currentSectionNumber == '3' ? 'move-in visible h-auto' : 'move-out invisible h-0 overflow-hidden'}`}
      >
        FASE DE CONFIRMAR DADOS DO UTILIZADOR
      </section>

      <section
        className={`view-cart-elements mb-8 rounded-[50px] flex justify-center border-[#4A7D8B] shadow-md border-2 ${isDesktopOrLaptop ? 'fixed min-w-[42vw] right-[5vw]' : 'relative min-w-[60vw] mx-auto left-50 right-50 px-4'} mt-20 lg:mt-32`}
      >
        <div className="flex flex-col justify-between items-center h-full py-8">
          <div className="flex flex-col">
            <label
              className="flex flex-col"
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: `${alignment ? alignment : 'start'}`,
              }}
            >
              CÓDIGO PROMOCIONAL
              <div className="flex justify-between items-center relative">
                <input
                  type="text"
                  placeholder="Digite aqui"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`flex-grow ${isDesktopOrLaptop ? 'w-3/5' : 'w-2/5'} rounded-s-md mt-1 ${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
                  style={{
                    padding: '7px',
                    border: '1px solid #ccc',
                    paddingRight: '32px',
                    width: '100%',
                  }}
                />
                <MicrophoneIcon
                  handleSpeechRecognition={handleSpeechRecognition}
                  isStreaming={isStreaming['micPromoCode']}
                  id="micPromoCode"
                  field="promoCode"
                  right="150"
                />
                <button
                  onClick={handlePromoSubmit}
                  className={`${highContrast ? 'bg-[#fff000] text-black' : 'bg-[#4A7D8B] text-white'} -ms-1 mt-1 ${isDesktopOrLaptop ? 'w-2/5' : 'w-3/5'} rounded-2 p-2 hover:bg-[#7D9EA8] rounded-e-md`}
                >
                  Submeter
                </button>
              </div>
              <div
                className={`${promoError || discount ? 'visible' : 'invisible'} flex items-center align-center`}
                style={{
                  color: promoError ? 'red' : promoCode ? 'black' : 'inherit',
                  marginTop: '5px',
                  fontWeight: '100',
                  fontSize: '20px',
                }}
              >
                {promoError ? (
                  promoError
                ) : (
                  <span>
                    Cupom aplicado:{' '}
                    <strong>{appliedPromoCode.toUpperCase()}</strong>
                  </span>
                )}
                {appliedPromoCode ? (
                  <div className="mt-2">
                    <GlobalButton
                      image={'/assets/icons/x-icon-red.svg'}
                      text="Remover cupom"
                      id="remove-promo"
                      width={4}
                      height={4}
                      onClick={handleRemoveDiscount}
                    />
                  </div>
                ) : null}
              </div>
            </label>
            <div className="flex justify-between mt-8 w-[100%]">
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Desconto</h2>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#666a74',
                }}
              >
                -€{discount ? total * discount : 0}
              </h2>
            </div>
            <div className="flex justify-between mt-8 w-[100%]">
              <h2 style={{ fontSize: '40px', fontWeight: 'bold' }}>
                Total estimado
              </h2>
              <h2
                style={{
                  fontSize: '40px',
                  fontWeight: 'bold',
                }}
              >
                €{discount ? total - total * discount : total}
              </h2>
            </div>
          </div>
          <div className="mt-40 w-[100%]">
            {currentSection.number === 2 ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <li
                  className="list-none rounded-[50px]"
                  style={{ boxShadow: '0 0 0 2px #4A7D8B' }}
                >
                  <div>
                    <GlobalButton
                      size="medium"
                      type="secondary"
                      text="Retornar"
                      width="40%"
                      onClick={handleReturnToCartClick}
                    />
                  </div>
                </li>

                <GlobalButton
                  size="medium"
                  type="primary"
                  text="Seguinte"
                  width="40%"
                  onClick={handleCartSectionClick}
                />
              </div>
            ) : (
              <GlobalButton
                size="medium"
                type="primary"
                text="CHECKOUT"
                width="100%"
                onClick={async () => {
                  const response = await fetch(
                    'http://localhost:3500/create-checkout-session', 
                    {
                      method :'GET',
                      headers: {
                        Authorization: 'Bearer ${localStorage.getItem("token")}'
                      }
                    }
                  );
                  const { url } = await response.json();
                  window.location = url;
                }}
              />
            )}
          </div>
        </div>
      </section>
      <div>
        {dialogOpen && (
          <Dialog
            title={
              <span>
                Remover item: <strong>{itemToRemove.name}</strong>
              </span>
            }
            isShown={dialogOpen}
            onCloseComplete={() => setDialogOpen(false)}
            confirmLabel="Fechar"
            hasFooter={false}
            style={{
              backgroundColor: highContrast ? '#000000' : '#ffffff',
            }}
          >
            <Image
              alt={itemToRemove.name}
              src={itemToRemove.image}
              width={200}
              height={200}
              className="rounded-[12px] mx-auto mt-4"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
            <p
              className={`font-[.8rem] my-2 mx-auto`}
              style={{
                color: '#666a74',
              }}
            >
              Valor: €{itemToRemove.price}
            </p>
            <p className={`font-[.8rem] mx-auto`}>
              Você tem certeza de que deseja remover este item?
            </p>
            <div className="flex justify-end mt-4 p-8">
              <li
                className="list-none rounded-[50px]"
                style={{ boxShadow: '0 0 0 2px #4A7D8B' }}
              >
                <div>
                  <GlobalButton
                    text={'Cancelar'}
                    size="small"
                    type="secondary"
                    onClick={() => setDialogOpen(false)}
                  />
                </div>
              </li>
              <li
                className="list-none rounded-[50px] bg-[#990000] ms-4"
                style={{ boxShadow: '0 0 0 2px #990000' }}
              >
                <div>
                  <GlobalButton
                    text={'Remover'}
                    size="small"
                    type="secondary"
                    onClick={() => handleRemoveItem(itemToRemove)}
                  />
                </div>
              </li>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
