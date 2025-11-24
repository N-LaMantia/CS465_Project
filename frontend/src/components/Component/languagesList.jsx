/**
 * @file languagesList.jsx
 * @author Nicholas LaMantia
 * 
 * 
 * 
 * Contributors:
 * 
 */

import { useState, useEffect } from 'react';

/**
 * @description A list of programming languages as buttons
 * 
 * @function LanguagesList
 * @author Nicholas LaMantia
 * 
 * Contributors:
 * 
 * 
 * * @return A list of programming languages as buttons in HTML
 */
export default function LanguagesList({ shouldFetch }) {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!shouldFetch) return;

        const fetchLanguages = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/languages');
                const data = await response.json();
                console.log(data);
                setLanguages(data.languages || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, [shouldFetch]);

    if (loading) return <div>Loading languages...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {languages.map((language) => (
                <button key={language} className="language-button">
                    {language}
                </button>
            ))}
        </>
    );
}
