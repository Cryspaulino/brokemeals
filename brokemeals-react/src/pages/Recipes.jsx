// This component represents the "Goals" page. It will eventually collect the user's goals in a form (I'm assuming).
import React from 'react';
import '../styles/styles.css';

// This is an example to add some css to the Recipes page
function Goals() {
  return (
    <div>
      <h1>Good choice, here are the instructions: </h1>
      <div class='selectedrecipe'>
        <h1>Random Recipe for Now</h1>
        <img src=".\images\mixing.png" alt="random-img" />
        <div class='recipetext'>
          <h2>Ingredients</h2>
          <p>1/2 cup rolled oats, 1 cup water or milk, 1 tbsp peanut butter, 1 banana, sliced. Optional: cinnamon, honey</p>
          <h2>Instructions</h2>
          <p>1. Combine oats and water/milk in a bowl. 2. Microwave for 1 to 2 minutes. 3. Stir in peanut butter, banana, and optional toppings.</p>
        </div>
      </div>
      {/* You can add form inputs or interactive elements here */}
    </div>
  );
}

export default Goals;