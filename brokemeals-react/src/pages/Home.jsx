// This is the home page.
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import React, { useEffect, useState } from 'react';
import {ref, onValue} from 'firebase/database'
import {database} from '../firebase/firebaseConfig'


function Home() {
  const [featuredRecipe, setFeaturedRecipe] = useState(null)
  useEffect(() => {
    const recipesRef = ref(database, "/");

    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const recipeArray = Object.entries(data)
          .filter(([_, val]) => val.name)
          .map(([id, recipe]) => ({ id, ...recipe}));

          const randomIndex = Math.floor(Math.random() * recipeArray.length);
          setFeaturedRecipe(recipeArray[randomIndex]);
      }
    });
  }, [])
  
  return (
    <>
      <div className= "home-heading-box">
        <h1 className= "home-heading">Short Heading goes here</h1>
        <h3 className= "heading-paragraph">
          We are a group of college students that want to help you get through college while eating healthy and saving money!
          Click the button below to get started!
        </h3>
        
        {/* our button is wrapped in a link to the Recipes.jsx page */}
      
        <Link to="/tutorial" className="get-started-link">
          <button className="get-started">Get Started</button>
        </Link>
        <div className= "home-heading-links">
          <Link className="home" to="/">Home</Link>
          <Link className="home-recipes-link" to="/recipes">Recipes</Link>
          <Link className="home-saved-recipes-link" to="/saved_recipes">Saved Recipes</Link>
          <Link className="tutorial" to="/Tutorial">Tutorial</Link>
        </div>
      </div>
      <div className= "featured-recipe-box">
        <h1 className= "featured-recipe-title">Featured Recipe: </h1>
            {featuredRecipe ? (
        <div className="featured-recipe">
          <h2>{featuredRecipe.name}</h2>
          <p><strong>Price:</strong> {featuredRecipe.price}</p>
          <ul>
            {featuredRecipe.ingredients?.slice(0, 3).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><strong>Tags:</strong> {featuredRecipe.tags?.join(', ')}</p>
        </div>
      ) : (
        <p>Loading featured recipe...</p>
      )}

      </div>
    </>
  );
}

export default Home;