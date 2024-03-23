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
      (item) => item.id === action.items.id
    );

    const updateAllItems = [...state.items];

    //it'll return -1 if it doesn't find an item
    if (existingItemIndex > -1) {
      //item exist | update quantity of that item
      const existedItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existedItem,
        quantity: existedItem.quantity + 1,
      };

      updateAllItems[existingItemIndex] = updatedItem;
    } else {
      //add item | start with quantity of 1
      updateAllItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updateAllItems };
  }

  if (action.type === 'REMOVE_ITEM') {
  }

  //return unchanged state
  return state;
}

export function CartContextProvider({ children }) {
  const [] = useReducer(cartReducer, { items: [] });

  const cartCTX = {};
  return (
    <CartContext.Provider value={cartCTX}>{children}</CartContext.Provider>
  );
}

export default CartContext;
