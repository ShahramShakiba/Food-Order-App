import { createContext, useState } from 'react';

const ModalContext = createContext({
  status: '', // 'cart', 'checkout'
  showModal: () => {},
  closeModal: () => {},
  showCheckout: () => {},
  closeCheckout: () => {},
});

export function ModalContextProvider({ children }) {
  const [userStatus, setUserStatus] = useState('');

  const showModal = () => {
    setUserStatus('cart');
  };

  const closeModal = () => {
    setUserStatus('');
  };

  const showCheckout = () => {
    setUserStatus('checkout');
  };

  const closeCheckout = () => {
    setUserStatus('');
  };

  const modalCTX = {
    status: userStatus,
    showModal,
    closeModal,
    showCheckout,
    closeCheckout,
  };

  return (
    <ModalContext.Provider value={modalCTX}> {children} </ModalContext.Provider>
  );
}

export default ModalContext;
