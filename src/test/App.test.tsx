import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the home page', async () => {
    render(<App />);
    expect(await screen.findByText(/Find Your Dream/)).toBeInTheDocument();
  });
});
