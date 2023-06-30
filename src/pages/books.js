import { useContext, useEffect, useState } from "react";
import { StateContex } from "../StateProvider/StateProvider";
import api from "../service";
import BookCard from "../Components/BookCard";
import { createFormData } from "../utils";

import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/20/solid";

import Header from "../Components/Header";
import BookModal from "../admin-panel/AdminModals/BookModal";
import AddBookModal from "../admin-panel/AdminModals/AddBookModal";

const BooksPage = () => {
  const { books, setBooks, getBooks, apiUrl } = useContext(StateContex);
  const [isAddoBookModal, setIsAddBookModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

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

  const handleBookEdit = async (title, authorId, categoryIds, image) => {
    try {
      let data = createFormData({
        Title: title,
        Description: "test",
        authorId: authorId,
        "categoryIds[]": categoryIds.map((cat) => cat.value),
        Cover: image,
      });

      await api.put(`/Book/${selectedItem.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getBooks();
      handleCloseEditModal();
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

  const addBook = async (title, description, authorId, categoryIds, file) => {
    const data = createFormData({
      Title: title,
      Description: description,
      authorId: authorId,
      Cover: file,
      "categoryIds[]": categoryIds,
    });

    try {
      await api.post(`${apiUrl}/Book`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      getBooks();
      setIsAddBookModal(false);
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

  const deleteBook = async (id) => {
    await api.delete(`${apiUrl}/Book/${id}`);
    const updatedBooks = books.filter((book) => book.id !== id);

    setBooks(updatedBooks);
    getBooks();
  };

  const renderedBooks = books.map((book) => {
    // console.log(book);
    let dateStr = book.createdAt;
    let date = new Date(dateStr);
    return (
      <tr key={book.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-left">
          <BookCard book={book} />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {book.author}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {book.categories.join(", ")}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {book.description}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {book.createdBy}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {date.toLocaleDateString()}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          <div className="flex space-x-2">
            <button
              onClick={() => handleOpenEditModal(book, "book")}
              className="bg-indigo-600 p-2 rounded hover:bg-indigo-500 focus:outline-none"
              title="Edit"
            >
              <PencilIcon className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => deleteBook(book.id)}
              className="bg-red-600 p-2 rounded hover:bg-red-500 focus:outline-none"
              title="Delete"
            >
              <TrashIcon className="h-4 w-4 text-white" />
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none pt-3">
            <button
              type="button"
              onClick={() => setIsAddBookModal(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add a Book
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      <span className="group inline-flex">Title</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">Author</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">Categories</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">Description</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">Created By</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">Created At</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">
                        Actions
                        <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200"></span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {renderedBooks}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isAddoBookModal && (
        <AddBookModal
          onClose={() => {
            setIsAddBookModal(false);
          }}
          onSubmit={addBook}
        />
      )}
      <BookModal
        isOpen={isEditModalOpen && selectedType === "book"}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleBookEdit}
        initialBook={selectedItem}
      />
    </>
  );
};

export default BooksPage;
