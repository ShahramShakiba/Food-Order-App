import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../context/CartContext';
import { currencyFormatter } from '../../util/formatting';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ModalContext from '../../context/ModalContext';
import useHTTP from '../../hooks/useHTTP';
import Error from '../Error';

// declare it outside of the Component to avoid infinite-loop
const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const modalCTX = useContext(ModalContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHTTP('http://localhost:3000/orders ', requestConfig);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCheckout = () => {
    modalCTX.closeCheckout();
  };

  const handleFinish = () => {
    modalCTX.closeCheckout();
    // clear entered-items to the cart
    clearCart();
    
    // clear success-modal
    clearData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries()); //extract data

    sendRequest(
      // Pass the Data to the sendRequest
      JSON.stringify({
        order: {
          items, // items from CartContext
          customer: customerData,
        },
      })
    );
  };

  let actions = (
    <>
      <Button type="button" onClick={handleCloseCheckout} textOnly>
        Close
      </Button>

      <Button> Submit Order </Button>
    </>
  );

  if (isSending) {
    actions = <span> Sending Order Data... 📡</span>;
  }

  if (data && !error) {
    return (
      <Modal open={modalCTX.status === 'checkout'} onClose={handleFinish}>
        <h2> Success! </h2>
        <h4> Your Order Was Submitted Successfully 🚚</h4>
        <p>
          We will get back to you with more details via Email within the next
          few minutes.
        </p>

        <p>
          <Button onClick={handleFinish}> Okay </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={modalCTX.status === 'checkout'} onClose={handleCloseCheckout}>
      <form className="form" onSubmit={handleSubmit}>
        <h2> Checkout </h2>
        <p className="total-amount">
          Total Amount: &nbsp; {currencyFormatter.format(cartTotal)}
        </p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed To Submit Order ⛔" message={error} />}

        <p className="modal-actions"> {actions} </p>
      </form>
    </Modal>
  );
}

/* Send HTTP Request (POST)
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          items, // items from CartContext
          customer: customerData,
        },
      }),
    });
*/
