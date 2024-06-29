import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setToken } from '../store/userSlice';
import useAuthSession from '../hooks/useAuthSessions';
import { Provider } from 'react-redux';
import { store } from '../store';
import styles from './index.module.css'; // Import your CSS module

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useAuthSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      dispatch(setToken(response.data.token));
      console.log('Login successful. Token:', response.data.token);
    } catch (error) {
      setError('Invalid username or password. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className={`${styles.flex} ${styles.items_center} ${styles.justify_center} ${styles['h-screen']} ${styles['bg-gray-100']}`}>
      <div className={`${styles['w-full']} ${styles['max-w-md']}${styles['space-y-6']} ${styles['bg-white']} ${styles['rounded-lg']} ${styles['shadow-md']}`}>
        <h1 className={`${styles['text-2xl']} ${styles['font-bold']} ${styles['text-center']}`}>Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles['input-field']}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles['input-field']}
        />
        <button
          onClick={handleLogin}
          className={styles['login-button']}
        >
          Login
        </button>
        {error && <div className={styles['error-message']}>{error}</div>}
        {user && <div className={styles['welcome-message']}>Welcome, {user.username}</div>}
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;
