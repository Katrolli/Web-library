import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StateContex } from "../StateProvider/StateProvider";

const AdminPanel = () => {
    const [currentTab, setCurrentTab] = useState('books');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const {books, setData, authors} = useContext(StateContex)

    useEffect(() => {
        const getBooks = async () =>{
            const response = await axios.get('http://localhost:3001/books');
            setData('books', response.data)
        }
        const getAuthors = async() => {
            const response = await axios.get('http://localhost:3001/books');
            setData('authors', response.data)
        }
        getBooks();
        getAuthors();
    },[])


    const addBook = async (title, category, author) => {
        const response =  await axios.post('http://localhost:3001/books',{
            title: title,
            category: category,
            author: author,
        })
       setData('books', [...books, response.data])
    }

    const addAuthor = async (name, bio) => {
        const response =  await axios.post('http://localhost:3001/authors',{
            name: name,
            bio: bio,
        })
       setData('authors', [...authors, response.data])
    }

    const deleteBook = async(id) => {
         await axios.delete(`http://localhost:3001/books/${id}`)
         const updatedBooks = books.filter((book) => book.id !== id)

         setData('books', updatedBooks)
    }
    const deleteAuthor = async(id) => {
        await axios.delete(`http://localhost:3001/authors/${id}`)
        const updateAuthors = authors.filter((author) => author.id !== id)

        setData('authors', updateAuthors)
   }

    const handleOpenEditModal = (item, type) => {
        setSelectedItem(item);
        setSelectedType(type);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedItem(null);
        setSelectedType(null);
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        
        // Depending on the type of the selected item, update the corresponding data.
        if (selectedType === 'book'){
            const updatedItem = { ...selectedItem, [event.target.name]: event.target.value };
            await axios.put(`http://localhost:3001/books/${updatedItem.id}`, updatedItem);
            const updatedBooks = books.map(book => book.id === updatedItem.id ? updatedItem : book);
            setData('books', updatedBooks);

        } else if (selectedType === 'author') {
            const updatedItem = { ...selectedItem, [event.target.name]: event.target.value };
            await axios.put(`http://localhost:3001/authors/${updatedItem.id}`, updatedItem);
            const updatedAuthors = authors.map(author => author.id === updatedItem.id ? updatedItem : author);
            setData('authors', updatedAuthors);
        }

        handleCloseEditModal();
    };

    


    const renderedBooks = books.map((book) => {
    return(
       <tbody>
        <td className="border-b-2">{book.title}</td>
        <td className="border-b-2">{book.author}</td>
        <td className="border-b-2">{book.category}</td>
        <td className="border-b-2"><button onClick={() => handleOpenEditModal(book, 'book')} className=" text-white font-bold py-2 px-4 rounded-full border">Edit</button></td>
        <td className="border-b-2"><button onClick={() => deleteBook(book.id)} className=" text-white font-bold py-2 px-4 rounded-full border">Delete</button></td>
       </tbody>

    )
    })

    const renderedAuthors = authors.map((author) => {
        return(
           <tbody>
            <td className="border-b-2">{author.name}</td>
            <td className="border-b-2">{author.bio}</td>
            <td className="border-b-2"><button onClick={() => handleOpenEditModal(author, 'author')}  className=" text-white font-bold py-2 px-4 rounded-full border">Edit</button></td>
            <td className="border-b-2"><button onClick={() => deleteAuthor(author.id)} className=" text-white font-bold py-2 px-4 rounded-full border">Delete</button></td>
           </tbody>
    
        )
        })


    const handleClick = (nextTab) => {
        setCurrentTab(nextTab)
        if (nextTab === "books") {
            addBook("Bookname", "BookCategory", "Bookauthor");
        }
        else if (nextTab === "authors") {
            addAuthor("name", "bio")
        }
        
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-[100vh]">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 items-center justify-center">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                       Choose an option
                    </h1>
                    <div className="flex flex-col w-24 items-center pl-48 space-y-4">
                    <button onClick={() => handleClick('books')} className=" text-white font-bold py-2 px-4 rounded-full border"> Books</button>
                    <button onClick={() => handleClick('authors')} className=" text-white font-bold py-2 px-4 rounded-full border"> Authors</button>
                    <button onClick={() => handleClick('categories')} className=" text-white font-bold py-2 px-4 rounded-full border"> Categories</button>
                    </div>
                </div>
            </div>

            {/* books */}
            {currentTab === 'books' ? 
            <div className="flex flex-col w-full border border-solid m-12" id="table">
                <table className="table-auto border-spacing-2 text-white space-y-6">
      <thead>
        <td className="border-b-2">Name</td>
        <td className="border-b-2">Author</td>
        <td className="border-b-2">Category</td>
        <td className="border-b-2">Edit</td>
        <td className="border-b-2">Delete</td>
      </thead>
        {renderedBooks}
    </table>
    </div> : null}
    {currentTab === 'authors' ? 
            <div className="flex flex-col w-full border border-solid m-12" id="table">
                <table className="table-auto border-spacing-2 text-white space-y-6">
      <thead>
        <td className="border-b-2">Name</td>
        <td className="border-b-2">Bio</td>
        <td className="border-b-2">Edit</td>
        <td className="border-b-2">Delete</td>
      </thead>
        {renderedAuthors}
    </table>
    </div> : null}
        </div>

        {isEditModalOpen && selectedType === 'book' &&
    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle">&#8203;</span>
            <div className="inline-block align-bottom bg-gray-900 text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div className="block absolute top-0 right-0 p-4">
                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-gray-300 hover:text-white focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    <form onSubmit={handleEditSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">
                                Name:
                            </label>
                            <input type="text" name="title" value={selectedItem.title} onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">
                                Author:
                            </label>
                            <input type="text" name="author" value={selectedItem.author} onChange={(e) => setSelectedItem({ ...selectedItem, author: e.target.value })} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-bold mb-2">
                                Category:
                            </label>
                            <input type="text" name="category" value={selectedItem.category} onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"/>
                        </div>
                    
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update {selectedType}</button>
                    </div>
                    
                    
                    </form>
                </div>
            </div>
        </div>
    </div>
    // end of books
} 

{/* authors */}
{isEditModalOpen && selectedType === 'author' &&
    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle">&#8203;</span>
            <div className="inline-block align-bottom bg-gray-900 text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div className="block absolute top-0 right-0 p-4">
                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-gray-300 hover:text-white focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    <form onSubmit={handleEditSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">
                                Name:
                            </label>
                            <input type="text" name="title" value={selectedItem.name} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">
                                Bio:
                            </label>
                            <input type="text" name="author" value={selectedItem.bio} onChange={(e) => setSelectedItem({ ...selectedItem, bio: e.target.value })} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"/>
                        </div>
                    
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update {selectedType}</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    // end of authors
} 




        
</section>
    )
}

export default AdminPanel