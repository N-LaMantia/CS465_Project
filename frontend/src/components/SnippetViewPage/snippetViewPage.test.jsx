/** Author: Nicholas LaMantia
 * Contributors: 
 * 
 * @file preferredLangSetting.test.jsx
 * @description Test file for PreferredLangSetting.jsx
 * 
 * @returns {void}
 * 
 */

import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { SnippetViewPage } from "../SnippetViewPage/SnippetViewPage.jsx";

/* eslint-env jest */

/**Author: Nicholas LaMantia 
 * Contributers:
 * 
 * @description Test to ensure snippet view page is loaded correctly and populated.
 * Also tests if elements on the view page are present.
 * 
 * @returns {void}
 * 
 */



test("Renders snippet view page", async () => {
    render(
        <BrowserRouter>
            <SnippetViewPage />
        </BrowserRouter>
    )

    // expect(screen.getByText('Select a language')).toBeInTheDocument();
    expect(screen.getByTestId('SyntaxHighlighter')).toBeInTheDocument();
    expect(screen.getByTestId('copyButton')).toBeInTheDocument();
    expect(screen.getByTestId('dropdowns')).toBeInTheDocument();

    expect(screen.getByTestId('dropdowns')).toBeDefined();

})