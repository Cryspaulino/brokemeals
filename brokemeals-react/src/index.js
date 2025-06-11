/// This is the React entry point. It imports the App, and does the literal injection of <div id="root"> into the HTML
import React from 'react'; // Reac's core library
import ReactDOM from 'react-dom/client'; // Enables our "root" calls for rendering in the browser.
import './styles/styles.css'; // Global styles.css import
import './styles/styles-recipes.css';
import App from './App'; // Imports the main App component.
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';

// Creates the React node and attaches it to the HTML element with ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <AuthProvider>
  <React.StrictMode> {/* Enables future dev-mode checks */}
    <App /> {/* Renders the App component */}
  </React.StrictMode>
  </AuthProvider>
);