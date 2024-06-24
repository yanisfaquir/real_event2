import React, { useState, useContext, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ApiClient from '../../apiClient';
import { AccessibilityContext } from '@/contexts/acessibility';
import { login } from '../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const LoginPage = () => {
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

  const handleLoginWithGoogle = () => {
    // Substitua 'YOUR_GOOGLE_CLIENT_ID' pelo seu ID de cliente do Google OAuth
    const googleClientId = 'YOUR_GOOGLE_CLIENT_ID';
    const redirectUri = encodeURIComponent(window.location.origin);
    const choosedRole = role == 'Utilizador' ? 'user' : 'supplier';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile&role=${encodeURIComponent(choosedRole)}`;

    window.location.href = authUrl;
  };

  const RoleRadioButton = ({ value, checked, onChange }) => (
    <label className="flex flex-col justify-center items-center">
      <input
        type="radio"
        name="role"
        value={value}
        checked={checked}
        onChange={onChange}
        className={`date-checkbox ${highContrast ? 'high-contrast' : ''}`}
      />
      <span
        className={`${highContrast ? 'text-[#FFF000]' : 'text-black'} cursor-pointer`}
        style={{
          marginTop: `4px`,
          fontSize: `${fontSize * 20}px`,
          textAlign: `${alignment ? alignment : 'start'}`,
        }}
      >
        {value}
      </span>
    </label>
  );

  useEffect(() => {
    if (email != '') {
      setEmailError('');
    }
    if (password != '') {
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
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, insira o email e senha');
    } else {
      setErrorMessage('');
      try {
        const apiInstance = new ApiClient();
        let roleValue = role == 'Fornecedor' ? 'supplier' : 'user';
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

  return (
    <div className="sm:mt-32 md:mt-16">
      <div className="flex flex-col md:flex-row mt-8 md:mt-16 p-6 md:pt-20 bg-cover bg-no-repeat mx-4 md:mt-20 md:mx-20 rounded-lg md:rounded-[40px]">
        <div
          className={`md:w-1/2 ${highContrast ? 'bg-black border border-white' : 'bg-[#4A7D8B]'} text-white rounded-l-[40px] hidden md:block py-12 px-4 flex flex-col justify-between shadow-lg`}
        >
          <Image
            src="/assets/pictures/logomarca-white.png"
            alt="Logomarca Realevent"
            width={560}
            height={64}
            id="logo-navbar-home"
            className={`relative flex align-center mx-auto z-10 ${highContrast ? 'bg-black' : 'bg-unset'}`}
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
            Com um login na nossa plataforma, como Utilizador poderá criar e
            atualizar seus eventos.
          </p>
          <p
            className="px-8 my-20 text-center"
            style={{
              textAlign: `${alignment ? alignment : 'center'}`,
              fontSize: `${fontSize * 24}px`,
            }}
          >
            Como Fornecedor, poderá divulgar e atualizar seus serviços.
          </p>
          <p
            className="px-8 my-20 text-center"
            style={{
              textAlign: `${alignment ? alignment : 'center'}`,
              fontSize: `${fontSize * 24}px`,
            }}
          >
            A RealEvent lhes dá as boas-vindas!
          </p>
        </div>
        <div
          className={`w-full md:w-1/2 flex flex-col justify-center items-center ${highContrast ? 'bg-black border border-white' : 'bg-white'} rounded-[40px] md:rounded-l-none md:rounded-r-[40px] md:mt-0 mt-16 shadow-lg`}
          style={{
            textAlign: `${alignment ? alignment : 'start'}`,
          }}
        >
          {' '}
          <h1
            className={`${highContrast ? 'text-white' : 'text-gray-700'} text-center font-bold pb-4 pt-16 realtive top-0`}
            style={{
              textAlign: `${alignment ? alignment : 'center'}`,
              fontSize: `${fontSize * 40}px`,
            }}
          >
            LOGIN
          </h1>
          <div className="w-full flex justify-center items-center flex-col max-w-xs pb-12">
            <Image
              src={`/assets/icons/user-${highContrast ? 'white' : 'black'}.svg`}
              alt={`Utilizador`}
              className={`relatize z-0`}
              width={80}
              height={80}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <form className="px-4 py-8" onSubmit={handleSubmit}>
              <div className="mb-4 w-100">
                <label
                  style={{
                    textAlign: `${alignment ? alignment : 'start'}`,
                    fontSize: `${fontSize * 20}px`,
                  }}
                  className={`font-bold`}
                >
                  Email:
                  <div className="flex row" style={{ position: 'relative' }}>
                    <input
                      type="email"
                      value={email}
                      autoComplete="off"
                      className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/\s+/g, ' ');
                        value = value.replace(/^\s+/, '');
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (value.trim() != '') {
                          setIsValidEmail(emailRegex.test(value));
                        } else {
                          setShowRequiredMessage(true);
                        }
                        setEmail(value);
                      }}
                      onBlur={() => handleInputBlur('email')}
                      placeholder="Digite aqui"
                      required
                      style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginTop: '4px',
                        paddingRight: '30px',
                        width: '100%',
                      }}
                    />
                  </div>
                  {!isValidEmail && !emailError && (
                    <p
                      aria-live="polite"
                      className={` ${'text-red-600'}`}
                      style={{
                        fontSize: `${fontSize * 12}px`,
                        marginTop: '4px',
                        textAlign: `${alignment ? alignment : 'start'}`,
                      }}
                    >
                      Insira um email válido
                    </p>
                  )}
                  {errorMessage && (
                    <p
                      aria-live="polite"
                      className={` ${'text-red-600'}`}
                      style={{
                        fontSize: `${fontSize * 12}px`,
                        marginTop: '4px',
                        textAlign: `${alignment ? alignment : 'start'}`,
                      }}
                    >
                      {httpResponse || errorMessage}
                    </p>
                  )}
                  <p
                    aria-live="polite"
                    className={` ${
                      emailError ? 'visible text-red-600' : 'invisible'
                    }`}
                    style={{
                      marginTop: `${emailError ? '4px' : ''}`,
                      fontSize: `${fontSize * 12}px`,
                      textAlign: `${alignment ? alignment : 'start'}`,
                    }}
                  >
                    Campo obrigatório
                  </p>
                </label>
              </div>
              <div className="mb-6">
                <label
                  style={{
                    textAlign: `${alignment ? alignment : 'start'}`,
                    fontSize: `${fontSize * 20}px`,
                  }}
                  className={`font-bold`}
                >
                  Senha:
                  <div className="flex row" style={{ position: 'relative' }}>
                    <input
                      type="password"
                      value={password}
                      autoComplete="new-password"
                      className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleInputBlur('password')}
                      placeholder="********"
                      required
                      style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginTop: '4px',
                        paddingRight: '30px',
                        width: '100%',
                      }}
                    />
                  </div>
                  {errorMessage && (
                    <p
                      aria-live="polite"
                      className={` ${'text-red-600'}`}
                      style={{
                        fontSize: `${fontSize * 12}px`,
                        marginTop: '4px',
                        textAlign: `${alignment ? alignment : 'start'}`,
                      }}
                    >
                      {httpResponse || errorMessage}
                    </p>
                  )}
                  <p
                    aria-live="polite"
                    className={` ${
                      passwordError ? 'visible text-red-600' : 'invisible'
                    }`}
                    style={{
                      marginTop: `${passwordError ? '4px' : ''}`,
                      fontSize: `${fontSize * 12}px`,
                      textAlign: `${alignment ? alignment : 'start'}`,
                    }}
                  >
                    Campo obrigatório
                  </p>
                </label>
              </div>

              <div className="mb-4 mx-auto">
                <div className="flex justify-center gap-8">
                  <RoleRadioButton
                    value="Utilizador"
                    checked={role === 'Utilizador'}
                    onChange={handleRoleChange}
                  />
                  <RoleRadioButton
                    value="Fornecedor"
                    checked={role === 'Fornecedor'}
                    onChange={handleRoleChange}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <GlobalButton
                  size="small"
                  type="primary"
                  onClick={handleSubmit}
                  text="Entrar"
                  disabled={
                    passwordError || emailError || !isValidEmail || errorMessage
                  }
                />
              </div>
              {/* <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLoginWithGoogle}
                >
                  Login com Google
                </button>
              </div> */}
              <div className="text-center mt-4 flex flex-col">
                <span
                  className={`${highContrast ? 'text-white' : 'text-gray-700'} text-1xl`}
                  style={{
                    textAlign: `${alignment ? alignment : 'center'}`,
                    fontSize: `${fontSize * 20}px`,
                  }}
                >
                  Ainda não tem uma conta?{' '}
                </span>
                <Link
                  href="/profile"
                  className={`${highContrast ? 'text-[#fff000]' : 'text-customBlue'} font-bold hover:text-customBlueLight-800 underline`}
                  style={{
                    textAlign: `${alignment ? alignment : 'center'}`,
                    fontSize: `${fontSize * 20}px`,
                  }}
                >
                  Cadastre-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
