import { useContext, useEffect, useState } from "react";
import { StateContex } from "../../StateProvider/StateProvider";
import { AuthContext } from "../../Auth/AuthContext";
import Modal from "../../Components/Modal";
import Select from "react-select";

function BookModal({ isOpen, onClose, onSubmit, initialBook }) {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [file, setFile] = useState();
  const { isAuthor } = useContext(AuthContext);

  const { authors, categories, getCategories, getAuthors, baseUrl } =
    useContext(StateContex);

  useEffect(() => {
    getCategories();
    getAuthors();
  }, []);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  const getImageUrl = () => {
    if (typeof file === "object") {
      return URL.createObjectURL(file);
    }
    return baseUrl + "/" + file;
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(initialBook.title);
      setAuthorId(initialBook.authorId);
      setCategoryId(
        initialBook.categories.map((categoryName) => ({
          value: categories.find((c) => c.name === categoryName).id,
          label: categoryName,
        }))
      );
      setFile(initialBook.imageUrl);
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(title, authorId, categoryId, file);
        }}
      >
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline  bg-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Author:
          </label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(parseInt(e.target.value))}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline  bg-gray-400"
            disabled={isAuthor}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-black text-sm font-bold mb-2">
            Category:
          </label>
          <div className="w-full p-2 border-2 border-gray-300 rounded-md">
            <Select
              required
              isMulti
              value={categoryId}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              onChange={setCategoryId}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Book Image:
          </label>
          <input type="file" onChange={handleFileChange} />
          {file ? <img src={getImageUrl()} alt="book preview" /> : null}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gray-200 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update book
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default BookModal;
