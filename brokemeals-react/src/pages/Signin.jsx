import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, database } from "../firebase/firebaseConfig";
import React, { useState } from "react";
import { ref, set } from "firebase/database";
import "../styles/styles-signin.css";
import { useAuth } from "../context/AuthContext";

function Signin() {
  // Define the const's for email and password logins, set to empty so the boxes do not autopopulate.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // React hook that allows us to change which page we are directed to upon function completion.
  const navigate = useNavigate();

  // Google signin function
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      saveUserToDB(user.uid, user.email);
      navigate("/"); // Redirect after successful sign-in
    } catch (error) {
      console.error("Google Sign-in error:", error);
    }
  };

  // Email/password sign-in function
  const signInWithEmail = async (e) => {
    e.preventDefault(); // Prevents the page reload on form submission.
    try {
      // Authenticate the user with email and password using firebase.
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Extract user data from the result.
      const user = userCredential.user;
      // Save the user data from the result.
      saveUserToDB(user.uid, user.email);
      // Notify the user and the console then nav to the homepage.
      console.log("User signed in.");
      alert("You've been signed in.");
      navigate("/");
    } catch (error) { // Display an alert and log the error if a sign-in fails.
      console.error("Email Sign-in error:", error.message);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  // Forgot Password Functionality
  const handleForgotPassword = async () => {
    // Check if the user has entered an email address yet.
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    try {
      // Send a password reset email through Firebase.
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      // Log and alert if the password reset fails.
      console.error("Password reset error:", error.message);
      alert("Failed to send reset email. Check the email address.");
    }
  };

  // Save User info to RealtimeDatabase
  const saveUserToDB = async (uid, email) => {
    try {
      // Use Firebase's 'set' to write user data under their unique UID.
      await set(ref(database, "users/" + uid), {
        email: email,
        createdAt: new Date().toISOString(), // ISO timestamp for creation time in our database.
      });
      // Log the success to the console.
      console.log("User saved to database successfully.");
    } catch (error) {
      // Log any errors that occur while writing to the database.
      console.error("Error saving user to database:", error.message);
    }
  };

  return (
    <div className="signin-container">
      <h1 className= "signin-title">Sign In</h1>
      {/* Email/Password Sign In */}
      <form className = "signin-email-form" onSubmit={signInWithEmail}>
        <input
          className = "email-input-box"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          className = "password-input-box"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
      <button onClick={handleForgotPassword} className="forgot-password-button">
        Forgot Password
      </button>
      <button className="google-signin-button" onClick={signInWithGoogle}>
        Sign In with Google
      </button>
      <div className= "no-account-box">
        <p className ="signin-signup-text">Don't have an account?</p>
        <button className="signin-signup-button" onClick={() => navigate("/signup")}>
        Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signin;