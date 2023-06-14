import Modal from "./Modal";
import { useState, useEffect } from "react";
function AuthorModal({ isOpen, onClose, onSubmit, initialAuthor }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(initialAuthor.name);
      setBio(initialAuthor.bio);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(name, bio);
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Author:
          </label>
          <input
            type="text"
            name="author"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Author
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AuthorModal;
