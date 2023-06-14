import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StateContex } from "../StateProvider/StateProvider";
import Header from "../Components/Header";
import BookModal from "../Components/BookModal";
import AuthorModal from "../Components/AuthorModal";

const AdminPanel = () => {
  const [currentTab, setCurrentTab] = useState("books");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const { books, setData, authors } = useContext(StateContex);

  useEffect(() => {
    const getBooks = async () => {
      const response = await axios.get("http://localhost:3001/books");
      setData("books", response.data);
    };
    const getAuthors = async () => {
      const response = await axios.get("http://localhost:3001/books");
      setData("authors", response.data);
    };
    getBooks();
    getAuthors();
  }, []);

  const addBook = async (title, category, author) => {
    const response = await axios.post("http://localhost:3001/books", {
      title: title,
      category: category,
      author: author,
    });
    setData("books", [...books, response.data]);
  };

  const addAuthor = async (name, bio) => {
    const response = await axios.post("http://localhost:3001/authors", {
      name: name,
      bio: bio,
    });
    setData("authors", [...authors, response.data]);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
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

  const renderedBooks = books.map((book) => {
    return (
      <tbody>
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

  const handleClick = (nextTab) => {
    setCurrentTab(nextTab);
    if (nextTab === "books") {
      addBook("Bookname", "BookCategory", "Bookauthor");
    } else if (nextTab === "authors") {
      addAuthor("name", "bio");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-[100vh]">
        <Header handleClick={handleClick} />

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
    </section>
  );
};

export default AdminPanel;
