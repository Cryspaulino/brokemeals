// Import React and Firebase
import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";
// Import methods from Firebase to reference a path and listen for any changes we make to the databse.
import { ref, onValue } from "firebase/database";
// Import methods from Firebase to handle user authentication
import {getAuth, onAuthStateChanged} from 'firebase/auth';

// Defines the React compnent for displaying recipes.
function Recipes() {
  // Initializes the "recipes" array to be empty. It will hold na array of recipe objects that we fetch from Firebase.
  // The "setRecipes" function will be used to update the state of the "recipes" array.
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  // state to track the current user
  const [user, setUser] = useState(null);
  // Holds a list of tags attached to different recipes.
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

  // Initializes the "selectedTags" array to be empty. It will hold na array of recipe objects that we fetch from Firebase.
  // The "setSelectedTags" function will be used to update the state of the "selectedTags" array.
  const [selectedTags, setSelectedTags] = useState([]);

  // This function adds a selected tag to the SelectedTags list.
  // This is kind of weird, so I'll explain line by line.
  // PARAM tag = the tag that was just clicked by the user
function addTagToList(tag) {
  // Prev means "previous value". It means the CURRENT/PREVIOUS state of SelectedTags.
  // it says, "This is what the tag list looks like RIGHT NOW"
  setSelectedTags((prev) =>
    // ? and : are inline if/else statements. 
    // prev.includes(tag) ? - If the tag passed into the function is in the selectedTags list...
    // prev.filter((t => t !== tag)) - .filter makes a new array of items that EXCLUDES the tag that was just clicked. t represents each tag in the prev array.
    // This basically says, "for each tag in prev, add the tag to a new array EXCEPT the one we selected."
    // [...prev, tag] - This is an array spread. It will create a new array with all prev tags plus the one we just selected.
    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    // TL;DR: When we call the addTagToList function, we pass it the tag we just clicked on. Then we check if that tag is already in the selectedTags list. If it is, then a new array is created using .filter of just the tags that the user selected, minus the one they just clicked (letting users toggle a tag on or off). In essence, the tag is removed from the selectedTags list. Otherwise, the tag is ADDED to the selectedTags list.
  );
}
  // This function clears the SelectedTag list.
  function clearTagList() {
    setSelectedTags([]);
  }

  // Initializes the constant Filtered Recipes.
  const filteredRecipes = selectedTags.length > 0
  ? recipes.filter((recipe) =>
      selectedTags.every((tag) => recipe.tags?.includes(tag))
    )
  : recipes;

  // Creates auth and unsubscribe variables using firebase methods
  // This allows us to track the current user
    useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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

  // Page if user isn't logged in
  if (!user) {
    return (
      <div className= "not-logged-in">
        <h1 className= "not-logged-in-message">🍲 Please log in to view your saved recipes. 🍲</h1>
      </div>
    );
  }


  return (
    <div>
      <h1>🍲 All Recipes</h1>

        <div className="tag-buttons">
          {tags.map((tag) => (
            <button
              key={tag}
              // When clicked, we call the addTagToList function.
              onClick={() => addTagToList(tag)}
            >
              {tag}
            </button>
          ))}
        {selectedTags.length > 0 && (
          // When clicked, we call the clearTagList function.
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