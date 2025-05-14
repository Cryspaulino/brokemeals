// This is the static data file that Levi produced to have some test data display on our recipes page.

const recipes = [
  {
    id: 0,
    name: "Spaghetti in Sauce",
    ingredients: [
      "8 oz spaghetti",
      "1 can (15 oz) tomato sauce",
      "1 tbsp vegetable oil",
      "1 tsp garlic powder",
      "1 tsp Italian seasoning",
      "Salt and pepper to taste",
      "Optional: shredded cheese"
    ],
    instructions:
      "1. Bring a pot of salted water to a boil. 2. Add spaghetti and cook for 8–10 minutes. Drain and set aside. 3. In a pan, heat oil over medium heat. 4. Add garlic powder and stir for 30 seconds. 5. Pour in tomato sauce and add seasoning, salt, and pepper. Simmer for 5–10 minutes. 6. Add spaghetti back into the sauce and stir to coat. 7. Serve with cheese if desired.",
    image: "",
    price: "$2.00"
  }
];

export default recipes; // This exports the array for use in our Recipes.jsx file.
