import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../../components/About';

describe('About Component', () => {
  it('renders the section title', () => {
    render(<About />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders stat cards', () => {
    render(<About />);
    expect(screen.getByText('2+')).toBeInTheDocument();
    expect(screen.getByText('Years at Strapi')).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('Uptime Maintained')).toBeInTheDocument();
  });

  it('renders about text content', () => {
    render(<About />);
    expect(screen.getByText(/backend engineer/i)).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    render(<About />);
    const section = document.getElementById('about');
    expect(section).toBeInTheDocument();
  });
});
