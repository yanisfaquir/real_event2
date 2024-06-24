import React, { useContext } from 'react';
import Image from 'next/image';
import { AccessibilityContext } from '@/contexts/acessibility';

function Footer() {
  const { highContrast, fontSize } = useContext(AccessibilityContext);

  return (
    <footer className={`p-4 py-3 lg:py-3 ${highContrast ? 'bg-black text-white' : 'bg-white text-black'} dark:bg-gray-900`}>
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <Image src="/assets/pictures/logomarca-preto.png" height="100" width="200" className="h-8 me-3" alt="FlowBite Logo" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase dark:text-white" style={{ fontSize: `${fontSize * 16}px` }}>Legal</h2>
              <ul className={`font-medium ${highContrast ? 'text-white' : 'text-gray-500'} dark:text-gray-400`}>
                <li className="mb-4">
                  <a href="#" className="hover:underline" style={{ fontSize: `${fontSize * 14}px` }}>Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className={`my-6 ${highContrast ? 'border-white' : 'border-gray-200'} sm:mx-auto dark:border-gray-700`} />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className={`text-sm ${highContrast ? 'text-white' : 'text-gray-500'} sm:text-center dark:text-gray-400`} style={{ fontSize: `${fontSize * 14}px` }}>
            © 2024 RealEvent™. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="https://www.instagram.com/realevent.app/" className={`text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 ${highContrast ? 'text-white' : ''}`} style={{ fontSize: `${fontSize * 20}px` }}>
              <i className="fab fa-instagram w-6 h-6"></i>
              <span className="sr-only">Instagram page</span>
            </a>
            <a href="https://www.linkedin.com/company/realevent-app/" className={`text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 ${highContrast ? 'text-white' : ''}`} style={{ fontSize: `${fontSize * 20}px` }}>
              <i className="fab fa-linkedin w-6 h-6"></i>
              <span className="sr-only">LinkedIn page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
