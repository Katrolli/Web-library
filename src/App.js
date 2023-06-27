import "./App.css";
import StateProvider from "./StateProvider/StateProvider";
import LoginPage from "./Login/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";
import Logout from "./Login/Logout";
import BooksPage from "./pages/books";
import AuthorsPage from "./pages/authors";
import CategoriesPage from "./pages/categories";
import ReportPage from "./pages/report";

function App() {
  const { user } = useContext(AuthContext);

  const isAuthenticated = Boolean(user);
  const isAdmin = user && user.user.role[0] === "Admin";
  const isAuthor = user && user.user.role[0] === "Author";
  console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <StateProvider>
          <Routes>
            {isAuthenticated && isAdmin && (
              <>
                {/* <Route path="/home" element={<Home />} /> */}
                <Route path="/books" element={<BooksPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/books" />} />
              </>
            )}
            {isAuthenticated && isAuthor && (
              <>
                <Route path="/books" element={<BooksPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/books" />} />
              </>
            )}
            {!isAuthenticated && (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </StateProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
