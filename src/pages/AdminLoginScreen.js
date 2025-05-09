import React, { useState } from 'react';
import styles from './AdminLoginScreen.module.scss';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import sign-in function
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signin successful:', userCredential.user);
      navigate('/admin/doctors'); // Redirect to admin dashboard on successful login
    } catch (error) {
      console.error('Signin error:', error.message);
      setError(error.message); // Display the error message to the user
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Admin LOGIN</h2>
        {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Sign in
          </button>
          <a href="/forgot-password" className={styles.link}>
            Forgot password
          </a>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginScreen;