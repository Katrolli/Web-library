import { createContext, useState } from "react";

const StateContex = createContext();

function StateProvider({ children }) {
  const [state, setState] = useState({
    books: [],
    categories: [],
    authors: [],
  });

  const setData = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };
  const values = { ...state, setData };

  return <StateContex.Provider value={values}>{children}</StateContex.Provider>;
}

export default StateProvider;
export { StateContex };
