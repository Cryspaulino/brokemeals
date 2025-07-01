import React, { useState, useEffect } from "react";
// Import Search Params so we can use them :)
import { useSearchParams } from "react-router-dom";
import { ref, get, update } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import "../styles/styles-singlerecipe.css";
import { getAuth } from "firebase/auth";
import { SaveFavoriteRecipe } from "../utils/SaveFavoriteRecipe";

const auth = getAuth();
const user = auth.currentUser;

function SingleRecipe() {
  // Use SearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const recipeID = searchParams.get("id");
  // Set a state variable for the recipe AND for the loading status
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If there is a recipe at the ID selected (which there will be, under normal use)
    if (recipeID) {
      // Make a reference at the ID, then grab a snapshot of the database.
      const recipeRef = ref(database, `/${recipeID}`);
      get(recipeRef).then((snapshot) => {
        if (snapshot.exists()) {
          setRecipe(snapshot.val());
        } else {
          setRecipe(null);
        }
        // Declare loading as false.
        setLoading(false);
      });
    }
    // In this line, [recipeID] is a DEPENDENCY ARRAY. This means that the useEffect function will run once on mount, and then again every time recipeID changes, which would be every time a recipe is selected.
  }, [recipeID]);

  // Until the recipe is retrieved, we have a little loading message.
  if (loading) {
    return (
      <main>
        <p>Loading recipe, please wait!</p>
      </main>
    );
  }

  // This will appear if an invalid recipe ID was selected. This will not happen under normal use.
  if (!recipe) {
    return (
      <main>
        <h1>Sorry, you selected an invalid recipe ID: {recipeID}</h1>
      </main>
    );
  }

  // This will be returned under normal use. This is the layout for the Selected Recipe page. The contents are dynamically generated based on which recipe was clicked by the user.
  return (
    <main className="single-recipe">
      <div className="recipe-container">
        {/* Name and Price */}
        <h1 className ="recipe-name">{recipe.name}</h1>
        {recipe.img && (
          <img className="recipe-img" src={recipe.img} alt={recipe.name}></img>
        )}
        <button
          className="save-button"
          onClick={(e) => {
              e.stopPropagation();
              SaveFavoriteRecipe(recipe);
            }}
        >
          Save Recipe
        </button>
        <div className = "recipe-price-box">
        <p className ="recipe-price">
          <strong>Price:</strong> {recipe.price}
        </p>
        </div>
        {/* Tags (there is a lambda function inside the tags ul. It maps out the tags, and then puts each individual tag as its own li element.) */}
        <div className ="recipe-tags-box">
        <h3 className ="tags-title">Tags:</h3>
        <ul className ="tags">
          {recipe.tags?.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>

        {/* Ingredients (there is a lambda function inside the tags ul. It maps out the ingredient, and then puts each individual ingredient as its own li element.) */}
        </div>
        <div className ="recipe-ingredients-box">
        
        <h3 className ="ingredients-title">Ingredients:</h3>
        <ul className ="ingredients">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        </div>
        <div className ="recipe-instructions-box">
        {/* Instructions */}
        <h3 className ="instructions-title">Instructions:</h3>
        {/* <p>{recipe.instructions}</p> */}
        <ul className ="instructions">
          {/* The instructions are returned as one single string. Here we split them up individually, and manually add the number to each line. */}
          {recipe.instructions
            .split(/\d+\.\s/)
            .filter((step) => step.trim() !== "")
            .map((step, index) => (
              <div key={index}>
                {index + 1}. {step.trim()}
              </div>
            ))}
        </ul>
        </div>
      </div>
      {/* Return to Recipes page. */}
      <div classname="backtorecipes">
        <a href="./Recipes">Go back to all recipes</a>
      </div>
    </main>
  );
}

export default SingleRecipe;
