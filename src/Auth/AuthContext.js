import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [user, setUser] = useState(localStorageUser);

  // useEffect(() => {
  //   const onRefresh = (e) => {
  //     setUser(null)
  //     localStorage.clear()
  //     };

  //   window.addEventListener("beforeunload", onRefresh);
  //   return () => {
  //     window.removeEventListener("beforeunload", onRefresh);
  //   };
  // }, []);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const setAuthData = (key, value) => {
    setUser((prevState) => ({ ...prevState, [key]: value }));
  };
  const isAdmin = user?.user?.role?.includes("Admin") || false;
  const isAuthor = user?.user?.role?.includes("Author") || false;

  const values = { user, isAdmin, isAuthor, setUser, setAuthData, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
