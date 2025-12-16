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
  SubIcon,
  GetLanguages,
  SnipList,
  TagFilter,
} from "../../assets.jsx";
import React, { useState, useEffect } from "react";
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
  // Default text to prompt the user
  const sampleSnippet = `/*Select a language and a snippet above!
Press the plus (+) button to compare snippets!*/`;

  // Selected language / snippet and code state
  const [selectedLanguage, setSelectedLanguage] = useState(
    () => localStorage.getItem("preferredLanguage") || null,
  );
  // An additional selected language for comparing
  const [compareLanguage, setCompareLanugage] = useState(selectedLanguage);

  // The main selected code snippet
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  // The comparison code snippet
  const [compareSnippet, setCompareSnippet] = useState(null);

  // The text information pulled from the DB for the selected snippet
  const [currentCode, setCurrentCode] = useState(sampleSnippet);
  // The text information pulled from the DB for the compare snippet
  const [compareCode, setCompareCode] = useState(sampleSnippet);

  // Filters a user can select to streamline snippet selection
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
        // console.log("tags: ", data);
        setAllTags(data.tags || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTags();
  }, [selectedLanguage]);

  useEffect(() => {
    const loadSnippets = async () => {
      const getSnips = async (lang) => {
        if (!lang) return [];
        const response = await fetch(`/api/snippets/${lang}`);
        if (!response.ok) return [];

        const data = await response.json();
        console.log("Snippets: ", data.snippets);
        return data.snippets ?? [];
      };

      const [lang1Snips, lang2Snips] = await Promise.all([
        getSnips(selectedLanguage),
        getSnips(compareLanguage),
      ]);

      const trimmedTitle = selectedSnippet.trim();

      const curr = lang1Snips.find((snip) => snip.title === trimmedTitle);
      if (curr) {
        setCurrentCode(curr.code);
      }

      const comp = lang2Snips.find((snip) => snip.title === trimmedTitle);
      if (comp) {
        setCompareCode(comp.code);
      }

      console.log("Snippets loaded");
      console.log("Language 1: ", selectedLanguage);
      console.log("Language 2: ", compareLanguage);
      console.log("Snippet 1: ", currentCode);
      console.log("Snippet 2: ", compareCode);
    };

    loadSnippets();
  }, [
    selectedLanguage,
    selectedSnippet,
    compareLanguage,
    currentCode,
    compareCode,
  ]);

  let languageMap = {
    "C++": "cpp",
    JavaScript: "javascript",
    Python: "python",
    Lua: "lua",
  };

  // Active comparison states
  const [compareMode, isComparing] = useState(false);

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

          {!compareMode && (<>
            <div 
              className="dropdown-row" 
              id="fullDropdown" 
              dropdowns data-testid="dropdowns"
            >
              <GetLanguages
                defaultLanguage={selectedLanguage}
                onSelect={(lang) => {
                  setSelectedLanguage(lang);
                  setSelectedSnippet(null);
                  setCurrentCode(sampleSnippet);
                }}
              />
              <TagFilter 
                language={selectedLanguage}
                onTagsChange={(tags) => {
                  setSelectedTags(tags);
                }}
                GetLanguages data-testid="GetLanguages"
              />
              {selectedSnippet ? (
                <SnipList
                  language={selectedLanguage} 
                  selectedTags={selectedTags}
                  currSnippet={selectedSnippet.title}
                  onSelect={(snip) => {
                    console.log("Snip: ", snip);
                    setSelectedSnippet(snip);
                    setCurrentCode(snip.code || sampleSnippet);
                  }}
                />
              ) : (
                <SnipList
                  compare={compareMode}
                  selectedTags={selectedTags}
                  language={selectedLanguage} 
                  currSnippet={null}
                  onSelect={(snip) => {
                    setSelectedSnippet(snip);
                    console.log(snip);
                    setCurrentCode(snip.code || sampleSnippet);
                  }}
                  GetLanguages
                  data-testid="GetLanguages"
                />
              )}
            </div>
            <div className="snippetCode" id="fullCodeArea">
              <div 
                className="displayedSnippet" 
                SyntaxHighlighter data-testid="SyntaxHighlighter"
              >  
                <SyntaxHighlighter
                  id="codeArea" 
                  language={languageMap[selectedLanguage]}
                  style={oneDark}
                  customStyle={{padding: '0'}}
                  showLineNumbers
                  wrapLongLines
                  className="code"
                >
                  <CopyIcon />
                </button>
                <button
                  id="addButton"
                  className="snippetButton"
                  onClick={() => isComparing(true)}
                >
                  <AddIcon />
                </button>
              </div>
              <button
                id="copyButton"
                className="snippetButton"
                copyIcon data-testid="copyButton"
                onClick={() => CopyButtonHandler()}
              >
                <CopyIcon />
              </button>
              <button
                id="addButton"
                className="snippetButton"
                onClick={() => isComparing(true)}
              >
                <AddIcon />
              </button>
            </div>
          </>)}

          {compareMode && (
            <>
              <div className="dropdown-row" id="compareDropdown">
                <TagFilter
                  language={selectedLanguage}
                  onTagsChange={(tags) => {
                    setSelectedTags(tags);
                  }}
                  GetLanguages
                  data-testid="GetLanguages"
                />
                <GetLanguages
                  id="originalLang"
                  defaultLanguage={selectedLanguage}
                  onSelect={(lang) => {
                    setSelectedLanguage(lang);
                    setCurrentCode(sampleSnippet);
                  }}
                />
              )}
            </div>
            <div className="snippetCode" id="compareCodeArea">
              <div className="displayedSnippet">  
                <SyntaxHighlighter
                  id="codeAreaLeft" 
                  language={languageMap[selectedLanguage]}
                  style={oneDark}
                  customStyle={{padding: '0', fontSize: '13px'}}
                  showLineNumbers
                  wrapLongLines
                  className="code"
                >
                  {currentCode}
                </SyntaxHighlighter>
              </div>
              <button
                id="copyButton"
                className="snippetButton"
                onClick={() => CopyButtonHandler()}
              >
                <CopyIcon />
              </button>
              <button
                id="subtractButton"
                className="snippetButton"
                onClick={() => isComparing(false)}
              >
                <SubIcon />
              </button>
              
              {/* Second snippet view to be compared */}
              <div className="displayedSnippet"> 
                 {/* Displayed code  */}
                <SyntaxHighlighter
                  id="codeAreaRight" 
                  language={languageMap[selectedLanguage]}
                  style={oneDark}
                  customStyle={{padding: '0', fontSize: '13px'}}
                  showLineNumbers
                  wrapLongLines
                  className="code"
                >
                  <SubIcon />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {conf && <div id="confMessage">{conf}</div>}
    </>
  );
};
