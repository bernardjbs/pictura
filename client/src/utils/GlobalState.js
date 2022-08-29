// import React, { createContext, useContext } from "react";
// import { useProductReducer } from './reducers'

// const StoreContext = createContext();
// const { Provider } = StoreContext;

// const StoreProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useProductReducer({
//     user: {},
//   });

//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const useStoreContext = () => {
//   return useContext(StoreContext);
// };

// export { StoreProvider, useStoreContext };

import React, { createContext, useState } from 'react';

const initialUserState = {
  user: {},
};

const initialCartItems = {
  cartItems: [],
};

export const Context = createContext();

const Store = ({ children }) => {
  const [userState, setUserState] = useState(initialUserState);
  const [cartItemsState, setCartItemsState] = useState(initialCartItems);
  return (
    <Context.Provider value={{
      'user': [userState, setUserState],
      'cartItems': [cartItemsState, setCartItemsState]
    }}>
      {children}
    </Context.Provider>
  );
};

export default Store;