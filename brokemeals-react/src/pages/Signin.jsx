import React from 'react';
import '../styles/styles.css';

function Signin() {
  return (
    <>
      <h3>
        We are a group of college students that want to help you get through college while eating healthy and saving money!
        Click the button below to get started!
      </h3>

      {/* our button is wrapped in a link to the Recipes.jsx page */}
      <Link to="/">
        <button className="get-started">Get Started</button>
      </Link>
    </>
  );
}

export default Home;