import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useNavigate } from "react-router-dom";
import { auth, database } from '../firebase/firebaseConfig';
import '../styles/styles.css';

// Define Signup component.
function Signup() {
// Initialize local state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UseNaviage React Router hook used to redirect the user to another route.
  const navigate = useNavigate();

  // Function to handle form submission when user creates a new account.
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission.
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save new user to database
      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        createdAt: new Date().toISOString()
      });

      alert('Account created successfully!');
      navigate('/'); // redirect to home or dashboard
    } catch (error) {
      console.error('Signup error:', error.message);
      alert('Error creating account: ' + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" className="get-started">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;