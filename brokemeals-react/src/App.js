// This defines the main router configs. It wraps the app in a Layout component and enables navigation between pages.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components - You can see all routes below.
import Home from './pages/Home';
import Saved_Recipes from './pages/Saved_Recipes';
import Recipes from './pages/Recipes';
import Layout from './components/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SingleRecipe from './pages/SingleRecipe';
import Tutorial from './pages/Tutorial';


function App() {
  return (
    <Router>
      {/* Layout wraps all routes with shared UI - Like the nav and footer */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="saved_recipes" element={<Saved_Recipes />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="signin" element={<Signin />} />
          <Route path = "signup" element={<Signup />} />
          <Route path = "/recipe" element={<SingleRecipe />} />
          <Route path = "/tutorial" element={<Tutorial />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; // Exported and used in index.js.