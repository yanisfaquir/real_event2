import React from 'react';
import GlobalButton from '@/components/globalButton';
import Link from 'next/link';

const CookieModal = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Política de Cookies</h2>
        <p className="mb-4">
          Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar a navegar, você concorda com o uso de cookies conforme nossa{' '}
          <Link href="/PrivacyPolicy" legacyBehavior>
            <a style={{ color: '#4A7D8B'}} className="underline">Política de Cookies</a>
          </Link>.
        </p>
        <h3 className="text-lg font-semibold mb-2">Tipos de cookies utilizados:</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Cookies de Sessão</li>
          <li>Cookies de Autenticação</li>
          <li>Cookies de Rascunho de Evento</li>
          <li>Cookies de Recursos de Acessibilidade</li>
        </ul>
        <p className="mb-4">Você pode gerenciar ou desativar cookies nas configurações do seu navegador.</p>
        <GlobalButton
          onClick={onAccept}
          type="primary"
          path="/"
          text="Aceitar Cookies"
          size="small"
        />
      </div>
    </div>
  );
};

export default CookieModal;
