import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Hero } from '../../components/Hero';

describe('Hero Component', () => {
  it('renders the greeting text', () => {
    render(<Hero />);
    expect(screen.getByText("Hello, I'm")).toBeInTheDocument();
  });

  it('renders download CV button', () => {
    render(<Hero />);
    expect(screen.getByText(/Download CV/i)).toBeInTheDocument();
  });

  it('renders LinkedIn button', () => {
    render(<Hero />);
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
  });

  it('renders GitHub button', () => {
    render(<Hero />);
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
  });

  it('renders Contact button', () => {
    render(<Hero />);
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('shows availability badge when open to opportunities', () => {
    render(<Hero />);
    expect(screen.getByText('Open to opportunities')).toBeInTheDocument();
  });

  it('renders quick stats', () => {
    render(<Hero />);
    expect(screen.getByText('8+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('Uptime Record')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  it('shows scroll indicator', () => {
    render(<Hero />);
    expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
  });

  it('triggers easter egg after multiple clicks on name', async () => {
    render(<Hero />);
    const nameElement = screen.getByRole('heading', { level: 1 });
    
    // Click 7 times to trigger easter egg
    for (let i = 0; i < 7; i++) {
      fireEvent.click(nameElement);
    }
    
    await waitFor(() => {
      expect(screen.getByText(/easter egg/i)).toBeInTheDocument();
    });
  });
});
