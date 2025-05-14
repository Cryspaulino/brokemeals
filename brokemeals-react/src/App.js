// This defines the main router configs. It wraps the app in a Layout component and enables navigation between pages.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components - You can see all routes below.
import Home from './pages/Home';
import Goals from './pages/Goals';
import Recipes from './pages/Recipes';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      {/* Layout wraps all routes with shared UI - Like the nav and footer */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="goals" element={<Goals />} />
          <Route path="recipes" element={<Recipes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; // Exported and used in index.js.