import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../context/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import ModalContext from '../context/ModalContext';

export default function Cart() {
  const { items } = useContext(CartContext);
  const { status, closeModal } = useContext(ModalContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCart = () => {
    closeModal();
  };

  return (
    <Modal className="cart" open={status === 'cart'}>
      <h2> Your Cart </h2>

      <ul>
        {items.map((item) => (
          <li key={item.name}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>

      <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>

      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>

        <Button onClick={handleCloseCart}> Checkout </Button>
      </p>
    </Modal>
  );
}
