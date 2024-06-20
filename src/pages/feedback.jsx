import React, { useState, useContext, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ApiClient from '../../apiClient';
import { AccessibilityContext } from '@/contexts/acessibility';
import { login } from '../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';

const Feedback = () => {
  const dispatch = useDispatch();
  const [googleRedirectUrl, setGoogleRedirectUrl] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Utilizador');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { alignment, highContrast, fontSize } =
    useContext(AccessibilityContext);
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [httpResponse, setResponseValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rating, setRating] = useState(0); // Estado para armazenar a avaliação selecionada

  useEffect(() => {
    if (email !== '') {
      setEmailError('');
    }
    if (password !== '') {
      setPasswordError('');
      setErrorMessage('');
    }
  }, [email, password]);

  const handleInputBlur = (field) => {
    if (field === 'email' && email.trim() === '') {
      setEmailError('Campo obrigatório');
    } else if (field === 'password' && password.trim() === '') {
      setPasswordError('Campo obrigatório');
    } else {
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(email));
        setEmailError('');
        setErrorMessage('');
      }
      if (field === 'password') {
        setPasswordError('');
        setErrorMessage('');
      }
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, insira o email e senha');
    } else {
      setErrorMessage('');
      try {
        const apiInstance = new ApiClient();
        const roleValue = role === 'Fornecedor' ? 'supplier' : 'user';
        const response = await apiInstance.authenticate(
          email,
          password,
          roleValue
        );
        console.log(response);
        if (response.status === 200) {
          dispatch(login(response.data.user));
          router.push('/');
        } else {
          console.error('Erro ao tentar fazer login.');
          setErrorMessage('Erro ao tentar fazer login.');
        }
      } catch (error) {
        console.error(error);
        setResponseValue(error.message);
        setErrorMessage('Erro ao tentar fazer login.');
      }
    }
  };

  // Função para atualizar a avaliação ao clicar em uma estrela
  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1); // Incrementa o índice em 1 para a avaliação real (1 a 5 estrelas)
  };

  return (
    <div className="sm:mt-32 md:mt-16">
      <div className="flex flex-col md:flex-row mt-8 md:mt-16 p-6 md:pt-20 bg-cover bg-no-repeat mx-4 md:mt-20 md:mx-20 rounded-lg md:rounded-[40px]">
        <div
          className={`md:w-1/2 ${
            highContrast ? 'bg-black border border-white' : 'bg-[#4A7D8B]'
          } text-white rounded-l-[40px] hidden md:block py-12 px-4 flex flex-col justify-between shadow-lg`}
        >
          <Image
            src="/assets/pictures/logomarca-white.png"
            alt="Logomarca Realevent"
            width={560}
            height={64}
            id="logo-navbar-home"
            className={`relative flex align-center mx-auto z-10 ${
              highContrast ? 'bg-black' : 'bg-unset'
            }`}
            style={{
              maxWidth: '50%',
              height: 'auto',
            }}
          />

          <p
            className={`px-8 my-20 text-center`}
            style={{
              textAlign: `${alignment ? alignment : 'center'}`,
              fontSize: `${fontSize * 24}px`,
            }}
          >
            Esperamos que o seu evento seja um sucesso! O seu Feedback é muito importante para nós para que possamos melhorar cada vez mais. Agradecemos a sua colaboração!
          </p>
        </div>
        <div
          className={`w-full md:w-1/2 flex flex-col justify-center items-center ${
            highContrast ? 'bg-black border border-white' : 'bg-white'
          } rounded-[40px] md:rounded-l-none md:rounded-r-[40px] md:mt-0 mt-16 shadow-lg`}
          style={{
            textAlign: `${alignment ? alignment : 'start'}`,
          }}
        >
          <h1
            className={`${
              highContrast ? 'text-white' : 'text-gray-700'
            } text-center font-bold pb-4 pt-16 relative top-0`}
            style={{
              textAlign: `${alignment ? alignment : 'center'}`,
              fontSize: `${fontSize * 40}px`,
            }}
          >
            FeedBack
          </h1>
          <div className="w-full flex justify-center items-center flex-col max-w-xs pb-12">
            <Image
              src={`/assets/icons/feedback.svg`}
              alt={`Utilizador`}
              className={`relatize z-0`}
              width={80}
              height={80}
              style={{
                maxWidth: '100%',
                height: 'auto',
                color: '#4A7D8B',
              }}
            />
            <form className="px-4 py-8" onSubmit={handleSubmit}>
              <div className="flex mb-4 items-center">
                <label
                  style={{
                    textAlign: `${alignment ? alignment : 'start'}`,
                    fontSize: `${fontSize * 20}px`,
                  }}
                  className={`font-bold mr-4`}
                >
                  Nome:
                </label>

                <label
                  style={{
                    textAlign: `${alignment ? alignment : 'start'}`,
                    fontSize: `${fontSize * 20}px`,
                  }}
                  className={`font-semi-bold mr-4`}
                >
                  Fornecedor1
                </label>
              </div>

              <div className="flex mb-4 items-center">
                <label
                  style={{
                    textAlign: `${alignment ? alignment : 'start'}`,
                    fontSize: `${fontSize * 20}px`,
                  }}
                  className={`font-bold mr-4`}
                >
                  Avaliação:
                </label>

                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-6 h-6 ${
                        index < rating ? 'text-customBlue' : 'text-gray-300'
                      } cursor-pointer`}
                      onClick={() => handleStarClick(index)}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                      style={{ marginRight: '4px' }} // Espaçamento entre os ícones de estrela
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  style={{
                    textAlign: `${alignment ? alignment : 'start'}`,
                    fontSize: `${fontSize * 20}px`,
                  }}
                  className={`font-bold`}
                >
                  Mensagem:
                </label>
                <textarea
                  className="border border-gray-300 rounded px-2 py-2 w-full  "
                  rows="5"
                  placeholder="Digite sua mensagem..."
                  // Aqui você pode adicionar um estado e um manipulador para controlar o valor do textarea, se necessário
                />
              </div>



              <div className="flex justify-center">
                <GlobalButton
                  size="small"
                  type="primary"
                  text="Enviar"
                  disabled={
                    passwordError || emailError || !isValidEmail || errorMessage
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
