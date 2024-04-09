import React, { useState } from 'react';
import GlobalButton from '@/components/globalButton';
import Image from "next/image";
import Link from 'next/link'; 
import { useRouter } from 'next/router';

const Registo = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha todos os campos.');
    } else {
      setErrorMessage('');
      router.push('/');
      console.log('Registro:', { nome, email, password });
    }
  };

  return (
    <div className='p-9'>
      <div className="min-h-screen flex flex-col md:flex-row mt-8 md:mt-16 p-6 md:p-20 bg-gradient-custom bg-cover bg-no-repeat mx-4 md:my-20 md:mx-20 rounded-lg md:rounded-[40px]">
        <div className="w-1/2 relative">
          <Image
            src="/assets/pictures/registo.png"
            alt="duas pessoas no pc"
            fill
            sizes="100vw"
            style={{
              objectFit: "contain"
            }} />
        </div>

        <div className="w-1/2 flex justify-center items-center bg-white rounded-[40px] max-w-md md:max-w-lg ml-10">
          <div className="w-full max-w-xs">
            <h1 className="text-center text-4xl font-bold text-gray-700 mb-6">Registo</h1>
            <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">Nome</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nome"
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
              <div className="flex justify-center">
                <GlobalButton
                  size="small"
                  type="primary"
                  onClick={handleSubmit}
                  text="Registar"
                />
              </div>
              <div className="text-center mt-4">
                <span className="text-gray-700">Já tem conta? </span>
                <Link href="/login" className="">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registo;
