import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from '../../components/Contact';

describe('Contact Component', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders the section title', () => {
    render(<Contact />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('renders contact intro text', () => {
    render(<Contact />);
    expect(screen.getByText(/always open to discussing/i)).toBeInTheDocument();
  });

  it('renders email contact card', () => {
    render(<Contact />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders LinkedIn contact card', () => {
    render(<Contact />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('renders Resume contact card', () => {
    render(<Contact />);
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('copies email to clipboard when clicked', async () => {
    render(<Contact />);
    const emailCard = screen.getByText('Email').closest('button');
    
    fireEvent.click(emailCard!);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('oleg.v.maksimov@gmail.com');
    
    await waitFor(() => {
      expect(screen.getByText('Copied! ✓')).toBeInTheDocument();
    });
  });

  it('has correct section id for navigation', () => {
    render(<Contact />);
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
  });
});
