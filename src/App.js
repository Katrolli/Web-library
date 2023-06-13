import './App.css';
import StateProvider from './StateProvider/StateProvider';
import LoginPage from './Login/Login';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Auth/AuthContext';
import Books from './Components/Books';


function App() {
  const {user} = useContext(AuthContext);

  const isAuthenticated = Boolean(user)

  return (
    <div className="App">
        <BrowserRouter>
      <StateProvider>
          <Routes>
            {isAuthenticated ?  
              <>
                <Route path="/books" element={<Books />} /> 
                <Route
                  path="*"
                  element={<Navigate to="/books" />}
                />
              </>
              : 
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/login" />}
                />
              </>
            }
          </Routes>
      </StateProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
