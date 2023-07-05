import Modal from "../../Components/Modal";
import { useState, useEffect } from "react";
function AuthorModal({ isOpen, onClose, onSubmit, initialAuthor }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isOpen) {
      console.log(initialAuthor);
      setName(initialAuthor.name);
      setBio(initialAuthor.bio);
      setEmail(initialAuthor.email);
      setUsername(initialAuthor.userName);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(name, email, username, bio);
        }}
      >
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Bio</label>
          <input
            type="text"
            name="author"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-400"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gray-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Author
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AuthorModal;
