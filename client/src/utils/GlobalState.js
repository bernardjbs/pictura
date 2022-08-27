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

const initialState = {
  user: {},
};

export const Context = createContext();

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);
  return (
    <Context.Provider value={[state, setState]}>
      {children}
    </Context.Provider>
  );
};

export default Store;