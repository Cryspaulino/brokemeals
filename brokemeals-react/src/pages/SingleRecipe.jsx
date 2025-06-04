import React, { useState, useEffect } from 'react';
// Import Search Params so we can use them :)
import { useSearchParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';


    function SingleRecipe() {
        // Use SearchParams
        const [searchParams, setSearchParams] = useSearchParams();
        const recipeID = searchParams.get('id');
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
            return <main><p>Loading recipe, please wait!</p></main>
        }

        // This will appear if an invalid recipe ID was selected. This will not happen under normal use.
        if (!recipe) {
            return (
                <main>
                    <h1>
                        Sorry, you selected an invalid recipe ID: {recipeID}
                    </h1>
                </main>
            );
        }

        // This will be returned under normal use. This is the layout for the Selected Recipe page. The contents are dynamically generated based on which recipe was clicked by the user.
        return (
            <main className='single-recipe'>
                <div className='recipe-container'>

                    {/* Name and Price */}
                    <h1>{recipe.name}</h1>
                    <p><strong>Price:</strong> {recipe.price}</p>

                    {/* Tags (there is a lambda function inside the tags ul. It maps out the tags, and then puts each individual tag as its own li element.) */}
                    <h3>Tags:</h3>
                    <ul>
                        {recipe.tags?.map((tag, index) => (
                        <li key={index}>{tag}</li>
                        ))}
                    </ul>
                    
                    {/* Ingredients (there is a lambda function inside the tags ul. It maps out the ingredient, and then puts each individual ingredient as its own li element.) */}

                    <h3>Ingredients:</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>

                    {/* Instructions */}
                    <h3>Instructions:</h3>
                    {/* <p>{recipe.instructions}</p> */}
                    <ul>
                        {/* The instructions are returned as one single string. Here we split them up individually, and manually add the number to each line. */}
                        {recipe.instructions
                        .split(/\d+\.\s/) 
                        .filter(step => step.trim() !== "")
                        .map((step, index) => (
                        <div key={index}>
                        {index + 1}. {step.trim()}
                    </div>
                        ))}
                    </ul>
                </div>
                {/* Return to Recipes page. */}
                <div class='backtorecipes'>
                    <a href="./pages/Recipes">Go back to all recipes</a>
                </div>
            </main>
        );
    }


export default SingleRecipe;