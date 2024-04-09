import '../../styles/tailwind.css';
import Navbar from '@/components/navbar';
import { InView } from 'react-intersection-observer';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/middleware/store';
import { AccessibilityProvider } from '@/contexts/acessibility';

function MyApp({ Component, pageProps }) {
  return (
    <AccessibilityProvider>
      <Provider store={store}>
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
      </Provider>
    </AccessibilityProvider>
  );
}

export default MyApp;
