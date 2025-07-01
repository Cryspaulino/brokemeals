import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useNavigate } from "react-router-dom";
import { auth, database } from '../firebase/firebaseConfig';
import '../styles/styles-signup.css';

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
      <h1 className ="signup-title">Sign Up</h1>
      <form onSubmit={handleSignup}>
        <p className ="signup-email-text">Email:</p>
        <input
          className = "email-input-box"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <p className ="signup-password-text">Password:</p>
        <input
          className = "password-input-box"
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" className="signup-submit-button">Sign Up</button>
      </form>
      <p className = "signup-redirect-text">Already have an account? <a className ="signup-redirect" href="/Signin">Sign In</a></p>
      <p className ="signup-agreement-text">By signing up, you agree to our Terms of Service and Privacy Policy</p>
    </div>
  );
}

export default Signup;