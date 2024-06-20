import React, { createContext, useState, useEffect } from 'react';
import Router from 'next/router';
export const AccessibilityContext = createContext();
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';

export const AccessibilityProvider = ({ children }) => {
  const router = useRouter();
  const alignments = ['left', 'center', 'justify', 'right'];
  const [alignment, setAlignment] = useState(null);
  const [highContrast, setHighContrast] = useState(false);
  const [showImageInfo, setShowImageInfo] = useState(false);

  const [fontSize, setFontSize] = useState(1);
  const [isMaxReached, setIsMaxReached] = useState(false);
  const [isMinReached, setIsMinReached] = useState(false);

  const increaseFontSize = () => {
    if (fontSize < 1.36) {
      setFontSize(prevFontSize => prevFontSize + 0.08);
    } else {
      setIsMaxReached(true);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 0.7) {
      setFontSize(prevFontSize => prevFontSize - 0.08);
    } else {
      setIsMinReached(true);
    }
  };

  const resetStyles = () => {
    setAlignment(null);
    const images = document.querySelectorAll('.image-info');
    const elements = document.querySelectorAll(
      'body, p, h1, h2, h3, h4, h5, h6, span, label, a, article, button, strong, nav, div, section, ul, html'
    );
    images.forEach((image) => {
      image.classList.remove(
        'border-4',
        'border-white',
        'rounded-md',
        'inner-border',
        'flex'
      );
    });
    setHighContrast(false);
    setShowImageInfo(false);
    setIsMinReached(false);
    setIsMaxReached(false);
    setFontSize(1);
    elements.forEach((element) => {
      element.style.backgroundColor = '';
      element.style.color = '';
      element.style.borderColor = '';
    });
  };

  const changeFontSize = (currentFontSize, step, fontSizes) => {
    const currentIndex = fontSizes.indexOf(currentFontSize);
    const newIndex = currentIndex + step;
  
    if (newIndex >= 0 && newIndex < fontSizes.length) {
      return fontSizes[newIndex];
    } else {
      return currentFontSize;
    }
  };

  const toggleImageInfo = () => {
    setShowImageInfo(!showImageInfo);
  };

  useEffect(() => {
    const handleResize = () => {
      const images = document.querySelectorAll('.image-info');
      if (window.matchMedia('(min-width: 1024px)').matches) {
        if (showImageInfo) {
          images.forEach((image) => {
            image.classList.add(
              'border-4',
              'border-white',
              'rounded-md',
              'inner-border',
              'flex'
            );
          });
        } else {
          images.forEach((image) => {
            image.classList.remove(
              'border-4',
              'border-white',
              'rounded-md',
              'inner-border',
              'flex'
            );
          });
        }
      } else {
        images.forEach((image) => {
          image.classList.remove(
            'border-4',
            'border-white',
            'rounded-md',
            'inner-border',
            'flex'
          );
        });
        setShowImageInfo(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showImageInfo]);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const toggleAlignment = () => {
    const index = alignments.indexOf(alignment);
    setAlignment(alignments[(index + 1) % alignments.length]);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll(
        //'body, p, h1, h2, h3, h4, h5, h6, span, label, a, article, button, strong, nav, div, section, ul, html'
        'body, html'
      );

      elements.forEach((element) => {
        if (highContrast) {
          if (element.tagName !== 'A') {
            element.style.backgroundColor = '#000000';
          }
          element.style.color = '#ffffff';
          if (
            (element.tagName === 'BUTTON' || element.tagName === 'LI') &&
            element.tagName !== 'A' &&
            !element.querySelector('img')
          ) {
            element.style.borderColor = '#ffff00';
            element.style.color = '#000000';
            element.style.backgroundColor = '#ffff00';
          }
        } else {
          element.style.backgroundColor = '';
          element.style.color = '';
          element.style.borderColor = '';
        }
      });
    }
  }, [highContrast]);







  const alignmentTranslations = {
    left: 'esquerda',
    center: 'centralizado',
    justify: 'justificado',
    right: 'direita',
  };
  const [textAlignment, setTextAlignment] = useState('center');
  const [isCustomFont, setIsCustomFont] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);

  const [originalFontSizes, setOriginalFontSizes] = useState(new Map());
  const [textElements, setTextElements] = useState([]);
  const [originalLineSpacings, setOriginalLineSpacings] = useState(new Map());
  const [lineSpacingClickCount, setLineSpacingClickCount] = useState(0);

  const [originalWordSpacings, setOriginalWordSpacings] = useState(new Map());
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, label, a, article, button, li, strong'
      );

      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const wordSpacing = parseFloat(style.wordSpacing);
        originalWordSpacings.set(element, wordSpacing || 0.5);
        element.style.wordSpacing = `${wordSpacing || 0.5}px`;
      });
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, label, a, article, button, li, strong'
      );

      setTextElements(elements);

      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const fontSize = parseFloat(style.fontSize);
        originalFontSizes.set(element, fontSize);
      });
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, label, article, strong'
      );

      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const lineSpacing = parseFloat(style.lineHeight);
        originalLineSpacings.set(element, lineSpacing);
      });
    }
  }, [router]);

  const increaseTextSpacing = () => {
    const scaleFactor = 5;
    const maxScaleFactor = 3;

    const textElements = document.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, span, label, a, article, button, li, strong'
    );

    textElements.forEach((element) => {
      const originalWordSpacing = originalWordSpacings.get(element);
      const currentWordSpacing = parseFloat(
        window.getComputedStyle(element).wordSpacing
      );
      let newWordSpacing;

      if (clickCount < 3) {
        newWordSpacing = currentWordSpacing * scaleFactor;
      } else {
        newWordSpacing = originalWordSpacing;
        setClickCount(0);
      }

      element.style.wordSpacing = `${newWordSpacing}px`;
    });

    setClickCount((prevCount) => prevCount + 1);
  };

  const increaseLineSpacing = () => {
    const scaleFactor = 1.09;
    const maxScaleFactor = Math.pow(scaleFactor, 4);

    textElements.forEach((element) => {
      const originalLineSpacing = originalLineSpacings.get(element);
      const currentLineSpacing = parseFloat(
        window.getComputedStyle(element).lineHeight
      );
      let newLineSpacing;

      if (lineSpacingClickCount < 4) {
        newLineSpacing = currentLineSpacing * scaleFactor;
      } else {
        newLineSpacing = originalLineSpacing;
        setLineSpacingClickCount(0);
      }

      element.style.lineHeight = `${newLineSpacing}px`;
    });

    setLineSpacingClickCount((prevCount) => prevCount + 1);
  };

  // const increaseFontSize = () => {
  //   const scaleFactor = 1.08;
  //   const maxScaleFactor = Math.pow(scaleFactor, 3);

  //   textElements.forEach((element) => {
  //     const originalFontSize = originalFontSizes.get(element);
  //     const currentFontSize = parseFloat(
  //       window.getComputedStyle(element).fontSize
  //     );
  //     let newFontSize;

  //     if (currentFontSize < originalFontSize * maxScaleFactor) {
  //       newFontSize = currentFontSize * scaleFactor;
  //     } else {
  //       newFontSize = originalFontSize;
  //     }

  //     element.style.fontSize = `${newFontSize}px`;
  //   });
  // };

  // const decreaseFontSize = () => {
  //   const scaleFactor = 0.92;
  //   const minScaleFactor = Math.pow(scaleFactor, 3);

  //   textElements.forEach((element) => {
  //     const originalFontSize = originalFontSizes.get(element);
  //     const currentFontSize = parseFloat(
  //       window.getComputedStyle(element).fontSize
  //     );
  //     let newFontSize;

  //     if (currentFontSize > originalFontSize * minScaleFactor) {
  //       newFontSize = currentFontSize * scaleFactor;
  //     } else {
  //       newFontSize = originalFontSize;
  //     }

  //     element.style.fontSize = `${newFontSize}px`;
  //   });
  // };

  const getNextAlignment = () => {
    const currentIndex = alignments.indexOf(alignment);
    const nextIndex = (currentIndex + 1) % alignments.length;
    return alignments[nextIndex];
  };
  const getCurrentAlignmentTranslation = () => {
    return alignmentTranslations[alignment];
  };

  const toggleTextAlignment = () => {
    setIconClicked(true);
    setTextAlignment(getNextAlignment());
  };

  const toggleFont = () => {
    setIsCustomFont(!isCustomFont);
  };

  useEffect(() => {
    if (iconClicked) {
      const textElements = document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, label, a, article, strong'
      );
      textElements.forEach((element) => {
        element.style.textAlign = textAlignment;
        element.classList.remove(
          'text-start',
          'text-end',
          'text-center',
          'text-justify'
        );
        element.classList.add(`text-${textAlignment}`);
      });
    }
  }, [textAlignment, iconClicked]);

  useEffect(() => {
    document.documentElement.style.fontFamily = isCustomFont
      ? 'serif'
      : 'sans-serif';
  }, [isCustomFont]);

  const [enableShortcut, setEnableShortcut] = useState(false);
  const toggleShortcut = () => {
    setEnableShortcut(!enableShortcut);
  };

  useHotkeys('shift+x', toggleShortcut, { enabled: enableShortcut });
  useHotkeys('shift+c', toggleImageInfo, { enabled: enableShortcut });
  useHotkeys('ctrl+q', toggleAlignment, { enabled: enableShortcut });
  useHotkeys('ctrl+b', increaseLineSpacing, { enabled: enableShortcut });
  useHotkeys('shift+z', resetStyles, { enabled: enableShortcut });
  useHotkeys('ctrl+shift+z', decreaseFontSize, { enabled: enableShortcut });
  useHotkeys('ctrl+shift+x', increaseFontSize, { enabled: enableShortcut });
  useHotkeys('ctrl+shift+c', increaseTextSpacing, { enabled: enableShortcut });
  useHotkeys('ctrl+alt+q', toggleHighContrast, { enabled: enableShortcut });
  useHotkeys('ctrl+alt+d', () => Router.push('/'), { enabled: enableShortcut });
  useHotkeys('ctrl+alt+a', () => Router.push('/startEvent'), {
    enabled: enableShortcut,
  });
  useHotkeys('ctrl+alt+s', () => Router.push('/shopping-cart'), {
    enabled: enableShortcut,
  });
  // useHotkeys('ctrl+alt+z', () => Router.push(isLoggedIn ? '/profile' : '/login'), { enabled: enableShortcut });

  return (
    <AccessibilityContext.Provider
      value={{
        isCustomFont,
        toggleFont,
        textAlignment,
        toggleTextAlignment,
        getNextAlignment,
        getCurrentAlignmentTranslation,
        alignmentTranslations,
        iconClicked,
        alignmentTranslations,
        increaseFontSize,
        decreaseFontSize,
        increaseLineSpacing,
        increaseTextSpacing,
        toggleShortcut,
        enableShortcut,
        resetStyles,
        alignment,
        toggleAlignment,
        toggleHighContrast,
        highContrast,
        toggleImageInfo,
        showImageInfo,
        fontSize,isMaxReached, isMinReached
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
