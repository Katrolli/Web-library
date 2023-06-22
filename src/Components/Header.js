function Header({
  handleClick,
  handleBookAdd,
  handleAuthorAdd,
  handleCategoryAdd,
}) {
  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 items-center justify-center">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Choose an option
        </h1>

        <div className="flex flex-col w-24 items-center pl-48 space-y-4 ">
          <div id="booksButtons" className="flex flex-row  justify-center">
            <div className="flex flex-row space-x-8 m-2 justify-center items-center">
              <button
                className=" text-white font-bold py-2 px-4 rounded-full border w-48 bg-blue-400"
                onClick={() => handleBookAdd()}
              >
                Add Book
              </button>
              <button
                onClick={() => handleClick("books")}
                className=" text-white font-bold py-2 px-4 rounded-full border w-48  bg-blue-400"
              >
                List Books
              </button>
            </div>
          </div>
          <div id="authorsButton" className="flex flex-row  justify-center">
            <div className="flex flex-row space-x-8 m-2 justify-center items-center">
              <button
                className=" text-white font-bold py-2 px-4 rounded-full border w-48 bg-blue-400"
                onClick={() => handleAuthorAdd()}
              >
                Add Author
              </button>
              <button
                onClick={() => handleClick("authors")}
                className="text-white font-bold py-2 px-4 rounded-full border w-48 bg-blue-400"
              >
                List Authors
              </button>
            </div>
          </div>
          <div id="categoriesButton" className="flex flex-row  justify-center">
            <div className="flex flex-row space-x-8 m-2 justify-center items-center">
              <button
                className=" text-white font-bold py-2 px-4 rounded-full border w-48 bg-blue-400"
                onClick={() => handleCategoryAdd()}
              >
                Add Category
              </button>
              <button
                onClick={() => handleClick("categories")}
                className="text-white font-bold py-2 px-4 rounded-full border w-48 bg-blue-400"
              >
                List Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
