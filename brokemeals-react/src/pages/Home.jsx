// This is the home page.
import { Link } from 'react-router-dom';
import '../styles/styles-home.css';
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

          const today = new Date().toISOString().split('T')[0];
          let hash = 0;
          for (let i = 0; i < today.date; i++)
          {
            hash += today.charCodeAt[i]
          }
          const index = hash % recipeArray.length
          setFeaturedRecipe(recipeArray[index]);
      }
    });
  }, [])
  
  return (
    <>
      <div className= "home-heading-box">
        <h1 className= "home-heading">Welcome to broke meals!</h1>
        <h3 className= "heading-paragraph">
          We are a group of college students that want to help you get through college while eating healthy and saving money!
          Click the button below to get started!
        </h3>
        
        {/* our button is wrapped in a link to the Recipes.jsx page */}
      
        <Link to="/tutorial" className="home-get-started-link">
          <button className="home-get-started-button">Get Started</button>
        </Link>
      </div>
      <div className= "featured-recipe-box-outer">
        <h1 className= "featured-recipe-title">Featured Recipe: </h1>
            {featuredRecipe ? (
        <div className="featured-recipe-box-inner">
          <h2 className ="fr-name">{featuredRecipe.name}</h2>
          {featuredRecipe.img && (
            <img className="recipe-img" src={featuredRecipe.img} alt={featuredRecipe.name}></img> 
          )}
          <p className = "fr-price"><strong className="fr-price-title">Price:</strong> {featuredRecipe.price}</p>
          <p className = "fr-ingredients-title"><strong>Ingredients:</strong>
          <ul className = "fr-ingredients-list">
            {featuredRecipe.ingredients?.slice(0, 3).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </p>
          <div className='fr-instructions'>
            <h4>Instructions:</h4>
            <ul className ="instructions">
              {featuredRecipe.instructions
                .split(/\d+\.\s/)
                .filter((step) => step.trim() !== "")
                .map((step, index) => (
                  <div key={index}>
                    {index + 1}. {step.trim()}
                  </div>
                ))}
            </ul>
          </div>
          <p className ="fr-tags"><strong className ="fr-tags-title">Tags:</strong> {featuredRecipe.tags?.join(', ')}</p>
        </div>
      ) : (
        <p className ="loading-fr-text">Loading featured recipe...</p>
      )}
      </div>
    </>
  );
}

export default Home;