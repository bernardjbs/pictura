import React, { createContext, useState } from 'react';

const initialUserState = {
  user: {},
};

const initialCartItems = {
  totalAmount: 0,
  cartItems: [],
};

const initialSelectedSize = {
  printSize: '',
  unitPrice: 0
}

const initialOrders = [
  {
    customerId: '',
    pictureId: '',
    cloud_url: '',
    size: '',
    quantity: 1,
  }
]
export const Context = createContext();

const Store = ({ children }) => {
  const [userState, setUserState] = useState(initialUserState);
  const [cartItemsState, setCartItemsState] = useState(initialCartItems);
  const [selectedSizeState, setSelectedSizeState] = useState(initialSelectedSize);
  const [ordersState, setOrdersState] = useState(initialOrders);
  return (
    <Context.Provider value={{
      'user': [userState, setUserState],
      'cartItems': [cartItemsState, setCartItemsState],
      'selectedSize': [selectedSizeState, setSelectedSizeState],
      'orders': [ordersState, setOrdersState],
    }}>
      {children}
    </Context.Provider>
  );
};

export default Store;