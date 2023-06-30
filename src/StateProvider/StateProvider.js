import { createContext, useState } from "react";
import api from "../service";

const StateContex = createContext();

function StateProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const getBooks = async () => {
    try {
      const response = await api.get("/Book");
      setBooks(response.data);
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  const getAuthors = async () => {
    try {
      const response = await api.get("/User");
      const authors = response.data.filter((auth) => auth.role === "Author");
      setAuthors(authors);
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get("/Category");
      setCategories(response.data);
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  const values = {
    books,
    authors,
    categories,
    setBooks,
    setAuthors,
    setCategories,
    getBooks,
    getAuthors,
    getCategories,
    apiUrl,
  };

  return <StateContex.Provider value={values}>{children}</StateContex.Provider>;
}

export default StateProvider;
export { StateContex };
