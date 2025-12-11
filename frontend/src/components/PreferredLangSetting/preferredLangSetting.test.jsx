/**
 * Author: Nicholas LaMantia
 * Contributers:
 * 
 * @description Tests for Preferred Language Setting component
 * 
 * @returns {void}
 */


/* eslint-env jest */

import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { PreferredLangSetting } from "../PreferredLangSetting/PreferredLangSetting.jsx";

/**
 * Author: Nicholas LaMantia
 * 
 * Contributers: 
 * 
 * @description Test to ensure Preferred Language Setting component is rendered, 
 * clickable, and populated
 * 
 * @returns {void}
 */

test("Renders Preferred Language Setting component", async () => {

    //mock local storage
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: vi.fn(() => 'JavaScript'),
            setItem: vi.fn(() => null),
        },
        writable: true
    });

    render(
        <BrowserRouter>
            <PreferredLangSetting />
        </BrowserRouter>
    );
    expect(screen.getByText("Preferred Language:")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Preferred Language:/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Preferred Language:/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /Preferred Language:/i })).not.toHaveTextContent("Loading..."); //not loading
    expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument(); //no error


});