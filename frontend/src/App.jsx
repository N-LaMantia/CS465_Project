import { useState } from "react";
import "./App.css";
import LanguagesList from "./components/Component/languagesList.jsx";

export default function App() {
  const [count, setCount] = useState(0);
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setShowLanguages(true)}>
          Load Languages
        </button>
        <div id="languages-container">
          <LanguagesList shouldFetch={showLanguages} />
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </>
  );
}