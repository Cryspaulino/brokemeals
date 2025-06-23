// This component represents the "Saved Recipes" page. It will eventually collect the user's saved recipes in a form (I'm assuming).
import '../styles/styles-saved-recipes.css';
import React, { useEffect, useState } from "react";
import { getAuth } from 'firebase/auth';

function Saved_Recipes() {
    const user = getAuth().currentUser;
    // Page if user is not logged in
    if (!user) {
    return (
      <div className= "not-logged-in">
        <h1 className= "not-logged-in-message">🍲 Please log in to view your saved recipes. 🍲</h1>
      </div>
    );
  }
  else{
      return (
    <div>
      <p>Logged in!</p>
    </div>
  );
}
  }


export default Saved_Recipes;