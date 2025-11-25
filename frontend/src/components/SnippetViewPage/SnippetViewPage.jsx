/**
 * A page for viewing snippet code
 *
 * @file SnippetViewPage.jsx
 * @author Matthew Eagan
 * Contributors:
 */

import './SnippetViewPage.css';
import { SettingsIcon, CopyIcon, RefreshIcon, AddIcon } from '../../assets.jsx';
import { useState } from 'react';

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
  catch(error){
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
 * Contributors: Matthew Eagan,
 *
 * @return A page for viewing snippet code
 */
export default function SnippetViewPage() {
  const sampleSnippet = `Hello! This is code for you to copy! \nPress the ` + 
  `button below to copy`

  const [conf, setConf] = useState("");

  const showConf = (confMessage, duration = 3000) => {
    setConf(confMessage);

    setTimeout(() => {
      setConf("");
    }, duration);
  };

  let currCode = "";

  const CopyButtonHandler = () => {
    currCode = document.getElementById('codeArea1');
    currCode = currCode.value;
    console.log(currCode);
    CopySnippetToClipBoard(currCode);
    showConf("Copied!");
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
              {<SettingsIcon/>}
            </li>
          </ul>
        </nav>
      </header>
      <div id='body'>
        <b>&lt; All Snippets</b>
        <div id='content'>
          <select id='language1' className='snippetLanguage'>
            <option value="c++">C++</option>
            <option value="python">Python</option>
            <option value="js">JavaScript</option>
          </select>
          <textarea id='codeArea1' className='snippetCode'>
            {sampleSnippet}
          </textarea>
          <button id='copyButton' className='snippetButton' onClick={
          () => CopyButtonHandler()}>
            <CopyIcon/>
          </button>
          <button id='refreshButton' className='snippetButton' onClick={
            () => CopySnippetToClipBoard(sampleSnippet)
          }>
            <RefreshIcon/>
          </button>
          <button id='addButton' className='snippetButton' onClick={
            () => CopySnippetToClipBoard(sampleSnippet)
          }>
            <AddIcon/>
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