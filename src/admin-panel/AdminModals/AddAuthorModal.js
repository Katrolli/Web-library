import { useState } from "react";
import Modal from "../../Components/Modal";

function AddAuthorModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-black flex flex-col">
        <div className=" justify-center text-center">
          <p className="text-white">Create a new author</p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name, bio, password, surname, email, username);
          }}
        >
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
          />
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            placeholder="Bio"
          />
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
          />
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            value={name}
            onChange={(e) => setSurname(e.target.value)}
            required
            placeholder="Surname"
          />
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Author
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddAuthorModal;
