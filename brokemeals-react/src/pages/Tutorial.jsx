import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles-tutorial.css';
import step3Image from '../images/Step 3.png';
import step2Image from '../images/Step 2.png';
import step1Image from '../images/Step 1.png';
function Tutorial() {
    return (
        <div className="tutorial-content-box">
            <h1 className ="tutorial-title">Tutorial</h1>
            <h3 className = "tutorial-subtitle">Step-by-Step Guide to Finding and Cooking Great Recipes</h3>
            <div className ="tutorial-steps-boxes">
                <div className="tutorial-step-1-box">
                    <h2 className="step-1-title"> 🔍  Step 1</h2>
                    <h3 className="step-1-subtitle">Search by Ingredients or Title</h3>
                    <h4 className="step-1-text">Head to the <span class="bold-word">Recipes</span> page and use the <span class="bold-word">search bar</span> to look up meals by name or ingredients.</h4>
                    <img src={step1Image} alt="step-1-image" className = "step-1-image"/>
                    <h4 className="step-1-text">Search for multiple ingredients by separating them with commas <span class="italic">like (pasta, tomato, cheese)</span>.</h4>
                </div>
                <div className="tutorial-step-2-box">
                    <h2 className="step-2-title"> 🧮 Step 2</h2>
                    <h3 className="step-2-subtitle">Filter by Tags</h3>
                    <h4 className="step-2-text">Use the <span class="bold-word">filter dropdown</span> to sort recipes by tags like "budget-friendly" or "vegetarian".</h4>
                    <img src={step2Image} alt="step-2-image" className = "step-2-image"/>
                    <h4 className="step-2-text">This helps you quickly narrow down recipes that fit your lifestyle and cravings.</h4>
                </div>
                <div className="tutorial-step-3-box">
                    <h2 className="step-3-title"> 💾 Step 3</h2>
                    <h3 className="step-3-subtitle">Save Your Favorites</h3>
                    <h4 className="step-3-text">See something you love? Click <span class="bold-word">Save</span> to keep it for later on the <span class="bold-word">Saved</span> page.</h4>
                    <img src={step3Image} alt="step-3-image" className = "step-3-image"/>
                    <h4 className="step-3-text">You'll need to be <span class="bold-word">signed in</span> to use this feature.</h4>
                </div>
            </div>
            <Link to="/recipes">
                <button className="tutorial-go-to-recipes-button">Go To Recipes!</button>
            </Link>
        </div>
    );
}
export default Tutorial;