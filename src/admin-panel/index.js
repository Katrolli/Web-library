import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StateContex } from "../StateProvider/StateProvider";
import Header from "../Components/Header";
import BookModal from "../Components/BookModal";
import AuthorModal from "../Components/AuthorModal";
import CategoryModal from "../Components/CategoryModal";
import AddBookModal from "../Components/AddBookModal";

const AdminPanel = () => {
  const [currentTab, setCurrentTab] = useState("books");
  const [isAddoBookModal, setIsAddBookModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const { books, setData, authors, categories } = useContext(StateContex);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token")); // Retrieve the JWT token from storage
        const response = await axios.get("http://localhost:5142/api/Book", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });
        await setData("books", response.data);
      } catch (error) {
        console.error(error); // Handle any errors
      }
    };
    // const getAuthors = async () => {
    //   try {
    //     const token = localStorage.getItem("token"); // Retrieve the JWT token from storage
    //     const response = await axios.get("http://localhost:5096/Authors", {
    //       headers: {
    //         Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
    //       },
    //     });
    //     console.log(response.data); // Process the response
    //     setData("authors", response.data);
    //   } catch (error) {
    //     console.error(error); // Handle any errors
    //   }
    // };
    // const getCategories = async () => {
    //   try {
    //     const token = localStorage.getItem("token"); // Retrieve the JWT token from storage
    //     const response = await axios.get("http://localhost:5096/Categories", {
    //       headers: {
    //         Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
    //       },
    //     });
    //     console.log(response.data); // Process the response
    //     setData("categories", response.data);
    //   } catch (error) {
    //     console.error(error); // Handle any errors
    //   }
    // };
    getBooks();
    // getAuthors();
    // getCategories();
  }, []);

  const addBook = async (e, title, description, author) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));

    const bookData = {
      Title: title,
      Description: description,
      categoryIds: [],
      authorId: author[0].roleId,
    };
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5142/api/Book",
        bookData,
        requestOptions
      );
      setData("books", [...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
      if (error.response) {
        console.error(
          "Response data:",
          JSON.stringify(error.response.data, null, 2)
        );
        console.error("Response status:", error.response.status);
        console.error(
          "Response headers:",
          JSON.stringify(error.response.headers, null, 2)
        );
      } else if (error.request) {
        console.error("Request data:", error.request);
      }
    }
  };

  const addAuthor = async (name, bio) => {
    const response = await axios.post("http://localhost:5096/Authors", {
      name: name,
      bio: bio,
    });
    setData("authors", [...authors, response.data]);
  };

  const addCategory = async (name, priority) => {
    const response = await axios.post("http://localhost:5096/Categories", {
      name: name,
      priority: priority,
    });
    setData("categories", [...categories, response.data]);
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:3001/categories/${id}`);
    const updatedCategories = categories.filter((cat) => cat.id !== id);

    setData("categories", updatedCategories);
  };

  const deleteBook = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(`http://localhost:5142/api/Book/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedBooks = books.filter((book) => book.id !== id);

    setData("books", updatedBooks);
  };
  const deleteAuthor = async (id) => {
    await axios.delete(`http://localhost:3001/authors/${id}`);
    const updateAuthors = authors.filter((author) => author.id !== id);

    setData("authors", updateAuthors);
  };

  const handleOpenEditModal = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedItem(null);
    setSelectedType(null);
    setIsEditModalOpen(false);
  };

  const handleBookEdit = async (title, author, category) => {
    const updatedItem = {
      ...selectedItem,
      title,
      author,
      category,
    };
    await axios.put(
      `http://localhost:3001/books/${updatedItem.id}`,
      updatedItem
    );
    const updatedBooks = books.map((book) =>
      book.id === updatedItem.id ? updatedItem : book
    );
    setData("books", updatedBooks);

    handleCloseEditModal();
  };

  const handleAuthorEdit = async (name, bio) => {
    const updatedItem = {
      ...selectedItem,
      name,
      bio,
    };
    await axios.put(
      `http://localhost:3001/authors/${updatedItem.id}`,
      updatedItem
    );
    const updatedAuthors = authors.map((author) =>
      author.id === updatedItem.id ? updatedItem : author
    );
    setData("authors", updatedAuthors);

    handleCloseEditModal();
  };

  const handleCategoryEdit = async (name, priority) => {
    const updatedItem = {
      ...selectedItem,
      name,
      priority,
    };
    await axios.put(
      `http://localhost:3001/categories/${updatedItem.id}`,
      updatedItem
    );
    const updatedCategories = categories.map((cat) =>
      cat.id === updatedItem.id ? updatedItem : cat
    );
    setData("categories", updatedCategories);

    handleCloseEditModal();
  };

  const renderedBooks = books.map((book) => {
    console.log(book);
    return (
      <tbody key={book.id}>
        <td className="border-b-2">{book.title}</td>
        <td className="border-b-2">{book.author}</td>
        <td className="border-b-2">{book.category}</td>
        <td className="border-b-2">
          <button
            onClick={() => handleOpenEditModal(book, "book")}
            className=" text-white font-bold py-2 px-4 rounded-full border"
          >
            Edit
          </button>
        </td>
        <td className="border-b-2">
          <button
            onClick={() => deleteBook(book.id)}
            className=" text-white font-bold py-2 px-4 rounded-full border"
          >
            Delete
          </button>
        </td>
      </tbody>
    );
  });

  const renderedAuthors = authors.map((author) => {
    return (
      <tbody>
        <td className="border-b-2">{author.name}</td>
        <td className="border-b-2">{author.bio}</td>
        <td className="border-b-2">
          <button
            onClick={() => handleOpenEditModal(author, "author")}
            className=" text-white font-bold py-2 px-4 rounded-full border"
          >
            Edit
          </button>
        </td>
        <td className="border-b-2">
          <button
            onClick={() => deleteAuthor(author.id)}
            className=" text-white font-bold py-2 px-4 rounded-full border"
          >
            Delete
          </button>
        </td>
      </tbody>
    );
  });

  const renderedCategories = categories.map((cat) => {
    return (
      <tbody>
        <td className="border-b-2">{cat.name}</td>
        <td className="border-b-2">{cat.priority}</td>
        <td className="border-b-2">
          <button
            onClick={() => handleOpenEditModal(cat, "categories")}
            className=" text-white font-bold py-2 px-4 rounded-full border"
          >
            Edit
          </button>
        </td>
        <td className="border-b-2">
          <button
            onClick={() => deleteCategory(cat.id)}
            className=" text-white font-bold py-2 px-4 rounded-full border"
          >
            Delete
          </button>
        </td>
      </tbody>
    );
  });

  const handleClick = (nextTab) => {
    setCurrentTab(nextTab);
    if (nextTab === "books") {
    }
    // else if (nextTab === "authors") {
    //   addAuthor("name", "bio");
    // } else {
    //   addCategory("name", 1);
    // }
  };

  const handleBookAdd = () => {
    setIsAddBookModal(true);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-[100vh]">
        <Header handleClick={handleClick} handleBookAdd={handleBookAdd} />

        {/* books */}
        {currentTab === "books" ? (
          <div
            className="flex flex-col w-full border border-solid m-12"
            id="table"
          >
            <table className="table-auto border-spacing-2 text-white space-y-6">
              <thead>
                <td className="border-b-2">Name</td>
                <td className="border-b-2">Author</td>
                <td className="border-b-2">Category</td>
                <td className="border-b-2">Edit</td>
                <td className="border-b-2">Delete</td>
              </thead>
              {renderedBooks}
            </table>
          </div>
        ) : null}
        {currentTab === "authors" ? (
          <div
            className="flex flex-col w-full border border-solid m-12"
            id="table"
          >
            <table className="table-auto border-spacing-2 text-white space-y-6">
              <thead>
                <td className="border-b-2">Name</td>
                <td className="border-b-2">Bio</td>
                <td className="border-b-2">Edit</td>
                <td className="border-b-2">Delete</td>
              </thead>
              {renderedAuthors}
            </table>
          </div>
        ) : null}
        {currentTab === "categories" ? (
          <div
            className="flex flex-col w-full border border-solid m-12"
            id="table"
          >
            <table className="table-auto border-spacing-2 text-white space-y-6">
              <thead>
                <td className="border-b-2">Name</td>
                <td className="border-b-2">Priority</td>
                <td className="border-b-2">Edit</td>
                <td className="border-b-2">Delete</td>
              </thead>
              {renderedCategories}
            </table>
          </div>
        ) : null}
      </div>
      <BookModal
        isOpen={isEditModalOpen && selectedType === "book"}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleBookEdit}
        initialBook={selectedItem}
      />
      <AuthorModal
        isOpen={isEditModalOpen && selectedType === "author"}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleAuthorEdit}
        initialAuthor={selectedItem}
      />
      <CategoryModal
        isOpen={isEditModalOpen && selectedType === "categories"}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleCategoryEdit}
        initialCategory={selectedItem}
      />
      <AddBookModal
        isOpen={isAddoBookModal}
        onClose={() => setIsAddBookModal(false)}
        onSubmit={addBook} // You need to adjust the addBook function to accept and handle the form data from the modal
      />
    </section>
  );
};

export default AdminPanel;
