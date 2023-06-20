import Modal from "./Modal";
import { useState, useEffect } from "react";

function CategoryModal({ isOpen, onClose, onSubmit, initialCategory }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setName(initialCategory.name);
      setPriority(initialCategory.priority);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(name, priority);
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Priority:
          </label>
          <input
            type="number"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Category
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CategoryModal;
