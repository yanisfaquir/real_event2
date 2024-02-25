import '../../styles/tailwind.css';
import Navbar from '@/components/navbar';
import { InView } from 'react-intersection-observer';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div>
        <InView threshold={1}>
          {({ inView, ref, entry }) => (
            <div ref={ref}>
              <Navbar inView={inView} />
            </div>
          )}
        </InView>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
