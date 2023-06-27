import { createContext, useState } from "react";
import axios from "axios";

const StateContex = createContext();

function StateProvider({ children }) {
  // const [state, setState] = useState({
  //   books: [],
  //   categories: [],
  //   authors: [],
  // });
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  // const setData = (key, value) => {
  //   setState((prevState) => ({ ...prevState, [key]: value }));
  // };

  const getBooks = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token")); // Retrieve the JWT token from storage
      const response = await axios.get("http://localhost:5142/api/Book", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  const getAuthors = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token")); // Retrieve the JWT token from storage
      const response = await axios.get("http://localhost:5142/api/User", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      const authors = response.data.filter((auth) => auth.role === "Author");
      setAuthors(authors);
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  const getCategories = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token")); // Retrieve the JWT token from storage
      const response = await axios.get("http://localhost:5142/api/Category", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
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
  };

  return <StateContex.Provider value={values}>{children}</StateContex.Provider>;
}

export default StateProvider;
export { StateContex };
