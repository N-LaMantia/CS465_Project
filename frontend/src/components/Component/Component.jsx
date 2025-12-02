/**
 * A component Template
 *
 * @file
 * @author Thomas Gallaher
 * Contributors:
 */

import { useEffect, useState } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * A description of the component
 *
 * @function
 * @author Thomas Gallaher
 * Contributors:
 *
 * @return A template for a component
 */
export default function Component() {
  const [languages, setLanguages] = useState([]);
  const [snippets, setSnippets] = useState([]);

  const langMap = {
    "c++": "cpp",
    JavaScript: "javascript",
    Python: "python",
    Lua: "lua",
  };

  useEffect(() => {
    axios
      .get("/api/languages")
      .then((res) => {
        setLanguages(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get("/api/snippets")
      .then((res) => {
        setSnippets(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []); // empty array = run once on mount

  return (
    <div>
      {languages.map((language) => (
        <div key={language._id || language.title}>{language.title}</div>
      ))}
      <br />
      {snippets.map((snippet) => (
        <SyntaxHighlighter
          language={langMap[snippet.language]}
          style={oneDark}
          showLineNumbers
          showInlineLineNumbers
        >
          {snippet.code}
        </SyntaxHighlighter>
      ))}
    </div>
  );
}
