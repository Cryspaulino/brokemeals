import {signInWithPopup} from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from '../firebase/firebaseConfig';
import React from 'react';
import '../styles/styles.css';

function Signin() {
  const navigate = useNavigate();

// Google signin function
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirect after successful sign-in
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <>
      <h3>
        Sign in with google
      </h3>

      <button className="get-started" onClick={signInWithGoogle}>Sign In</button>
    </>
  );
}


export default Signin;