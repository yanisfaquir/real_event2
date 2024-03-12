import React from 'react';

export const TopMiddleSection = () => {
  return (
    <div className="flex flex-col relative align-start">
      <section className="flex flex-col z-9 lg:py-20 py-10 px-10 text-[4rem] font-bold text-middle-home">
        <article className="text-black ">
          Em apenas 3{' '}
          <p className="inline text-white bg-[#4A7D8B] rounded-[50px] px-4 pb-2 h-fit w-fit">
            passos
          </p>{' '}
          tens uma <br />
          organização fácil e rápida do seu{' '}
          <p className="inline text-white bg-[#4A7D8B] rounded-[50px] px-4 pb-2 h-fit w-fit">
            evento
          </p>
        </article>
      </section>
    </div>
  );
};
