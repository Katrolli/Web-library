import { useContext, useState, useEffect } from "react";
import { StateContex } from "../StateProvider/StateProvider";
import axios from "axios";

import { PencilIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Header from "../Components/Header";
import AddCategoryModal from "../admin-panel/AdminModals/AddCategoryModal";
import CategoryModal from "../admin-panel/AdminModals/CategoryModal";

const CategoriesPage = () => {
  const { categories, setCategories, getCategories } = useContext(StateContex);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isAddCategoryModal, setIsAddCategoryModal] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = async (orientation, priority) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.post(
        "http://localhost:5142/api/Category",
        {
          Name: orientation,
          Priority: parseInt(priority),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );
      getCategories();
      setIsAddCategoryModal(false);
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

  const deleteCategory = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(`http://localhost:5142/api/Category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedCategories = categories.filter((cat) => cat.id !== id);

    setCategories(updatedCategories);
  };

  const handleCategoryEdit = async (name, priority) => {
    const updatedItem = {
      ...selectedItem,
      name,
      priority,
    };
    await axios.put(
      `http://localhost:5142/api/Category/${updatedItem.id}`,
      updatedItem
    );
    const updatedCategories = categories.map((cat) =>
      cat.id === updatedItem.id ? updatedItem : cat
    );
    setCategories(updatedCategories);
    getCategories();
    handleCloseEditModal();
  };

  const renderedCategories = categories.map((cat) => {
    console.log(cat);
    return (
      <tr key={cat.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-left">
          {cat.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {cat.priority}
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          <div className="flex space-x-2">
            <button
              onClick={() => handleOpenEditModal(cat, "categories")}
              className="bg-indigo-600 p-2 rounded hover:bg-indigo-500 focus:outline-none"
              title="Edit"
            >
              <PencilIcon className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => deleteCategory(cat.id)}
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
              onClick={() => setIsAddCategoryModal(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add a Category
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
                      <span className="group inline-flex">Priority</span>
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
                  {renderedCategories}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isAddCategoryModal && (
        <AddCategoryModal
          onClose={() => {
            setIsAddCategoryModal(false);
          }}
          onSubmit={addCategory}
        />
      )}

      <CategoryModal
        isOpen={isEditModalOpen && selectedType === "categories"}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleCategoryEdit}
        initialCategory={selectedItem}
      />
    </>
  );
};

export default CategoriesPage;
