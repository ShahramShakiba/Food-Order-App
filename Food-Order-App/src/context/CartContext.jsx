import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    //find the item from which I'm receiving on my action
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const allUpdatedItems = [...state.items];

    //it'll return -1 if it doesn't find an item | Already exist
    if (existingItemIndex > -1) {
      //item exist | update quantity of that item
      const existedItem = state.items[existingItemIndex];
      const newQuantity = {
        ...existedItem,
        quantity: parseInt(existedItem.quantity) + 1,
      };

      allUpdatedItems[existingItemIndex] = newQuantity;
    } else {
      //add item | start with quantity of 1
      allUpdatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: allUpdatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const allUpdatedItems = [...state.items];
    const existedItem = state.items[existingItemIndex];

    if (existedItem.quantity === 1) {
      //remove that 1 remained item
      allUpdatedItems.splice(existingItemIndex, 1);
    } else {
      const newQuantity = {
        ...existedItem,
        quantity: parseInt(existedItem.quantity) - 1,
      };

      allUpdatedItems[existingItemIndex] = newQuantity;
    }

    return { ...state, items: allUpdatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  //return unchanged state
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item,
    });
  };

  const removeItem = (id) => {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      id,
    });
  };

  const clearCart = () => {
    dispatchCartAction({type: 'CLEAR_CART'});
  };

  const cartCTX = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  console.log(cartCTX);

  return (
    <CartContext.Provider value={cartCTX}> {children} </CartContext.Provider>
  );
}

export default CartContext;
