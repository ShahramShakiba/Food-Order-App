import Cart from './components/Cart/Cart';
import Header from './components/Header';
import Meals from './components/Meals/Meals';
import { CartContextProvider } from './context/CartContext';
import { ModalContextProvider } from './context/ModalContext';

export default function App() {
  return (
    <ModalContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </ModalContextProvider>
  );
}
