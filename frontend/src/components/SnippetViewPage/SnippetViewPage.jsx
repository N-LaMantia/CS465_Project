/**
 * A page for viewing snippet code
 *
 * @file SnippetViewPage.jsx
 * @author Matthew Eagan
 * Contributors: Nicholas LaMantia
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
import React, { useState, useEffect } from 'react';
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
 * Contributors: Matthew Eagan, Nicholas LaMantia, Thomas Gallaher
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
  const [selectedLanguage, setSelectedLanguage] = useState(
    () => localStorage.getItem("preferredLanguage") || null,
  );
  const [SelectedSnippet, setSelectedSnippet] = useState(null);
  const [currentCode, setCurrentCode] = useState(sampleSnippet);
  const [originalCode, setOriginalCode] = useState(sampleSnippet);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags");
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setAllTags(data.tags || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTags();
  }, [selectedLanguage]);

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
        <button className="backButton" onClick={() => navigate(`/`)}>
          &lt; Back
        </button>
        <div id="content">
          <div>
            Tag Selection <br />
            {allTags.map((tag) => (
              <input
                type="checkbox"
                id={tag}
                name="tag"
                value={tag}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTags([...selectedTags, tag]);
                  } else {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  }
                }}
              />
            ))}
          </div>
          <div className="dropdown-row"
            dropdowns data-testid="dropdowns">
            <GetLanguages
              defaultLanguage={selectedLanguage}
              onSelect={(lang) => {
                setSelectedLanguage(lang);
                localStorage.setItem("preferredLanguage", lang);
                setSelectedSnippet(null);
                setCurrentCode(sampleSnippet);
                setOriginalCode(sampleSnippet);

              }}
              GetLanguages data-testid="GetLanguages"
            />
            <SnipList
              language={selectedLanguage}
              onSelect={(snip) => {
                setSelectedSnippet(snip);
                setCurrentCode(snip.code || sampleSnippet);
                setOriginalCode(snip.code || sampleSnippet);

              }}

            />
          </div>
          <div className="snippetCode" id="codeArea1">
            <SyntaxHighlighter
              language={languageMap[selectedLanguage]}
              style={oneDark}
              showLineNumbers
              wrapLongLines
              className="code"
              SyntaxHighlighter data-testid="SyntaxHighlighter"
            >
              {currentCode}
            </SyntaxHighlighter>
            <div>{SelectedSnippet && SelectedSnippet.description}</div>
          </div>
          <button
            id="copyButton"
            className="snippetButton"
            onClick={() => CopyButtonHandler()}
            copyIcon data-testid="copyButton"
          >
            <CopyIcon />
          </button>
          <button
            id="refreshButton"
            className="snippetButton"
            onClick={() => RefreshButtonHandler(sampleSnippet)}
          >
            <RefreshIcon />
          </button>
          <button
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
