import { useContext, useState, useEffect } from "react";
import { StateContex } from "../StateProvider/StateProvider";
import axios from "axios";

import { PencilIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Header from "../Components/Header";
import AddAuthorModal from "../admin-panel/AdminModals/AddAuthorModal";
import AuthorModal from "../admin-panel/AdminModals/AuthorModal";

const AuthorsPage = () => {
  const { authors, setAuthors, getAuthors } = useContext(StateContex);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddAuthorModal, setIsAddAuthorModal] = useState(false);

  useEffect(() => {
    getAuthors();
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
      getAuthors();
      setIsAddAuthorModal(false);
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

  const deleteAuthor = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(`http://localhost:5142/api/User/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getAuthors();
  };
  const handleAuthorEdit = async (name, bio) => {
    const updatedItem = {
      ...selectedItem,
      name,
      bio,
    };
    await axios.put(
      `http://localhost:5142/api/User/${updatedItem.id}`,
      updatedItem
    );
    const updatedAuthors = authors.map((author) =>
      author.id === updatedItem.id ? updatedItem : author
    );
    setAuthors(updatedAuthors);

    handleCloseEditModal();
  };

  const renderedAuthors = authors.map((author) => {
    return (
      <tr key={author.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-left">
          {author.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {author.bio}
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          <div className="flex space-x-2">
            <button
              onClick={() => handleOpenEditModal(author, "author")}
              className="bg-indigo-600 p-2 rounded hover:bg-indigo-500 focus:outline-none"
              title="Edit"
            >
              <PencilIcon className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => deleteAuthor(author.id)}
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
              onClick={() => setIsAddAuthorModal(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add an Author
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
                      <span className="group inline-flex">Name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">Bio</span>
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
                  {renderedAuthors}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddAuthorModal
        isOpen={isAddAuthorModal}
        onClose={() => {
          setIsAddAuthorModal(false);
        }}
        onSubmit={addAuthor}
      />
      <AuthorModal
        isOpen={isEditModalOpen && selectedType === "author"}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleAuthorEdit}
        initialAuthor={selectedItem}
      />
    </>
  );
};

export default AuthorsPage;
