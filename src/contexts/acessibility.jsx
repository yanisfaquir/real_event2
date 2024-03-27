import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const alignments = ['left', 'center', 'justify', 'right'];
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
        'p, h1, h2, h3, h4, h5, h6, span, label, a, article, button, li'
      );

      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const wordSpacing = parseFloat(style.wordSpacing);
        originalWordSpacings.set(element, wordSpacing || 0.5);
        element.style.wordSpacing = `${wordSpacing || 0.5}px`;
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, label, a, article, button, li'
      );

      setTextElements(elements);

      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const fontSize = parseFloat(style.fontSize);
        originalFontSizes.set(element, fontSize);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, label, article'
      );

      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const lineSpacing = parseFloat(style.lineHeight);
        originalLineSpacings.set(element, lineSpacing);
      });
    }
  }, []);

  const increaseTextSpacing = () => {
    const scaleFactor = 5;
    const maxScaleFactor = 3;

    const textElements = document.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, span, label, a, article, button, li'
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

  const increaseFontSize = () => {
    const scaleFactor = 1.08;
    const maxScaleFactor = Math.pow(scaleFactor, 3);

    textElements.forEach((element) => {
      const originalFontSize = originalFontSizes.get(element);
      const currentFontSize = parseFloat(
        window.getComputedStyle(element).fontSize
      );
      let newFontSize;

      if (currentFontSize < originalFontSize * maxScaleFactor) {
        newFontSize = currentFontSize * scaleFactor;
      } else {
        newFontSize = originalFontSize;
      }

      element.style.fontSize = `${newFontSize}px`;
    });
  };

  const decreaseFontSize = () => {
    const scaleFactor = 0.92;
    const minScaleFactor = Math.pow(scaleFactor, 3);

    textElements.forEach((element) => {
      const originalFontSize = originalFontSizes.get(element);
      const currentFontSize = parseFloat(
        window.getComputedStyle(element).fontSize
      );
      let newFontSize;

      if (currentFontSize > originalFontSize * minScaleFactor) {
        newFontSize = currentFontSize * scaleFactor;
      } else {
        newFontSize = originalFontSize;
      }

      element.style.fontSize = `${newFontSize}px`;
    });
  };

  const getNextAlignment = () => {
    const currentIndex = alignments.indexOf(textAlignment);
    const nextIndex = (currentIndex + 1) % alignments.length;
    return alignments[nextIndex];
  };
  const getCurrentAlignmentTranslation = () => {
    return alignmentTranslations[textAlignment];
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
        'p, h1, h2, h3, h4, h5, h6, span, label, a, article'
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
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
