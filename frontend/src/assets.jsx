/**
 * Author: Matthew Eagan
 * 
 * Contributors: Matthew Eagan, Nicholas LaMantia
 * 
 * 
 * @returns functions to use in SnippetViewPage
 * 
 */

import { useEffect, useState } from 'react';



/**
 * Author: Matthew Eagan
 * Contributors:
 * 
 * @function SettingsIcon
 * 
 * @returns A icon for settings 
 */
export function SettingsIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3_30)">
                <path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 
                18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 
                30Z" stroke="white" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />

                <path d="M38.8 30C38.5338 30.6032 38.4544 31.2724 38.572 
                31.9212C38.6896 32.57 38.9989 33.1686 39.46 33.64L39.58 
                33.76C39.9519 34.1315 40.2469 34.5726 40.4482 35.0582C40.6495 
                35.5438 40.7531 36.0643 40.7531 36.59C40.7531 37.1157 40.6495 
                37.6362 40.4482 38.1218C40.2469 38.6074 39.9519 39.0485 39.58 
                39.42C39.2085 39.7919 38.7674 40.0869 38.2818 40.2882C37.7962 
                40.4895 37.2757 40.5931 36.75 40.5931C36.2243 40.5931 35.7038 
                40.4895 35.2182 40.2882C34.7326 40.0869 34.2915 39.7919 33.92 
                39.42L33.8 39.3C33.3286 38.8389 32.73 38.5296 32.0812 
                38.412C31.4324 38.2944 30.7632 38.3738 30.16 38.64C29.5685 
                38.8935 29.064 39.3145 28.7086 39.8511C28.3533 40.3877 28.1626 
                41.0164 28.16 41.66V42C28.16 43.0609 27.7386 44.0783 26.9884 
                44.8284C26.2383 45.5786 25.2209 46 24.16 46C23.0991 46 22.0817 
                45.5786 21.3316 44.8284C20.5814 44.0783 20.16 43.0609 20.16 
                42V41.82C20.1445 41.158 19.9302 40.516 19.545 39.9774C19.1598 
                39.4388 18.6215 39.0286 18 38.8C17.3968 38.5338 16.7276 
                38.4544 16.0788 38.572C15.43 38.6896 14.8314 38.9989 14.36 
                39.46L14.24 39.58C13.8685 39.9519 13.4274 40.2469 12.9418 
                40.4482C12.4562 40.6495 11.9357 40.7531 11.41 40.7531C10.8843 
                40.7531 10.3638 40.6495 9.87824 40.4482C9.39265 40.2469 
                8.95149 39.9519 8.58 39.58C8.20809 39.2085 7.91306 38.7674 
                7.71176 38.2818C7.51046 37.7962 7.40685 37.2757 7.40685 
                36.75C7.40685 36.2243 7.51046 35.7038 7.71176 35.2182C7.91306 
                34.7326 8.20809 34.2915 8.58 33.92L8.7 33.8C9.16107 33.3286 
                9.47037 32.73 9.58801 32.0812C9.70565 31.4324 9.62623 30.7632 
                9.36 30.16C9.10647 29.5685 8.68551 29.064 8.14893 
                28.7086C7.61235 28.3533 6.98357 28.1626 6.34 28.16H6C4.93913 
                28.16 3.92172 27.7386 3.17157 26.9884C2.42143 26.2383 
                2 25.2209 2 24.16C2 23.0991 2.42143 22.0817 3.17157 
                21.3316C3.92172 20.5814 4.93913 20.16 6 20.16H6.18C6.84199 
                20.1445 7.48401 19.9302 8.0226 19.545C8.56119 19.1598 8.97143 
                18.6215 9.2 18C9.46623 17.3968 9.54565 16.7276 9.42801 
                16.0788C9.31037 15.43 9.00107 14.8314 8.54 14.36L8.42 
                14.24C8.04809 13.8685 7.75306 13.4274 7.55176 12.9418C7.35046 
                12.4562 7.24685 11.9357 7.24685 11.41C7.24685 10.8843 7.35046 
                10.3638 7.55176 9.87824C7.75306 9.39265 8.04809 8.95149 8.42 
                8.58C8.79149 8.20809 9.23265 7.91306 9.71824 7.71176C10.2038 
                7.51046 10.7243 7.40685 11.25 7.40685C11.7757 7.40685 12.2962 
                7.51046 12.7818 7.71176C13.2674 7.91306 13.7085 8.20809 14.08 
                8.58L14.2 8.7C14.6714 9.16107 15.27 9.47037 15.9188 
                9.58801C16.5676 9.70565 17.2368 9.62623 17.84 9.36H18C18.5915 
                9.10647 19.096 8.68551 19.4514 8.14893C19.8067 7.61235 19.9974 
                6.98357 20 6.34V6C20 4.93913 20.4214 3.92172 21.1716 
                3.17157C21.9217 2.42143 22.9391 2 24 2C25.0609 2 26.0783 
                2.42143 26.8284 3.17157C27.5786 3.92172 28 4.93913 28 
                6V6.18C28.0026 6.82357 28.1933 7.45235 28.5486 7.98893C28.904 
                8.52551 29.4085 8.94647 30 9.2C30.6032 9.46623 31.2724 9.54565 
                31.9212 9.42801C32.57 9.31037 33.1686 9.00107 33.64 8.54L33.76 
                8.42C34.1315 8.04809 34.5726 7.75306 35.0582 7.55176C35.5438 
                7.35046 36.0643 7.24685 36.59 7.24685C37.1157 7.24685 37.6362 
                7.35046 38.1218 7.55176C38.6074 7.75306 39.0485 8.04809 39.42 
                8.42C39.7919 8.79149 40.0869 9.23265 40.2882 9.71824C40.4895 
                10.2038 40.5931 10.7243 40.5931 11.25C40.5931 11.7757 40.4895 
                12.2962 40.2882 12.7818C40.0869 13.2674 39.7919 13.7085 39.42 
                14.08L39.3 14.2C38.8389 14.6714 38.5296 15.27 38.412 
                15.9188C38.2944 16.5676 38.3738 17.2368 38.64 17.84V18C38.8935 
                18.5915 39.3145 19.096 39.8511 19.4514C40.3877 19.8067 41.0164 
                19.9974 41.66 20H42C43.0609 20 44.0783 20.4214 44.8284 
                21.1716C45.5786 21.9217 46 22.9391 46 24C46 25.0609 45.5786 
                26.0783 44.8284 26.8284C44.0783 27.5786 43.0609 28 42 
                28H41.82C41.1764 28.0026 40.5477 28.1933 40.0111 
                28.5486C39.4745 28.904 39.0535 29.4085 38.8 30Z"
                    stroke="white" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_3_30">
                    <rect width="48" height="48" fill="#D9D9D9" />
                </clipPath>
            </defs>
        </svg>
    );
}

