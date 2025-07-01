// This component represents the "Saved Recipes" page. It will eventually collect the user's saved recipes in a form (I'm assuming).
import "../styles/styles.css";
import React, { useEffect, useState } from "react";
// Import Auth to check if a user is logged in.
import { getAuth } from "firebase/auth";
// Import methods from Firebase to reference a path and listen for any changes we make to the databse.
import { ref, onValue } from "firebase/database";
// Import the navigation hook, this allows us to reroute the user depending on what recipe they select.
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/firebaseConfig";

// Navigate function to allow for rerouting :)

function SavedRecipes() {
  // const [recipes, setRecipes] = useState([]);
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const navigate = useNavigate();
  const user = getAuth().currentUser;

  // Page if user is not logged in
  if (!user) {
    return (
      <div className="not-logged-in">
        <h1 className="not-logged-in-message">
          🍲 Please log in to view your saved recipes. 🍲
        </h1>
      </div>
    );
  } else {
    useEffect(() => {
      const uid = getAuth().currentUser.uid;
      const favoriteRef = ref(database, `${uid}/favorites`);
      onValue(favoriteRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedFavorites = Object.entries(data);
          console.log(loadedFavorites);
        }
        else{
          console.log("no data")
          console.log(uid)
        }
      });
    });

    return (
      <div>
        <p>Logged in!</p>
      </div>
    );
  }
}

export default SavedRecipes;
