// This is the shared layout that wraps every page. It includes the nav bar and footer, 
// and uses <Outlet /> to render the nested routes.
import React from 'react';
import { Link, Outlet } from 'react-router-dom'; 
import '../styles/styles-layout.css';

function Layout() {
  return (
    <>
      <header>
        <nav className="navbar">
          {/* logo and nav links */}
          <a href="/">
            <img className="header-logo" src="/images/logo.jpg" alt="Broke Meals Logo" />
          </a>
          <h1 className="header-title">BROKE MEALS</h1>
          <Link className="header-nav-home" to="/">Home</Link>
          <Link className="header-nav-recipes" to="/recipes">Recipes</Link>
          <Link className="header-nav-saved-recipes" to="/saved_recipes">Saved Recipes</Link>
          <Link className="header-sign-in" to="/Signin">Sign In</Link>
        </nav>
      </header>

      <main>
        <Outlet /> {/* This renders the current page, read by the route in the URL. */}
      </main>

      <footer className= "footer-content">
        <div className="footer-logo-and-social-media-box">
          <img className="footer-logo" src="/images/logo.jpg" alt="Broke Meals Logo" />
          <div className ="footer-social-media-box">
            <a className="footer-instagram-link" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img className="footer-instagram-logo" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"  alt="instagram-logo"/>
            </a>
            <a className="footer-facebook-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img className="footer-facebook-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/960px-Facebook_logo_%28square%29.png"   alt="facebook-logo"/>
            </a>
            <a className="footer-x-link" href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img className ="footer-x-logo" src="images/x-logo.png" alt="x-logo"/>
            </a>
          </div>
        </div>
        <h3 className="footer-address">Address: 123 Main St, Anytown, USA</h3>
        <div className= "footer-subscribe-box">
          <h2 className= "footer-subscribe-title">Subscribe</h2>
          <h3 className="footer-subscribe-text">Enter your email to subscibe to our newsletter below:</h3>
          <input className="footer-subscribe-input" type="email" placeholder="Enter your email" />
          <button className="footer-subscribe-button">Subscribe</button>
          <p className= "footer-subscribe-agreement">By subscribing, you agree to receive emails from us and acknowledge our Privacy Policy</p>
        </div>
        <div className= "footer-c-p-t-box">
          <p className= "footer-copyright">Beus, Ili, Kafle, Nelson, Paulino Cabrera, Poole &copy; 2025 Broke Meals</p>
          <p className= "footer-privacy-policy">Privacy Policy</p>
          <p className= "footer-terms-of-use">Terms of Service</p>
        </div>
      </footer>
    </>
  );
}

export default Layout; 