/**
 * Author: Nicholas LaMantia
 * Contributors:
 * 
 * @function GetLanguages
 * 
 * @returns HTML to display a selectable drop-down with a list of languages
 */
export function GetLanguages({ id = 'language1', onSelect, defaultLanguage = null }) {
    const [languages, setLanguages] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(defaultLanguage);


    useEffect(() => {
        let mounted = true;
        const fetchLanguages = async () => {
            setLoading(true);
            try {
                const resp = await fetch('/api/languages');
                const json = await resp.json();

                // The server returns an array of language documents; their title is the display value
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


        // Fetch languages lazily when the dropdown is opened for the first time.
        if (open && languages.length === 0) {
            fetchLanguages();
        }

        return () => {
            mounted = false;
        };
    }, [open, languages.length]);

    const handleSelect = (lang) => {
        // Keep existing code that may rely on a hidden <select id={id}>
        const select = document.getElementById(id);
        if (select) select.value = lang;

        if (typeof onSelect === 'function') onSelect(lang);
        setSelected(lang);
        setOpen(false);
    };

    return (
        <div className="language-dropdown">
            <button className="snippetLanguage dropdown-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
                {open ? 'Close Languages' : (selected || 'Select Language')}
            </button>
            {open && (
                <div className="dropdown-menu">
                    {loading && <div className="dropdown-item">Loading...</div>}
                    {error && <div className="dropdown-item">Error: {error}</div>}
                    {!loading && !error && languages.length === 0 && (
                        <div className="dropdown-item">No languages found</div>
                    )}
                    {!loading && !error && languages.map((language) => (
                        <button key={language} type="button" className="dropdown-item" onClick={() => handleSelect(language)}>
                            {language}
                        </button>
                    ))}
                </div>
            )}
            {/* keep a hidden select so any existing DOM code can still reference language1 */}
            <select id={id} style={{ display: 'none' }} aria-hidden="true" value={selected || ''}>
                {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                ))}
            </select>
        </div>
    );
}

/**
   * 
   * Author: Nicholas LaMantia 
   * Contributors: 
   * 
   * @function <SnipList>
   * 
   * @return A list of snippets in HTML from the database,
   *  each being clickable buttons.
   * 
   */
