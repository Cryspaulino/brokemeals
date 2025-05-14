// This is the shared layout that wraps every page. It includes the nav bar and footer, 
// and uses <Outlet /> to render the nested routes.
import React from 'react';
import { Link, Outlet } from 'react-router-dom'; 
import '../styles/styles.css';

function Layout() {
  return (
    <>
      <header>
        <nav className="navbar">
          {/* logo and nav links */}
          <img className="logo" src="/images/logo.jpg" alt="Broke Meals Logo" />
          <h1 className="title">Welcome to Broke Meals!</h1>
          <Link className="nav_home" to="/">Home</Link>
          <Link className="nav_goals" to="/goals">Goals</Link>
          <Link className="nav_recipes" to="/recipes">Recipes</Link>
        </nav>
      </header>

      <main>
        <Outlet /> {/* This renders the current page, read by the route in the URL. */}
      </main>

      <footer>
        <p>Beus, Ili, Kafle, Nelson, Paulino Cabrera, Poole &copy; 2025 Broke Meals</p>
      </footer>
    </>
  );
}

export default Layout; 