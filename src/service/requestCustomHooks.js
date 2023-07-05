import { useState, useEffect } from "react";
import api from "./index";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setBooksLoading] = useState(false);
  const [errorBooks, setError] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        setBooksLoading(true);
        const response = await api.get("/Book");
        setBooks(response.data);
      } catch (error) {
        console.error(error); // Handle any errors
        setError(error);
      } finally {
        setBooksLoading(false);
      }
    };

    getBooks();
  }, []);

  return { books, loadingBooks, errorBooks };
};

export { useBooks };
