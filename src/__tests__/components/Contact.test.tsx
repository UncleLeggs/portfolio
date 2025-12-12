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

  it('renders email contact card with actions', () => {
    render(<Contact />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('📤 Send')).toBeInTheDocument();
    expect(screen.getByText('📋 Copy')).toBeInTheDocument();
  });

  it('renders LinkedIn contact card', () => {
    render(<Contact />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('renders Resume contact card', () => {
    render(<Contact />);
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('copies email to clipboard when copy button clicked', async () => {
    render(<Contact />);
    const copyBtn = screen.getByText('📋 Copy');
    
    fireEvent.click(copyBtn);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('oleg.v.maksimov@gmail.com');
    
    await waitFor(() => {
      expect(screen.getByText('✓ Copied')).toBeInTheDocument();
    });
  });

  it('has correct section id for navigation', () => {
    render(<Contact />);
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
  });
});
