import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
function AddBookModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get("http://localhost:5142/api/Category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
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
        setAuthors(authors);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    getAuthors();
    getCategories();
  }, []);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e, title, description, authors);
          }}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description"
          />
          <select
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
            value={authorId}
            onChange={(e) => setAuthorId([parseInt(e.target.value)])}
            required
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.id}
              </option>
            ))}
          </select>
          <button type="submit" className="text-white">
            Add Book
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddBookModal;
