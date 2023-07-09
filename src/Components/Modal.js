function Modal({ isOpen, onClose, children, contentType }) {
  if (!isOpen) return null;

  const modalClassNames =
    contentType === "bookCard"
      ? "inline-block mt-24 align-bottom  bg-black text-gray-900 rounded-lg px-6 py-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
      : "inline-block align-bottom bg-gray-400 text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:p-6";

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle">&#8203;</span>

        <div className={modalClassNames}>
          <div className="block absolute top-0 right-0 p-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          {contentType === "bookCard" ? (
            <div className="m-[-26px]">{children}</div>
          ) : (
            <div className="mt-1">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
