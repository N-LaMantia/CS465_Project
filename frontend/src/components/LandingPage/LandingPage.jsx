/**
 * Primary Landing Page for the application
 *
 * @file SnippetViewPage.jsx
 * @author Matthew Eagan
 * Contributors: Nicholas LaMantia
 */

import React from "react";
import "./LandingPage.css";
import { SettingsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { PreferredLangSetting } from "../PreferredLangSetting/PreferredLangSetting.jsx";

/**
 * The primary landing page for the application which displays snippets in a
 * grid. Snippets are selectable and lead to dedicated view pages
 *
 * @function LandingPage
 * @author Matthew Eagan
 * Contributors: Nicholas LaMantia
 *
 * @return The primary landing page for the application
 */
export const LandingPage = () => {
    //Initialize useNavigate as an object to avoid invalid hook calls
    const navigate = useNavigate();

    return (
        <>
            <title aria-label="Snippet">Snippet</title>
            <header>
                <div id="siteLogo">
                    <b>CSnippy</b>
                </div>
            </header>
            <hr></hr>
            <div id="body">
                <h1 aria-label="Welcome to CSnippy">Welcome to CSnippy!</h1>
                <button
                    className="snipConverterButton"
                    onClick={() => navigate(`/snippet`)}
                >
                    Snippet Comparer
                </button>
                &nbsp;
                <PreferredLangSetting />
                &nbsp;
                <h3 aria-label="A description of the site." className="description">
                    This application is designed for developers to easily compare code
                    snippets across multiple programming languages. Please continue by
                    hitting the "Snippet Comparer" button above.
                </h3>
                &nbsp;&nbsp;&nbsp;
                <footer aria-label="footer" className="footer">
                    Created by Matthew Eagan, Nicholas LaMantia, Thomas Gallaher, and Jace
                    Henderson. © 2025 CSnippy. All rights reserved.
                </footer>
            </div>
        </>
    );
};

