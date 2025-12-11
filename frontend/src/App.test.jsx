import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import "@testing-library/jest-dom";
import React from "react";
import { test, expect } from "vitest";

test("describe action performed", async () => {
  render(<App />); // render the application
  // const button = screen.getByRole('button', { name: /increment/i }) // Find element

  // Simulate user clicking the button //example test, will fail
  //
  // await userEvent.click(button)
  // expect(screen.getByText("Hello World")).toBeInTheDocument(); // Validate operation
});
