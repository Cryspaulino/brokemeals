// This is the home page.
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles-home.css';


function Home() {
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
        <div className= "home-heading-links">
          <Link className="home" to="/">Home</Link>
          <Link className="home-recipes-link" to="/recipes">Recipes</Link>
          <Link className="home-saved-recipes-link" to="/saved_recipes">Saved Recipes</Link>
          <Link className="tutorial" to="/Tutorial">Tutorial</Link>
        </div>
      </div>
      <div className= "featured-recipe-box">
        <h1 className= "featured-recipe-title">Featured Recipe: </h1>
        {/* INSERT FEATURE RECIPE CODE HERE */}
        {/* INSERT FEATURE RECIPE CODE HERE */}
        {/* INSERT FEATURE RECIPE CODE HERE */}
      </div>
    </>
  );
}

export default Home;