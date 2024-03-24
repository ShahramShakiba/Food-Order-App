import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../context/CartContext';
import { currencyFormatter } from '../../util/formatting';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ModalContext from '../../context/ModalContext';

export default function Checkout() {
  const { items } = useContext(CartContext);
  const modalCTX = useContext(ModalContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCheckout = () => {
    modalCTX.closeCheckout();
  };

  return (
    <Modal open={modalCTX.status === 'checkout'} onClose={handleCloseCheckout}>
      <form>
        <h2> Checkout </h2>
        <p> Total Amount: {currencyFormatter.format(cartTotal)} </p>

        <Input label="Full Name" type="text" id="full-name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" onClick={handleCloseCheckout} textOnly>
            Close
          </Button>

          <Button> Submit Order </Button>
        </p>
      </form>
    </Modal>
  );
}
