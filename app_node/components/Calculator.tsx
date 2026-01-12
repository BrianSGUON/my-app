'use client';

import { useState, useCallback } from 'react';

export default function Calculator() {
  // Hook useState : stocke l'affichage de la calculatrice
  const [display, setDisplay] = useState('0');
  // Hook useState : stocke la valeur précédente
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  // Hook useState : stocke l'opération en cours
  const [operation, setOperation] = useState<string | null>(null);
  // Hook useState : indique si on doit réinitialiser l'affichage
  const [shouldReset, setShouldReset] = useState(false);

  // Hook useCallback : mémorise la fonction pour éviter de la recréer
  const handleNumber = useCallback((num: string) => {
    setDisplay(prev => {
      // Si shouldReset est true, on remplace l'affichage
      if (shouldReset) {
        setShouldReset(false);
        return num;
      }
      // Sinon on ajoute le chiffre (sauf si c'est 0 au début)
      return prev === '0' ? num : prev + num;
    });
  }, [shouldReset]);

  const handleDecimal = useCallback(() => {
    if (shouldReset) {
      setDisplay('0.');
      setShouldReset(false);
    } else if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  }, [display, shouldReset]);

  const handleOperation = useCallback((op: string) => {
    if (previousValue !== null && operation !== null && !shouldReset) {
      // Calcule le résultat avant de changer d'opération
      calculate();
    } else {
      setPreviousValue(display);
    }
    setOperation(op);
    setShouldReset(true);
  }, [display, previousValue, operation, shouldReset]);

  const calculate = useCallback(() => {
    if (previousValue === null || operation === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = current !== 0 ? prev / current : 0;
        break;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setShouldReset(true);
  }, [previousValue, operation, display]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldReset(false);
  }, []);

  const toggleSign = useCallback(() => {
    setDisplay(prev => {
      const num = parseFloat(prev);
      return String(num * -1);
    });
  }, []);

  const percentage = useCallback(() => {
    setDisplay(prev => {
      const num = parseFloat(prev);
      return String(num / 100);
    });
  }, []);

  const buttons = [
    { label: 'C', onClick: clear, className: 'bg-gray-400 hover:bg-gray-500' },
    { label: '±', onClick: toggleSign, className: 'bg-gray-400 hover:bg-gray-500' },
    { label: '%', onClick: percentage, className: 'bg-gray-400 hover:bg-gray-500' },
    { label: '÷', onClick: () => handleOperation('÷'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '7', onClick: () => handleNumber('7'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '8', onClick: () => handleNumber('8'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '9', onClick: () => handleNumber('9'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '×', onClick: () => handleOperation('×'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '4', onClick: () => handleNumber('4'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '5', onClick: () => handleNumber('5'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '6', onClick: () => handleNumber('6'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '-', onClick: () => handleOperation('-'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '1', onClick: () => handleNumber('1'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '2', onClick: () => handleNumber('2'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '3', onClick: () => handleNumber('3'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '+', onClick: () => handleOperation('+'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '0', onClick: () => handleNumber('0'), className: 'bg-gray-700 hover:bg-gray-600 col-span-2' },
    { label: '.', onClick: handleDecimal, className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '=', onClick: calculate, className: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="bg-black p-6 rounded-3xl shadow-2xl w-80">
      {/* Affichage */}
      <div className="bg-gray-900 rounded-2xl p-6 mb-4 text-right">
        <div className="text-white text-5xl font-light overflow-hidden overflow-ellipsis">
          {display}
        </div>
        {operation && previousValue && (
          <div className="text-gray-500 text-sm mt-2">
            {previousValue} {operation}
          </div>
        )}
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`${button.className} text-white text-2xl font-medium py-5 rounded-full transition-all duration-150 active:scale-95`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}