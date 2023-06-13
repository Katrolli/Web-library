import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

function LoginPage() {
  const {  setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/users', {
        username,
        password, // You might want to encrypt the password before sending it
      });
  
    const userData = {
        ...response.data,
        token: 'dummy_token',
        role: 'admin'
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Failed to login', error);
      // Handle error
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginPage;
