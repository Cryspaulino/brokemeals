import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles-tutorial.css';

function Tutorial() {
    return (
        <div className="tutorial-content-box">
            <h1 className ="tutorial-title">Tutorial</h1>
            <h3 className = "tutorial-subtitle">tutorial subtitle text here</h3>
            <div className ="tutorial-steps-boxes">
                <div className="tutorial-step-1-box">
                    <h2 className="step-1-title"> 🍲 Step 1</h2>
                    <h4 className="step-1-text">tutorial step 1 text here</h4>
                    <img src="" alt="step-1-image" />
                    <h4 className="step-1-text">tutorial step 1 text 2 here</h4>
                </div>
                <div className="tutorial-step-2-box">
                    <h2 className="step-2-title"> 🍲 Step 2</h2>
                    <h4 className="step-2-text">tutorial step 2 text here</h4>
                    <img src="" alt="step-2-image" />
                    <h4 className="step-2-text">tutorial step 2 text 2 here</h4>
                </div>
                <div className="tutorial-step-3-box">
                    <h2 className="step-3-title"> 🍲 Step 3</h2>
                    <h4 className="step-3-text">tutorial step 3 text here</h4>
                    <img src="" alt="step-3-image" />
                    <h4 className="step-3-text">tutorial step 3 text 2 here</h4>
                </div>
            </div>
            <Link to="/recipes">
                <button className="tutorial-go-to-recipes-button">Go To Recipes!</button>
            </Link>
        </div>
    );
}
export default Tutorial;