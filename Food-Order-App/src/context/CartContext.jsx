import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    //find the item from which I'm receiving on my action
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const allUpdatedItems = [...state.items];

    //it'll return -1 if it doesn't find an item
    if (existingItemIndex > -1) {
      //item exist | update quantity of that item
      const existedItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existedItem,
        quantity: existedItem.quantity + 1,
      };

      allUpdatedItems[existingItemIndex] = updatedItem;
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

    const existedItem = state.items[existingItemIndex];
    const allUpdatedItems = [...state.items];

    if (existedItem.quantity === 1) {
      //remove that 1 remained item
      allUpdatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existedItem,
        quantity: existedItem.quantity - 1,
      };

      allUpdatedItems[existingItemIndex] = updatedItem;
    }

    return { ...state, items: allUpdatedItems };
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

  const cartCTX = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(cartCTX);

  return (
    <CartContext.Provider value={cartCTX}> {children} </CartContext.Provider>
  );
}

export default CartContext;
