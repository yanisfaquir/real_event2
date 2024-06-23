import React, { useContext } from 'react';
import Image from 'next/image';
import { AccessibilityContext } from '@/contexts/acessibility';

function AboutUs() {
  const { alignment, highContrast, fontSize } = useContext(AccessibilityContext);

  return (
    <div className={`flex flex-col mt-8 md:mt-16 p-6 md:pt-20 mx-4 md:mx-20 rounded-lg md:rounded-[40px] ${highContrast ? 'bg-black text-white' : 'bg-transparent text-black'}`}>
      
      {/* Seção de Boas-vindas */}
      <div className={`w-full ${highContrast ? 'bg-gray-800' : 'bg-[#4A7D8B]'} text-white rounded-[40px] py-12 px-4 flex flex-col justify-between shadow-lg mb-16`}>
        <div className="flex justify-center mx-auto z-10">
          <Image 
            src="/assets/pictures/logomarca-white.png" 
            alt="Logomarca Realevent" 
            className="relative flex justify-center mx-auto z-10" 
            width={500}
            height={500}
            style={{ maxWidth: '50%', height: 'auto' }} 
          />
        </div>
        <p className="text-center text-xl font-semibold my-4">A RealEvent lhes dá as boas-vindas!</p>
        <p className="px-8 my-10 text-center text-lg leading-relaxed" style={{ fontSize: `${fontSize * 16}px` }}>
          A RealEvent nasceu para transformar a forma como os eventos corporativos são organizados. Utilizando uma plataforma acessível e uma interface intuitiva, a nossa plataforma permite que os utilizadores requisitem serviços personalizados de maneira a facilitar os aspetos mais confusos na criação dos evento, desde pequenas reuniões até grandes conferências, de forma prática e eficaz.
        </p>
      </div>
      
      {/* Seção de Missão, Visão e Valores */}
      <div className={`w-full ${highContrast ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded-[40px] py-12 px-4 flex flex-col justify-between shadow-lg mb-16`}>
        <h1 className="text-center font-bold mb-9 pb-4 pt-16 text-5xl" style={{ fontSize: `${fontSize * 40}px` }}>Valores da RealEvent</h1>
        
        <div className="w-full flex flex-col items-center mb-16">
          <div className="mb-8">
            <h2 className="text-3xl mb-4 text-center font-semibold" style={{ fontSize: `${fontSize * 24}px` }}>Missão</h2>
            <p className="text-center text-lg leading-relaxed" style={{ fontSize: `${fontSize * 16}px` }}>
              Fazer do seu evento realidade, de uma forma mais prática através de protocolos estabelecidos com os fornecedores de serviços.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl mb-4 text-center font-semibold" style={{ fontSize: `${fontSize * 24}px` }}>Visão</h2>
            <p className="text-center text-lg leading-relaxed" style={{ fontSize: `${fontSize * 16}px` }}>
              Ter uma única plataforma onde consegue ter todos os serviços necessários para organizar um evento.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl mb-4 text-center font-semibold" style={{ fontSize: `${fontSize * 24}px` }}>Valores</h2>
            <div className="flex justify-center space-x-4">
              <span className="bg-gray-200 px-4 py-2 rounded-full text-lg" style={{ fontSize: `${fontSize * 16}px` }}>Criatividade</span>
              <span className="bg-gray-200 px-4 py-2 rounded-full text-lg" style={{ fontSize: `${fontSize * 16}px` }}>Inovação</span>
              <span className="bg-gray-200 px-4 py-2 rounded-full text-lg" style={{ fontSize: `${fontSize * 16}px` }}>Transparência</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Equipe */}
      <div className={`w-full flex flex-col justify-center items-center ${highContrast ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded-[40px] shadow-lg p-8 mb-16`}>
        <h1 className="text-center font-bold pb-4 pt-16 text-5xl" style={{ fontSize: `${fontSize * 40}px` }}>Conheça a Nossa Equipa</h1>
        <div className="w-full flex flex-col items-center">
          
          {/* Equipe de Design */}
          <div className="mb-16">
            <h2 className="text-3xl text-center font-semibold mb-8" style={{ fontSize: `${fontSize * 24}px` }}>Design team</h2>
            <div className="flex flex-wrap justify-center">
              <TeamMember
                imgSrc="/assets/pictures/rui_diniz.png"
                name="Rui Diniz"
                roles={["UX/UI Designer", "Analista de Qualidade"]}
                fontSize={fontSize}
              />
              <TeamMember
                imgSrc="/assets/pictures/manuela_pereira.png"
                name="Manuela Pereira"
                roles={["Product Owner", "UX/UI Designer", "Analista de Qualidade"]}
                fontSize={fontSize}
              />
              <TeamMember
                imgSrc="/assets/pictures/patricia_sousa.png"
                name="Patrícia Sousa"
                roles={["UX/UI Designer", "Analista de Orçamento", "Frontend Developer"]}
                fontSize={fontSize}
              />
            </div>
          </div>
          
          {/* Equipe de Desenvolvimento */}
          <div className="mb-16">
            <h2 className="text-3xl text-center font-semibold mb-8" style={{ fontSize: `${fontSize * 24}px` }}>Dev team</h2>
            <div className="flex flex-wrap justify-center">
              <TeamMember
                imgSrc="/assets/pictures/gustavo_magalhaes.png"
                name="Gustavo Magalhães"
                roles={["Frontend Developer", "Backend Developer", "Analista de Recursos"]}
                fontSize={fontSize}
              />
              <TeamMember
                imgSrc="/assets/pictures/yanis_faquir.png"
                name="Yanis Faquir"
                roles={["Frontend Developer", "Backend Developer"]}
                fontSize={fontSize}
              />
              <TeamMember
                imgSrc="/assets/pictures/renato_ourives.png"
                name="Renato Ourives"
                roles={["Backend Developer", "Administrador de Banco de Dados"]}
                fontSize={fontSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamMember({ imgSrc, name, roles, fontSize }) {
  return (
    <div className="text-center m-8">
      <Image 
        src={imgSrc} 
        alt={name} 
        className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg" 
        width={192}
        height={192}
        style={{ filter: 'grayscale(100%)' }} 
      />
      <p className="mt-4 text-2xl font-bold" style={{ fontSize: `${fontSize * 24}px` }}>{name}</p>
      {roles.map((role, index) => (
        <p key={index} className="text-gray-600 text-lg" style={{ fontSize: `${fontSize * 16}px` }}>{role}</p>
      ))}
    </div>
  );
}

export default AboutUs;
