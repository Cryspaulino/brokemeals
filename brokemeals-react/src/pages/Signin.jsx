import {signInWithPopup} from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from '../firebase/firebaseConfig';
import React from 'react';
import '../styles/styles.css';

function Signin() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/home'); // Redirect after successful sign-in
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <>
      <h3>
        We are a group of college students that want to help you get through college while eating healthy and saving money!
        Click the button below to get started!
      </h3>

      <button className="get-started" onClick={signInWithGoogle}>Get Started</button>
    </>
  );
}


export default Signin;