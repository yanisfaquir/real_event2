import React from 'react';
import Link from 'next/link';
import Image from 'next/image';



const HomePage = () => {
  return (
    <div className="text-center">
      <section className="py-5 bg-white">
        <div className="text-3xl mb-8">Organize o seu</div>
        <div className="text-3xl mb-8">evento com a</div>
        {/* <Image src="LogotipoExtenso.png" alt="RealEvent Logo" width={300} height={90} /> */}
        <Link href="/services">
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Começar</button>
          </div>
        </Link>
        <div className="flex justify-center mt-4">
          <div className="flex-none w-1/4 ml-10">
            {/* <Image src="/Fotos.png" alt="Fotos" width={400} height={400} /> */}
          </div>
        </div>
      </section>

      <section className="relative w-full mt-10">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        {/* <Image src="/HomePage2.png" alt="Imagem de fundo" layout="responsive" width={1200} height={800} objectFit="cover" className="z-0" /> */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
          <h2 className="text-4xl mb-0">Torne realidade o evento dos seus sonhos.</h2>
          <p>Para mais informações entre em contacto connosco!</p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;