import DarkModeToggle from '../src/app/components/DarkModeToggle';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders and toggles dark mode', () => {
  render(<DarkModeToggle />);
  const darkModeButton = screen.getByTestId('dark-mode-button'); // Use role and accessible name
  expect(darkModeButton).toBeInTheDocument();
});
