/**
 * A component Template
 *
 * @file
 * @author Thomas Gallaher
 * Contributors:
 */

import { useEffect, useState } from "react";
import axios from "axios";

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
      {/* Dropdown for languages */}
      <label htmlFor="languageDropdown">Languages:</label>
      <select id="languageDropdown">
        {languages.map((language) => (
          <option key={language._id || language.title} value={language.title}>
            {language.title}
          </option>
        ))}
      </select>

      <br />

      {/* Dropdown for snippets */}
      <label htmlFor="snippetDropdown">Snippets:</label>
      <select id="snippetDropdown">
        {snippets.map((snippet) => (
          <option key={snippet._id || snippet.title} value={snippet.title}>
            {snippet.title} - {snippet.language}
          </option>
        ))}
      </select>
    </div>
  );
}
