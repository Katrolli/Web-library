import Modal from "../../Components/Modal";
import { useState, useEffect } from "react";

function CategoryModal({ isOpen, onClose, onSubmit, initialCategory }) {
  const [name, setName] = useState(initialCategory?.name || "");
  const [priority, setPriority] = useState(initialCategory?.priority || "");

  useEffect(() => {
    if (isOpen && initialCategory) {
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
          <label className="block text-black text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Priority:
          </label>
          <input
            type="number"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            min="1"
            max="5"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gray-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Category
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CategoryModal;
