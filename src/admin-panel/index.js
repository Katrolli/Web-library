import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StateContex } from "../StateProvider/StateProvider";

const AdminPanel = () => {
    const [currentTab, setCurrentTab] = useState('books')

    const {books, setData} = useContext(StateContex)

    useEffect(() => {
        const getBooks = async () =>{
            const response = await axios.get('http://localhost:3001/books');
            setData('books', response.data)
        }

        getBooks()
        
    },[])


    const addBook = async (title, category, author) => {
        const response =  await axios.post('http://localhost:3001/books',{
            title: title,
            category: category,
            author: author,
            // id: 1
        })
       setData('books', [...books, response.data])
    }


    const renderedBooks = books.map((book) => {
    return(
        <div key={book.id}>
            <div>
            {book.title}
            </div>
           <div>
           {book.category}
           </div>
            <div>
            {book.author}
            </div>
            
        </div>
    )
    })


    const handleClick = (nextTab) => {
        setCurrentTab(nextTab)
        addBook("newbook", 'newauthor', 'newcat')

    }



    return <div>
        <div>
       <button onClick={() => handleClick('books')}> Books</button>
       </div>
       <div>
       <button onClick={() => handleClick('authors')}> Authors</button>
       </div>
       <div>
       <button onClick={() => handleClick('categories')}> Category</button>
       </div>

       <div>
            {currentTab === 'books' ? renderedBooks : null}
       </div>

    </div>
}

export default AdminPanel