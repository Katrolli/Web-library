import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StateContex } from "../../StateProvider/StateProvider";
import Modal from "../../Components/Modal";
function AddBookModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { setData, authors, categories } = useContext(StateContex);

  useEffect(() => {
    const getCategories = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get("http://localhost:5142/api/Category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData("categories", response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    const getAuthors = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get("http://localhost:5142/api/User", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const authors = response.data.filter((auth) => auth.roleId === 2);
        setData("authors", authors);
      } catch (error) {
        console.error("Error fetching authors", error);
      }
    };
    getAuthors();
    getCategories();
  }, []);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-black flex flex-col">
        <div className=" justify-center text-center">
          <p className="text-white">Create a new book</p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(title, description, authors, authorId);
          }}
        >
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
          />
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description"
          />
          <select
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            value={categoryId}
            onChange={(e) => setCategoryId([parseInt(e.target.value)])}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.orientation}
              </option>
            ))}
          </select>
          <select
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            value={authorId}
            onChange={(e) => setAuthorId(parseInt(e.target.value))}
            required
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.id}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Book
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddBookModal;
