// This is the home page.
import { Link } from 'react-router-dom';
import '../styles/styles-home.css';
import React, { useEffect, useState } from 'react';
import { onValue } from 'firebase/database'
import { database } from '../firebase/firebaseConfig'
import { get, ref, child } from "firebase/database";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const [featuredRecipe, setFeaturedRecipe] = useState(null)
  useEffect(() => {
    const fetchFeaturedRecipe = async () => {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, "/"));
      const data = snapshot.val();

      if (data) {
        const recipeArray = Object.entries(data)
          .filter(([_, val]) => val.name)
          .map(([id, recipe]) => ({ id, ...recipe }));

        const today = new Date().toISOString().split('T')[0];
        let hash = 0;
        for (let i = 0; i < today.length; i++) {
          hash += today.charCodeAt(i);
        }
        const index = hash % recipeArray.length
        setFeaturedRecipe(recipeArray[index]);

      }
    };

    fetchFeaturedRecipe();

  }, []);

  return (
    <>
      <div className="home-heading-box">
        <h1 className="home-heading">Welcome to Broke Meals!</h1>
        <h3 className="heading-paragraph">
          We are a group of college students that want to help you get through college while eating healthy and saving money!
          Click the button below to get started!
        </h3>

        {/* our button is wrapped in a link to the Recipes.jsx page */}

        <Link to="/tutorial" className="home-get-started-link">
          <button className="home-get-started-button">Get Started</button>
        </Link>
      </div>

      <div
        onClick={() => navigate(`/recipe?id=${featuredRecipe.id}`)}
      >
        <div
          className="recipe-card"
          onClick={() => navigate(`/recipe?id=${featuredRecipe.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <h1 className="featured-recipe-title">Featured Recipe</h1>
          {featuredRecipe ? (
            <div className="featured-recipe-box-inner">
              <h2 className="fr-name">{featuredRecipe.name}</h2>
              {featuredRecipe.img && (
                <img className="fr-recipe-img" src={featuredRecipe.img} alt={featuredRecipe.name}></img>
              )}
              <p className="fr-ingredients-title"><strong >Ingredients:</strong>
                <ul className="fr-ingredients-list">
                  {featuredRecipe.ingredients?.slice(0, 3).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
              <div className='fr-instructions'>
                <p className='fr-instructions-title'><strong>Instructions:</strong></p>
                <ul className="instructions">
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
              <p className="fr-tags"><strong className="fr-tags-title">Tags:</strong> {featuredRecipe.tags?.join(', ')}</p>
              <div className='fr-price-stuff'></div>
                <p className="fr-price-title">Price:
                  <p className='fr-price'>{featuredRecipe.price}</p>
                </p>
            </div>
        ) : (
        <p className="loading-fr-text">Loading featured recipe...</p>
      )}
      </div>
    </div >
    </>
  );
}

export default Home;