import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../context/CartContext';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import ModalContext from '../../context/ModalContext';
import CartItem from './CartItem';

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { status, closeModal, showCheckout } = useContext(ModalContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCart = () => {
    closeModal();
  };

  const handleShowCheckout = () => {
    showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={status === 'cart'}
      onClose={status === 'cart' ? handleCloseCart : null}
    >
      <h2> Your Cart </h2>

      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>

      <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>

      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>

        {items.length > 0 && (
          <Button onClick={handleShowCheckout}> Checkout </Button>
        )}
      </p>
    </Modal>
  );
}
