import React, { useContext } from 'react';
import { TopMiddleSection } from './topSection';
import { BottomMiddleSection } from './bottomSection';
import Image from 'next/image';
import { AccessibilityContext } from '@/contexts/acessibility';

export const MiddleSection = ({ data }) => {
 const { alignment, highContrast, showImageInfo } =
    useContext(AccessibilityContext);

 return (
    <div>
      <TopMiddleSection />
      <div className="cards-home-section align-center">
        {data.map((item, index) => (
          <div
            key={index}
            className="card-home-item mx-auto relative text-white"
          >
            <h1
              tabIndex={0}
              className={`absolute w-[88%] -mt-4 flex justify-start flex-col ${highContrast ? 'bg-black' : 'bg-unset'} px-8 top-20 left-50 transform -translate-x-50 z-8 text-4xl md:text-6xl font-bold`}
              style={{ textAlign: `${alignment ? alignment : 'start'}` }}
            >
              {!showImageInfo && (
                <>
                <p className={`mb-2`}>

                 {index + 1}
                </p>
                 <p
                    tabIndex={-1}
                    className={`${highContrast ? 'bg-black' : 'bg-unset'} text-4xl md:text-6xl font-bold max-w-[400px]`}
                    style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                 >
                    {item.title}
                 </p>
                 <p
                    tabIndex={-1}
                    className={`${highContrast ? 'bg-black' : 'bg-unset'} absolute z-8 top-60 mt-8 text-xl md:text-2xl max-w-[88%]`}
                    style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                 >
                    {item.text}
                 </p>
                </>
              )}
            </h1>
            <Image src={item.image} alt={item.alt} width={600} height={800} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <BottomMiddleSection />
      </div>
    </div>
 );
};
