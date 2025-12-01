/**
 * A page for viewing snippet code
 *
 * @file SnippetViewPage.jsx
 * @author Matthew Eagan
 * Contributors: Nicholas LaMantia
 */

import './SnippetViewPage.css';
import { SettingsIcon, CopyIcon, RefreshIcon, AddIcon, GetLanguages } from '../../assets.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * A function that copies selected snippet code to the user's system-wide
 * clipboard
 *
 * @function SnippetViewPage
 * @author Matthew Eagan
 * Contributors: Matthew Eagan,
 *
 * @return Snippet code copied to clipboard
 */
async function CopySnippetToClipBoard(snippet) {
  try {
    await navigator.clipboard.writeText(snippet);
  }
  catch (error) {
    console.error("Failed to copy snippet: ", error);
  }
}

/**
 * A page that displays the code for a selected snippet; Allows the user to 
 * copy code, modify code, reset code, and add a second text window for direct
 * comparison with another chosen language
 *
 * @function SnippetViewPage
 * @author Matthew Eagan
 * Contributors: Matthew Eagan, Nicholas LaMantia
 *
 * @return A page for viewing snippet code
 */
export const SnippetViewPage = () => {
  //Initialize useNavigate as an object to avoid invalid hook calls
  const navigate = useNavigate();
  const sampleSnippet = `Hello! This is code for you to copy! \nPress the ` +
    `button below to copy`

  // Visual indicator of successful snippet copy
  const [conf, setConf] = useState("");
  const showConf = (confMessage, duration = 3000) => {
    setConf(confMessage);

    // Automatically reset the inidcator
    setTimeout(() => {
      setConf("");
    }, duration);
  };

  // Handler for when the copy button is clicked allows for 2 functions
  let currCode = "";
  const CopyButtonHandler = () => {
    currCode = document.getElementById('codeArea1');
    // Copy current modified text to system clipboard
    CopySnippetToClipBoard(currCode.value);
    // Display confirmation message
    showConf("Copied!");
  };

  // Handler for when the refresh button is clicked allows for 2 functions
  const RefreshButtonHandler = (ogSnippet) => {
    if (ogSnippet) {
      currCode = document.getElementById('codeArea1');
      // Reset to original snippet code
      currCode.value = ogSnippet;
      // Display confirmation message
      showConf("Refreshed!");
    }
  };

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
              {<SettingsIcon />}
            </li>
          </ul>
        </nav>
      </header>
      <div id='body'>
        <b onClick={() => navigate(`/`)}>&lt; All Snippets</b>
        <div id='content'>
          <GetLanguages />
          <textarea id='codeArea1' className='snippetCode'>
            {sampleSnippet}
          </textarea>
          <button id='copyButton' className='snippetButton' onClick={
            () => CopyButtonHandler()}>
            <CopyIcon />
          </button>
          <button id='refreshButton' className='snippetButton' onClick={
            () => RefreshButtonHandler(sampleSnippet)}>
            <RefreshIcon />
          </button>
          <button id='addButton' className='snippetButton' onClick={
            () => CopySnippetToClipBoard(sampleSnippet)}>
            <AddIcon />
          </button>
        </div>
      </div>
      {conf && (
        <div id='confMessage'>
          {conf}
        </div>
      )}
    </>
  );
}