/**
 * Primary Landing Page for the application
 *
 * @file SnippetViewPage.jsx
 * @author Matthew Eagan
 * Contributors:
 */

import './LandingPage.css';
import { SettingsIcon } from '../../assets';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

/**
 * The primary landing page for the application which displays snippets in a
 * grid. Snippets are selectable and lead to dedicated view pages
 *
 * @function LandingPage
 * @author Matthew Eagan
 * Contributors: Matthew Eagan,
 *
 * @return The primary landing page for the application
 */
export const LandingPage = () => {
    //Initialize useNavigate as an object to avoid invalid hook calls
    const navigate = useNavigate();

    return (
        <>
            <title>
                Snippet
            </title>
            <header>
                <div id='siteLogo'>
                <b>CSnippy</b>
                </div>
                <nav>
                <ul id='navIcons'>
                    <li className='icon'>
                    {<SettingsIcon/>}
                    </li>
                </ul>
                </nav>
            </header>
            <div id='body'>
                <h1>
                    Welcome to CSnippy!
                </h1>
                <h2>
                    Currently under construction!
                </h2>
                <button onClick={() => navigate(`/snippet`)}>
                    Snippet View Page
                </button>
                <div id='content'>
                </div>
            </div>
        </>
    );
}