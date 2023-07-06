import { useState } from "react";
import Modal from "../../Components/Modal";

function AddAuthorModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-black flex flex-col">
        <div className=" justify-center text-center">
          <p className="text-black">Create a new author</p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name, bio, password, email, username);
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
            placeholder="Password, hover of the field for info"
            title="Passord must contain at least one uppercase and one symbol"
          />

          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />

          <button
            type="submit"
            className="w-full p-2 bg-gray-200 text-black rounded-md hover:bg-blue-700"
          >
            Add Author
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddAuthorModal;
