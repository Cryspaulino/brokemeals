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
          <a href="/">
            <img className="logo" src="/images/logo.jpg" alt="Broke Meals Logo" />
          </a>
          <h1 className="title">Broke Meals</h1>
          <Link className="nav_home" to="/">Home</Link>
          <Link className="nav_goals" to="/goals">Recipes</Link>
          <Link className="nav_recipes" to="/recipes">Saved Recipes</Link>
          <Link className="sign_in" to="/Signin">Sign In</Link>
        </nav>
      </header>

      <main>
        <Outlet /> {/* This renders the current page, read by the route in the URL. */}
      </main>

      <footer>
        <div className="footer-logo-and-social-media-box">
          <img className="footer-logo" src="/images/logo.jpg" alt="Broke Meals Logo" />
        </div>
        <div className= "footer-address-and-copyright-box">
          <h3 className="address">Address: 123 Main St, Anytown, USA</h3>
        </div>
        <div className= "footer-subscribe-box">
          <h2 className= "footer-subscribe-title">Subscribe</h2>
          <h3 className="footer-subscribe-text">Enter your email to subscibe to our newsletter below:</h3>
          <input className="footer-subscribe-input" type="email" placeholder="Enter your email" />
          <button className="footer-subscribe-button">Subscribe</button>
          <p className= "footer-subscribe-agreement">By subscribing, you agree to recieve emails from us and acknowledge our Privacy Policy</p>
        </div>
        <div className= "footer-copyright-box">
          <p className= "footer-copyright">Beus, Ili, Kafle, Nelson, Paulino Cabrera, Poole &copy; 2025 Broke Meals</p>
          <p className= "footer-privacy-policy"></p>
          <p className= "footer-terms-of-use"></p>
        </div>
      </footer>
    </>
  );
}

export default Layout; 