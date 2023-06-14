import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const localStorageUser = localStorage.getItem('user')

  useEffect(() => {
    if (localStorageUser) {
        setUser(JSON.parse(localStorageUser))
    }
  }, [localStorageUser])

  useEffect(() => {
    const onRefresh = (e) => {
      setUser(null)
      localStorage.clear()
      };

    window.addEventListener("beforeunload", onRefresh);
    return () => {
      window.removeEventListener("beforeunload", onRefresh);
    };
  }, []);


  const setAuthData = (key, value) => {
    setUser((prevState) => ({ ...prevState, [key]: value }));
  };


  const values = { user, setUser, setAuthData};

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;