import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './context/CartContext';

export default function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}
