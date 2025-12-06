/**
 * A page for viewing snippet code
 *
 * @file SnippetViewPage.jsx
 * @author Matthew Eagan
 * Contributors: Nicholas LaMantia, Jace Henderson
 */

import "./SnippetViewPage.css";
import {
  SettingsIcon,
  CopyIcon,
  RefreshIcon,
  AddIcon,
  GetLanguages,
  SnipList,
} from "../../assets.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
  } catch (error) {
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
 * Contributors: Matthew Eagan, Nicholas LaMantia, Jace Henderson
 *
 * @return A page for viewing snippet code
 */
export const SnippetViewPage = () => {
  //Initialize useNavigate as an object to avoid invalid hook calls
  const navigate = useNavigate();
  const sampleSnippet =
    `Hello! This is code for you to copy! \nPress the ` +
    `button below to copy`;

  // Selected language / snippet and code state
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [SelectedSnippet, setSelectedSnippet] = useState(null);
  const [currentCode, setCurrentCode] = useState(sampleSnippet);
  const [originalCode, setOriginalCode] = useState(sampleSnippet);

  let languageMap = {
    "C++": "cpp",
    JavaScript: "javascript",
    Python: "python",
    Lua: "lua",
  };

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
  const CopyButtonHandler = () => {
    // Copy current modified text to system clipboard
    CopySnippetToClipBoard(currentCode);
    // Display confirmation message
    showConf("Copied!");
  };

  // Handler for when the refresh button is clicked allows for 2 functions
  const RefreshButtonHandler = () => {
    // Reset to original snippet code
    setCurrentCode(originalCode);
    // Display confirmation message
    showConf("Refreshed!");
  };

  return (
    <>
      <title>Snippet</title>
      <header>
        <div id="siteLogo">
          <b>CSnippy</b>
        </div>
        <nav>
          <ul id="navIcons">
            <li className="icon">{<SettingsIcon />}</li>
          </ul>
        </nav>
      </header>
      <div id="body">
        <b onClick={() => navigate(`/`)}>&lt; All Snippets</b>
        <div id="content">
          <div className="dropdown-row">
            <GetLanguages //tab 1 (left), see assets.jsx for component details
              onSelect={(lang) => {
                setSelectedLanguage(lang);
                setSelectedSnippet(null);
                setCurrentCode(sampleSnippet);
                setOriginalCode(sampleSnippet);
              }}
            />
            <SnipList // tab 2 (right)
              language={selectedLanguage}
              onSelect={(snip) => {
                setSelectedSnippet(snip);
                setCurrentCode(snip.code || sampleSnippet);
                setOriginalCode(snip.code || sampleSnippet);
              }}
            />
          </div>
          <div className="snippetCode" id="codeArea1">
            <SyntaxHighlighter //this is for the block where the code is displayed
              language={languageMap[selectedLanguage]}
              style={oneDark}
              showLineNumbers
              wrapLongLines
              className="code"
            >
              {currentCode}
            </SyntaxHighlighter>
          </div>
          <button //copy button
            id="copyButton"
            className="snippetButton"
            onClick={() => CopyButtonHandler()}
          >
            <CopyIcon />
          </button>
          <button //refresh button
            id="refreshButton"
            className="snippetButton"
            onClick={() => RefreshButtonHandler(sampleSnippet)}
          >
            <RefreshIcon />
          </button>
          <button //copy to clipboard button
            id="addButton"
            className="snippetButton"
            onClick={() => CopySnippetToClipBoard(sampleSnippet)}
          >
            <AddIcon />
          </button>
        </div>
      </div>
      {conf && <div id="confMessage">{conf}</div>}
    </>
  );
};
