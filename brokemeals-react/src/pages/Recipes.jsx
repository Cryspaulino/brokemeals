// Import React and Firebase
import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";
// Import methods from Firebase to reference a path and listen for any changes we make to the databse.
import { ref, onValue } from "firebase/database";

// Defines the React compnent for displaying recipes.
function Recipes() {
  // Initializes the "recipes" array to be empty. It will hold na array of recipe objects that we fetch from Firebase.
  // The "setRecipes" function will be used to update the state of the "recipes" array.
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
const tags = [
  "Breakfast",
  "Budget-Friendly",
  "One-Pot",
  "Meal-Prep Friendly",
  "Freezer Friendly",
  "Microwave Only",
  "Heart Healthy",
  "Low-Sodium",
  "Protein",
  "Low-Carb",
  "Keto",
  "Vegetable",
  "Gluten-Free",
  "Snack",
  "Low-Fat",
  "Instant Pot",
  "Dessert",
  "Dairy-Free",
  "Low-Calorie",
  "Pantry-Friendly",
  "Vegetarian",
  "No-Cook"
];


const [selectedTags, setSelectedTags] = useState([]);

function addTagToList(tag) {
  setSelectedTags((prev) =>
    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
  );
}


  function clearTagList() {
    setSelectedTags([]);
  }

  // Runs once after the component "mounts" (i.e., is added to the DOM because of the empty array above). 
  // Below is where we fetch the data.
  useEffect(() => {
    // Ref() creats a reference to the roof of our databse, you can see this on our Realtime Databse page.
    // This is where our recipes like "0, 1, 2, 3" are stored.
    const recipesRef = ref(database, "/"); // read all root-level recipes

    // Sets up a listener and triggers everytime "/" or the root, changes and gives us a snapshot of the data.
    // In the case below we are listening to ALL OF THE DATA in the root of our database. I did this to test that our
    // database is working. You can change this if you want.
    onValue(recipesRef, (snapshot) => {
      // const data = snapshot.val(); extracts the data from our current snapshot, remember that's all of our data right now.
      const data = snapshot.val();
      if (data) {
        // Converts the data from Firebase into an array of key:value pairs.
        const loadedRecipes = Object.entries(data)
        // Filters out any items that don't have a name property, which is the case for our "0, 1, 2, 3" recipes.
        // ☆☆☆☆☆☆☆☆☆☆☆
          .filter(([_, val]) => typeof val === "object" && val.name && val.name.toLowerCase())
          // Function below maps each entry into a new object with an aded id key - this matches the database key, and checks that each is unique.
          .map(([id, recipe]) => ({
            id,
            ...recipe,
          }));
        // This updates the state of the "recipes" array with the new data we just loaded.
        setRecipes(loadedRecipes);
        // Else statement below shows an empty array if it's not fetching the data properly or if our table is empty.
      } else {
        setRecipes([]);
      }
    });
  }, []);
const filteredRecipes = selectedTags.length > 0
  ? recipes.filter((recipe) =>
      selectedTags.every((tag) => recipe.tags?.includes(tag))
    )
  : recipes;

  return (
    <div>
      <h1>🍲 All Recipes</h1>

        <div className="tag-buttons">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => addTagToList(tag)}
            >
              {tag}
            </button>
          ))}
        {selectedTags.length > 0 && (
          <button onClick={clearTagList} className="clear-button">
            Clear Filters
          </button>
)}

        </div>
        

      {filteredRecipes.length > 0 ? (
        // If there is at least one recipe in the array, render them using map. Otherwise, show a loading message.
        // Loop through the recipes array and return 1 div per recipe.
        
        filteredRecipes.map((recipe) => (
          
          // Each recipe is a div with a unique key, which is the recipe's id. Allows React to keep track of each recipe.
          // I've added "className" = "recipe-card" to each recipe div for styling purposes. All data is shown for now.
          // Joyce can style these cards.
          // Below is also making calls to our databse to get the name, price, ingredients, instructions, and tags.
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.name}</h2>
            <p><strong>Price:</strong> {recipe.price}</p>

            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4>Instructions:</h4>
            <p>{recipe.instructions}</p>

            <h4>Tags:</h4>
            <ul>
              {recipe.tags?.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );

}

export default Recipes;