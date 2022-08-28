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

export const Context = createContext();

const Store = ({ children }) => {
  const [userState, setUserState] = useState(initialUserState);
  return (
    <Context.Provider value={[userState, setUserState]}>
      {children}
    </Context.Provider>
  );
};

export default Store;