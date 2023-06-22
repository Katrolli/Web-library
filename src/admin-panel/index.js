import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StateContex } from "../StateProvider/StateProvider";
import Header from "../Components/Header";
import BookModal from "./AdminModals/BookModal";
import AuthorModal from "./AdminModals/AuthorModal";
import CategoryModal from "./AdminModals/CategoryModal";
import AddBookModal from "./AdminModals/AddBookModal";
import AddAuthorModal from "./AdminModals/AddAuthorModal";
import AddCategoryModal from "./AdminModals/AddCategoryModal";
import BookCard from "../Components/BookCard";

const AdminPanel = () => {
  const [currentTab, setCurrentTab] = useState("books");
  const [isAddoBookModal, setIsAddBookModal] = useState(false);
  const [isAddAuthorModal, setIsAddAuthorModal] = useState(false);
  const [isAddCategoryModal, setIsCategoryModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const { books, setData, authors, categories } = useContext(StateContex);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token")); // Retrieve the JWT token from storage
        const response = await axios.get("http://localhost:5142/api/Book", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });
        setData("books", response.data);
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
        setData("authors", authors);
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
        setData("categories", response.data);
      } catch (error) {
        console.error(error); // Handle any errors
      }
    };
    getBooks();
    getAuthors();
    getCategories();
  }, [refresh]);

  const addBook = async (title, description, authorId, categoryId, file) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("authorId", authorId);
    formData.append("categoryIds", categoryId);
    formData.append("Cover", file);
    try {
      const response = await axios.post(
        "http://localhost:5142/api/Book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData("books", [...books, response.data]);
      setRefresh((prev) => !prev);
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

  const addAuthor = async (name, bio, password, surname, email, username) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const request = await axios.post(
        "http://localhost:5142/api/User",
        {
          name: name,
          bio: bio,
          roleId: 2,
          Password: password,
          Email: email,
          Surname: surname,
          UserName: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );
      setData("authors", [...authors, request.data]);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error adding author:", error);
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

  const addCategory = async (orientation) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const request = await axios.post(
        "http://localhost:5142/api/Category",
        {
          Name: orientation,
          Priority: orientation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );
      setData("categories", [...categories, request.data]);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error adding category:", error);
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

  const deleteCategory = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(`http://localhost:5142/api/Category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(`http://localhost:5142/api/User/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

  // const renderedBooks = books.map((book) => {
  //   const imageUrl = "http://localhost:5142/" + book.imageUrl;
  //   console.log(book);
  //   return (
  //     <tbody key={book.id}>
  //       <img src={imageUrl}></img>
  //       <td className="border-b-2">{book.title}</td>
  //       <td className="border-b-2">{book.author}</td>
  //       <td className="border-b-2">{book.categories[0]}</td>
  //       <td className="border-b-2">
  //         <button
  //           onClick={() => handleOpenEditModal(book, "book")}
  //           className=" text-white font-bold py-2 px-4 rounded-full border"
  //         >
  //           Edit
  //         </button>
  //       </td>
  //       <td className="border-b-2">
  //         <button
  //           onClick={() => deleteBook(book.id)}
  //           className=" text-white font-bold py-2 px-4 rounded-full border"
  //         >
  //           Delete
  //         </button>
  //       </td>
  //     </tbody>
  //   );
  // });

  const renderedBooks = books.map((book) => {
    const imageUrl = "http://localhost:5142/" + book.imageUrl;
    return (
      <BookCard
        key={book.id}
        title={book.title}
        author={book.author}
        description={book.description}
        onEdit={() => handleOpenEditModal(book, "book")}
        onDelete={() => deleteBook(book.id)}
        cover={imageUrl}
      />
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
    setRefresh((prev) => !prev);
  };

  const handleBookAdd = () => {
    setIsAddBookModal(true);
    setRefresh((prev) => !prev);
  };
  const handleAuthorAdd = () => {
    setIsAddAuthorModal(true);
    setRefresh((prev) => !prev);
  };

  const handleCategoryAdd = () => {
    setIsCategoryModal(true);
    setRefresh((prev) => !prev);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-[100vh]">
        <Header
          handleClick={handleClick}
          handleBookAdd={handleBookAdd}
          handleAuthorAdd={handleAuthorAdd}
          handleCategoryAdd={handleCategoryAdd}
        />

        {/* books */}
        {/* {currentTab === "books" ? (
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
        ) : null} */}
        {currentTab === "books" ? (
          <div className="flex flex-row justify-center m-12 space-x-3 space-y-3">
            {renderedBooks}
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
        onSubmit={addBook}
      />
      <AddAuthorModal
        isOpen={isAddAuthorModal}
        onClose={() => setIsAddAuthorModal(false)}
        onSubmit={addAuthor}
      />
      <AddCategoryModal
        isOpen={isAddCategoryModal}
        onClose={() => setIsCategoryModal(false)}
        onSubmit={addCategory}
      />
    </section>
  );
};

export default AdminPanel;
