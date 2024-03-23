import { createContext, useState } from 'react';

const ModalContext = createContext({
  progress: '', // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function ModalContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState('');

  const showCart = () => {
    setUserProgress('cart');
  };

  const hideCart = () => {
    setUserProgress('');
  };

  const showCheckout = () => {
    setUserProgress('checkout');
  };

  const hideCheckout = () => {
    setUserProgress('');
  };

  const modalCTX = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <ModalContext.Provider value={modalCTX}> {children} </ModalContext.Provider>
  );
}

export default ModalContext;
