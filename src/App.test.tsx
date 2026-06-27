import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page title', () => {
  render(<App />);
  const title = screen.getByText(/WE ARE HUMBOLDT/i);
  expect(title).toBeInTheDocument();
});
