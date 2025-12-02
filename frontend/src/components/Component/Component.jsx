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
      {languages.map((language) => (
        <div key={language._id || language.title}>{language.title}</div>
      ))}
      <br />
      {snippets.map((snippet) => (
        <div key={snippet._id || snippet.title}>
          {snippet.title} - {snippet.language}
          <br />
          <code style={{ whiteSpace: "pre-wrap", align: "left" }}>
            <pre>{snippet.code}</pre>
          </code>
        </div>
      ))}
    </div>
  );
}
