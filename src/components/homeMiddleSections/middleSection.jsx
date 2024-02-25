import React from 'react';
import { TopMiddleSection } from './topSection';
import { BottomMiddleSection } from './bottomSection';

export const MiddleSection = ({ data }) => {
  return (
    <div>
      <TopMiddleSection />
      <div className="cards-home-section">
        {data.map((item, index) => (
          <div key={index} className="card-home-item mx-auto relative">
            <section className="absolute flex justify-start flex-col text-white px-8 top-20 left-50 z-10 text-[4.4rem] font-bold">
              {index + 1}
              <p className=" text-[2rem] font-bold max-w-[400px]">
                {item.title}
              </p>
              <p className="text-white absolute z-10 top-60 text-[1.3rem] max-w-[360px]">
                {item.text}
              </p>
            </section>
            <img src={item.image} alt={data.alt} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <BottomMiddleSection />
      </div>
    </div>
  );
};
