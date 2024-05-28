import React, { useContext } from 'react';
import { AccessibilityContext } from '@/contexts/acessibility';

export const TopMiddleSection = () => {
  const { alignment, highContrast } = useContext(AccessibilityContext);

  return (
    <div
      className={`flex flex-col relative align-start`}
      style={{ textAlign: `${alignment ? alignment : 'start'}` }}
    >
      <section className="flex flex-col z-9 lg:py-20 py-10 px-10 text-4xl md:text-6xl font-bold text-middle-home">
        <article className={``}>
          Em apenas 3{' '}
          <p
            className={`inline ${highContrast ? 'bg-white' : 'bg-[#4A7D8B]'} ${highContrast ? 'text-black' : 'text-white'} rounded-[50px] px-4 pb-2 h-fit w-fit`}
          >
            passos
          </p>{' '}
          tens uma <br />
          organização fácil e rápida do seu{' '}
          <p
            className={`inline ${highContrast ? 'bg-white' : 'bg-[#4A7D8B]'} ${highContrast ? 'text-black' : 'text-white'} rounded-[50px] px-4 pb-2 h-fit w-fit`}
          >
            evento
          </p>
        </article>
      </section>
    </div>
  );
};
