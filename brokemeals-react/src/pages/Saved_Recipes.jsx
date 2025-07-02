// This component represents the "Saved Recipes" page. It will eventually collect the user's saved recipes in a form (I'm assuming).
import "../styles/styles-saved-recipes.css";
import React, { useEffect, useState } from "react";
// Import Auth to check if a user is logged in.
import { getAuth } from "firebase/auth";
// Import methods from Firebase to reference a path and listen for any changes we make to the databse.
import { get, ref, onValue } from "firebase/database";
// Import the navigation hook, this allows us to reroute the user depending on what recipe they select.
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/firebaseConfig";

// Given an array of recipe IDs, this function retrieves their corresponding data from the database.
// The funny thing is, it requires the use of Promises. It returns a Promise that will resolve to an array of recipe objects.
// That's to make sure we don't render recipes in the page before they are loaded.
function GetDataFromID(idArray) {
  const promises = idArray.map((id) => get(ref(database, `${id}`)));
  return Promise.all(promises).then((snapshots) => snapshots.map(snap => snap.val()));
}

function SavedRecipes() {
  const [loadedFavorites, setLoadedFavorites] = useState([]);
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
      const favoriteRef = ref(database, `users/${uid}/favorites`);
      onValue(favoriteRef, (snapshot) => {
        // This is the array of recipe IDs
        const data = snapshot.val();
        if (data) {
          console.log("Successfully found favorites data.");
          // Get the data from each ID, and set it with SetLoadedFavorites
          GetDataFromID(data).then((recipeArray) => {
            setLoadedFavorites(recipeArray)
          })
        } else {
          console.log("no data");
          console.log(uid);
        }
      });
    }, []);


    // This is the same HTML as used in Recipes.jsx.
    return (
      <div>
        <h1 className="recipe-page-title">🍲 Recipes 🍲</h1>
        <div className="main-content">
          <div className="recipe-list">
            {loadedFavorites.length > 0 ? (
              // If there is at least one recipe in the array, render them using map. Otherwise, show a loading message.
              // Loop through the recipes array and return 1 div per recipe.

              loadedFavorites.map((recipe) => (
                // Each recipe is a div with a unique key, which is the recipe's id. Allows React to keep track of each recipe.
                // I've added "className" = "recipe-card" to each recipe div for styling purposes. All data is shown for now.
                // Joyce can style these cards.
                // Below is also making calls to our databse to get the name, price, ingredients, instructions, and tags.

                // Added onClick functionality, users will be rerouted to the SingleRecipe page on click

                <div key={recipe.id} className="recipe-card-wrapper">
                  <div
                    key={recipe.id}
                    className="recipe-card"
                    onClick={() => navigate(`/recipe?id=${recipe.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <h2 className="recipe-name">{recipe.name}</h2>
                    {recipe.img && (
                      <img
                        className="recipe-img"
                        src={recipe.img}
                        alt={recipe.name}
                      ></img>
                    )}
                    <div className="recipe-info-box">
                      <p className="price">
                        <strong>Price:</strong> {recipe.price}
                      </p>

                      <h4 className="recipe-ingredients-title">Ingredients:</h4>
                      <ul className="ingredient-list">
                        {recipe.ingredients?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <p className="recipe-tags">
                        {" "}
                        <strong>Tags: </strong>
                        {recipe.tags?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="loading-recipes-text">You have no saved recipes!</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SavedRecipes;
