/**
 * PreferredLangSetting Component
 * 
 * @file PreferredLangSetting.jsx
 * @author Nicholas LaMantia
 * 
 * Contributors:
 * 
 * Allows users to select and save their preferred programming language
 * to localStorage for use as default in SnippetViewPage
 */

import { useState, useEffect } from 'react';
import './PreferredLangSetting.css';

/**
 * Component for selecting and saving preferred programming language
 * 
 * @function PreferredLangSetting
 * @returns A dropdown to select and save preferred language
 */
export function PreferredLangSetting() {
    const [languages, setLanguages] = useState([]);
    const [selected, setSelected] = useState(localStorage.getItem('preferredLanguage') || '');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let mounted = true;

        const fetchLanguages = async () => {
            setLoading(true);
            try {
                const resp = await fetch('/api/languages');
                const json = await resp.json();

                let langs = [];
                if (Array.isArray(json)) {
                    langs = json.map((l) => l.title || l.name || l);
                } else if (json && Array.isArray(json.languages)) {
                    langs = json.languages.map((l) => l.title || l.name || l);
                }

                if (mounted) setLanguages(langs);
            } catch (err) {
                console.error(err);
                if (mounted) setError(err.message || 'Error fetching languages');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchLanguages();

        return () => {
            mounted = false;
        };
    }, []);

    const handleSelect = (lang) => {
        setSelected(lang);
        localStorage.setItem('preferredLanguage', lang);
        setOpen(false);
    };

    return (
        <div className="preferred-lang-setting">
            <label htmlFor="preferred-lang-dropdown">Preferred Language:</label>
            <div className="preferred-lang-dropdown">
                <button
                    id="preferred-lang-dropdown"
                    className="preferred-lang-toggle"
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                >
                    {selected || 'Select Language'}
                </button>
                {open && (
                    <div className="preferred-lang-menu">
                        {loading && <div className="preferred-lang-item">Loading...</div>}
                        {error && <div className="preferred-lang-item">Error: {error}</div>}
                        {!loading && !error && languages.length === 0 && (
                            <div className="preferred-lang-item">No languages found</div>
                        )}
                        {!loading && !error && languages.map((language) => (
                            <button
                                key={language}
                                type="button"
                                className="preferred-lang-item"
                                onClick={() => handleSelect(language)}
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
