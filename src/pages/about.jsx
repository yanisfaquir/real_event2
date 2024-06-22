import Image from 'next/image';
import React from 'react';

function AboutUs() {
  return (
    <div className="flex flex-col mt-8 md:mt-16 p-6 md:pt-20 bg-cover bg-no-repeat mx-4 md:mx-20 rounded-lg md:rounded-[40px]">
      <div className="w-full bg-[#4A7D8B] text-white rounded-t-[40px] py-12 px-4 flex flex-col justify-between shadow-lg">
        <div className="flex justify-center mx-auto z-10">
          <Image src="/assets/pictures/logomarca-white.png" alt="Logomarca Realevent" className="relative flex justify-center mx-auto z-10" style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
        <p className="text-center text-xl font-semibold my-4">A RealEvent lhes dá as boas-vindas!</p>
        <p className="px-8 my-10 text-center text-lg leading-relaxed">
        A RealEvent nasceu para transformar a forma como os eventos corporativos são organizados. Utilizando uma plataforma acessível e uma interface intuitiva, a nossa plataforma permite que os utilizadores requisitem serviços personalizados de maneira a facilitar os aspetos mais confusos na criação dos evento, desde pequenas reuniões até grandes conferências, de forma prática e eficaz.
        </p>
      </div>

      <div className="w-full flex flex-col justify-center items-center bg-white rounded-b-[40px] shadow-lg p-8">
        <h1 className="text-gray-700 text-center font-bold pb-4 pt-16 text-5xl">Conheça a Nossa Equipa</h1>
        <div className="w-full flex flex-col items-center">
          <div className="mb-16">
            <h2 className="text-3xl text-gray-700 mb-8 text-center font-semibold">Design team</h2>
            <div className="flex flex-wrap justify-center">
              <TeamMember
                imgSrc="/assets/pictures/rui_diniz.png"
                name="Rui Diniz"
                roles={["UX/UI Designer", "Analista de Qualidade"]}
              />
              <TeamMember
                imgSrc="/assets/pictures/manuela_pereira.png"
                name="Manuela Pereira"
                roles={["Product Owner", "UX/UI Designer", "Analista de Qualidade"]}
              />
              <TeamMember
                imgSrc="/assets/pictures/patricia_sousa.png"
                name="Patrícia Sousa"
                roles={["UX/UI Designer", "Analista de Orçamento", "Frontend Developer"]}
              />
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-3xl text-gray-700 mb-8 text-center font-semibold">Dev team</h2>
            <div className="flex flex-wrap justify-center">
              <TeamMember
                imgSrc="/assets/pictures/gustavo_magalhaes.png"
                name="Gustavo Magalhães"
                roles={["Frontend Developer", "Backend Developer", "Analista de Recursos"]}
              />
              <TeamMember
                imgSrc="/assets/pictures/yanis_faquir.png"
                name="Yanis Faquir"
                roles={["Frontend Developer", "Backend Developer"]}
              />
              <TeamMember
                imgSrc="/assets/pictures/renato_ourives.png"
                name="Renato Ourives"
                roles={["Backend Developer", "Administrador de Banco de Dados"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamMember({ imgSrc, name, roles }) {
  return (
    <div className="text-center m-8">
      <Image src={imgSrc} alt={name} className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg" style={{ filter: 'grayscale(100%)' }} />
      <p className="mt-4 text-2xl font-bold">{name}</p>
      {roles.map((role, index) => (
        <p key={index} className="text-gray-600 text-lg">{role}</p>
      ))}
    </div>
  );
}

export default AboutUs;
