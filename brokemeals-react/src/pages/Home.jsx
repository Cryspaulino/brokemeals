// This is the home page.
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

function Home() {
  return (
    <>
      <div className= "paragraph-box">
        <h3 className= "intro-paragraph">
          We are a group of college students that want to help you get through college while eating healthy and saving money!
          Click the button below to get started!
        </h3>

        {/* our button is wrapped in a link to the Recipes.jsx page */}
      
        <Link to="/recipes" className="get-started-link">
          <button className="get-started">Get Started</button>
        </Link>
      </div>
    </>
  );
}

export default Home;