import '../../styles/tailwind.css';
import Navbar from '@/components/navbar';
import { InView } from 'react-intersection-observer';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/middleware/store';
import { AccessibilityProvider } from '@/contexts/acessibility';
import Footer from '../components/footer';
import '@fortawesome/fontawesome-free/css/all.min.css';



function RealEventApp({ Component, pageProps }) {
  return (
    <AccessibilityProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
              <Footer/>
            </div>
          </div>
        </PersistGate>
      </Provider>
    </AccessibilityProvider>
  );
}

export default RealEventApp;