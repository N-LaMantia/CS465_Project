/**
 * @file LandingPage.test.jsx
 * @author Nicholas LaMantia
 * 
 * Purpose: Test file for LandingPage.jsx
 * Contributors:
 * 
 * @returns {void}
 * 
 * 
 */

/* eslint-env jest */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { LandingPage } from "./LandingPage.jsx";


/**
 * @author Nicholas LaMantia
 * @function LandingPage.test.jsx
 * Contributors: 
 * 
 * Test to ensure Landing Page renders correctly with welcome message and button
 * @returns {void}
 */

test("Renders Landing Page with welcome message and button", async () => {
    render(
        <BrowserRouter>
            <LandingPage />
        </BrowserRouter>
    );
    expect(screen.getByText("Welcome to CSnippy!")).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Snippet Comparer/i });
    expect(button).toBeInTheDocument();
});

/** 
 * @author Nicholas LaMantia
 * @function LandingPage.test.jsx
 * Contributors:
 * 
 * @description Test to ensure Snippet Comparer button is clickable
 * @returns {void}
 */

test("Snippet Comparer button is clickable", async () => {
    const user = userEvent.setup();
    render(
        <BrowserRouter>
            <LandingPage />
        </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /Snippet Comparer/i });
    await user.click(button);
    expect(button).toBeInTheDocument();
});



