import { useState, useEffect, useContext } from "react";
import { StateContex } from "../../StateProvider/StateProvider";
import Modal from "../../Components/Modal";
import { AuthContext } from "../../Auth/AuthContext";
import Select from "react-select";

function AddBookModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [file, setFile] = useState();

  // const { setData, authors, categories } = useContext(StateContex);
  const { books, authors, categories, getAuthors, getCategories, getBooks } =
    useContext(StateContex);
  const { user, isAdmin, isAuthor } = useContext(AuthContext);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    getAuthors();
    getBooks();
    getCategories();
  }, []);

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const token = JSON.parse(localStorage.getItem("token"));
  //     try {
  //       const response = await axios.get("http://localhost:5142/api/Category", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setData("categories", response.data);
  //       console.log(categories);
  //     } catch (error) {
  //       console.error("Error fetching categories", error);
  //     }
  //   };
  //   const getAuthors = async () => {
  //     const token = JSON.parse(localStorage.getItem("token"));
  //     try {
  //       const response = await axios.get("http://localhost:5142/api/User", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const authors = response.data.filter((auth) => auth.roleId === 2);
  //       setData("authors", authors);
  //     } catch (error) {
  //       console.error("Error fetching authors", error);
  //     }
  //   };
  //   getAuthors();
  //   getCategories();
  // }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const autId = isAuthor ? user.user.id : authorId;
    const categoryIds = categoryId.map((category) => category.value);
    onSubmit(title, description, autId, categoryIds, file);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="text-black flex flex-col">
        <div className=" justify-center text-center">
          <p className="text-white">Create a new book</p>
        </div>
        <form className="space-y-4" onSubmit={onFormSubmit}>
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
          <input type="file" onChange={handleChange} className="text-white" />
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Chosen Preview"
              className="text-white h-20 w-40 object-cover"
            />
          ) : null}

          <div className="w-full p-2 border-2 border-gray-300 rounded-md">
            <Select
              isMulti
              value={categoryId}
              onChange={setCategoryId}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </div>
          {isAdmin ? (
            <select
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              value={authorId}
              onChange={(e) => setAuthorId(parseInt(e.target.value))}
              required
            >
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          ) : null}
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
