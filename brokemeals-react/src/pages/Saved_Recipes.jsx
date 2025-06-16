// This component represents the "Saved Recipes" page. It will eventually collect the user's saved recipes in a form (I'm assuming).
import '../styles/styles.css';
import React, { useEffect, useState } from "react";

function Saved_Recipes() {
    const [user, setUser] = useState(null);
    // Page if user is not logged in
    if (!user) {
    return (
      <div className= "not-logged-in">
        <h1 className= "not-logged-in-message">🍲 Please log in to view your saved recipes. 🍲</h1>
      </div>
    );
  }
  else{
      return (
    <div>
      {/* You can add form inputs or interactive elements here */}
    </div>
  );
}
  }


export default Saved_Recipes;