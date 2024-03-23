import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../context/CartContext';
import ModalContext from '../context/ModalContext';

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(ModalContext);

  const handleShowCart = () => {
    showCart();
  };

  const totalCartItems = items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="" />

        <h1>Food Ordering</h1>
      </div>

      <nav id="menu">
        <div>
          <ul className="navItems">
            <li>
              <a href="#"> Home </a>
            </li>
            <li>
              <a href="#" className="active">
                Menu
              </a>
            </li>
          </ul>
        </div>

        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
