import Modal from "../../Components/Modal";
import { useState } from "react";

function AddCategoryModal({ onClose, onSubmit }) {
  const [orientation, setOrientation] = useState("");
  const [priority, setPriority] = useState(0);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="text-black flex flex-col">
        <div className=" justify-center text-center">
          <p className="text-white">Create a new Category</p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(orientation, priority);
          }}
        >
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="text"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            required
            placeholder="Orientation"
          />
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            placeholder="Priority"
            min="1"
            max="5"
          />

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Category
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddCategoryModal;
