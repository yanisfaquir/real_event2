import React from 'react';
import { TopMiddleSection } from './topSection';
import { BottomMiddleSection } from './bottomSection';
import Image from 'next/image';

export const MiddleSection = ({ data }) => {
  return (
    <div>
      <TopMiddleSection />
      <div className="cards-home-section align-center">
        {data.map((item, index) => (
          <div key={index} className="card-home-item mx-auto relative">
            <h1
              tabIndex={0}
              className="absolute -mt-4 flex justify-start flex-col text-white px-8 top-20 left-50 transform -translate-x-50 z-8 text-[4.4rem] font-bold"
            >
              {index + 1}
              <p tabIndex={-1} className=" text-[2rem] font-bold max-w-[400px]">
                {item.title}
              </p>
              <p
                tabIndex={-1}
                className="text-white absolute z-8 top-60 -mt-4 text-[1.3rem] max-w-[280px]"
              >
                {item.text}
              </p>
            </h1>
            <Image
              src={item.image}
              alt={item.alt}
              width={600}
              height={800}
              layout="cover"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <BottomMiddleSection />
      </div>
    </div>
  );
};
