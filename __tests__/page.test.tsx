import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {  // More descriptive describe name

  it('renders the main content', () => {
    render(<Home />);

    // Test for user-visible elements and content, not implementation details
    expect(screen.getByRole('heading', { name: 'My Projects' })).toBeInTheDocument(); // Example: Check for the "My Projects" heading
    expect(screen.getByRole('heading', { name: 'Rate The Skills I Used To Make This Site!' })).toBeInTheDocument(); // Example: Check for the "Rate the skills" heading

    // Or, if absolutely necessary, use data-testid for elements that are hard to query otherwise:
    const intro = screen.getByTestId('intro'); // Use sparingly and only when needed
    expect(intro).toBeInTheDocument();

    // Instead of testing for *all* elements, focus on key elements and functionality.
    // Testing *everything* makes your tests brittle.
  });
});
