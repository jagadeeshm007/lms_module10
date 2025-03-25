import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import for additional matchers
import App from "../src/App";

test('renders Vite + React heading', () => {
  render(<App />);
  expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
});

test('increments count on button click', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /count is 0/i });

  fireEvent.click(button);
  expect(button).toHaveTextContent('count is 1');

  fireEvent.click(button);
  expect(button).toHaveTextContent('count is 2');
});