export function SnipList({ id = 'snippet1', onSelect: onSelectSnippet, language = null }) {
    const [snippets, setSnippets] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchSnippets = async () => {
            setLoading(true);
            try {
                const endpoint = language ? `/api/snippets/${encodeURIComponent(language)}` : '/api/snippets';
                const resp = await fetch(endpoint);
                const json = await resp.json();
                // json should be an array of snippet objects
                const items = Array.isArray(json) ? json : [];
                if (mounted) setSnippets(items);
            } catch (err) {
                console.error(err);
                if (mounted) setError(err.message || 'Error fetching snippets');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (open) fetchSnippets();

        return () => {
            mounted = false;
        };
    }, [open, snippets.length, language]);

    const handleSelectSnippet = (snippet) => {
        const label = snippet.title || snippet.name || snippet;
        const select = document.getElementById(id);
        if (select) select.value = label;
        setSelected(label);
        setOpen(false);
        if (typeof onSelectSnippet === 'function') onSelectSnippet(snippet);
    };

    return (
        <div className="snippet-dropdown">
            <button className="snippetLanguage dropdown-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
                {open ? 'Close Snippets' : (selected || 'Select Snippet')}
            </button>
            {open && (
                <div className="dropdown-menu">
                    {loading && <div className="dropdown-item">Loading...</div>}
                    {error && <div className="dropdown-item">Error: {error}</div>}
                    {!loading && !error && snippets.length === 0 && (
                        <div className="dropdown-item">No snippets found</div>
                    )}
                    {!loading && !error && snippets.map((snippet) => {
                        const title = snippet.title || snippet.name || snippet;
                        return (
                            <button key={title} type="button" className="dropdown-item" onClick={() => handleSelectSnippet(snippet)}>
                                {title}
                            </button>
                        );
                    })}
                </div>
            )}
            <select id={id} style={{ display: 'none' }} aria-hidden="true" value={selected || ''}>
                {snippets.map((snippet) => {
                    const title = snippet.title || snippet.name || snippet;
                    return <option key={title} value={title}>{title}</option>
                })}
            </select>
        </div>
    );
}

/**
 * Author: Matthew Eagan
 * Contributors:
 * 
 * @function CopyIcon
 * 
 * 
 * @returns An icon
 */
export function CopyIcon() {
    return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4166 31.25H8.33329C7.22822 31.25 6.16842 30.811 
            5.38701 30.0296C4.60561 29.2482 4.16663 28.1884 4.16663 
            27.0834V8.33335C4.16663 7.22829 4.60561 6.16848 5.38701 
            5.38708C6.16842 4.60567 7.22822 4.16669 8.33329 
            4.16669H27.0833C28.1884 4.16669 29.2482 4.60567 30.0296 
            5.38708C30.811 6.16848 31.25 7.22829 31.25 8.33335V10.4167M22.9166 
            18.75H41.6666C43.9678 18.75 45.8333 20.6155 45.8333 
            22.9167V41.6667C45.8333 43.9679 43.9678 45.8334 41.6666 
            45.8334H22.9166C20.6154 45.8334 18.75 43.9679 18.75 
            41.6667V22.9167C18.75 20.6155 20.6154 18.75 22.9166 18.75Z"
                stroke="#D9D9D9" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    );
}

/**
 * Authors: Matthew Eagan
 * Contributors:
 * 
 * @function RefreshIcon
 * 
 * @returns An icon
 * 
 * */
export function RefreshIcon() {
    return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M47.9167 8.33335V20.8333M47.9167 20.8333H35.4167M47.9167 
            20.8333L38.25 11.75C36.011 9.50984 33.2409 7.87336 30.1984 
            6.99329C27.1558 6.11323 23.9398 6.01825 20.8506 6.71722C17.7614 
            7.41619 14.8996 8.88634 12.5323 10.9905C10.1649 13.0946 8.36914 
            15.7642 7.31254 18.75M2.08337 41.6667V29.1667M2.08337 
            29.1667H14.5834M2.08337 29.1667L11.75 38.25C13.9891 40.4902 
            16.7592 42.1267 19.8017 43.0067C22.8443 43.8868 26.0602 43.9818 
            29.1494 43.2828C32.2387 42.5838 35.1005 41.1137 37.4678 
            39.0096C39.8352 36.9054 41.6309 34.2359 42.6875 31.25"
                stroke="#D9D9D9" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    );
}

/**
 * Author: Matthew Eagan
 * Contributors:
 * 
 * @function AddIcon
 * 
 * @returns An icon
 * 
 */
export function AddIcon() {
    return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M25 10.4167V39.5834M10.4166 25H39.5833"
                stroke="#D9D9D9" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>

    );
}
