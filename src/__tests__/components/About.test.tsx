import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../../components/About';

describe('About Component', () => {
  it('renders the section title', () => {
    render(<About />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders stat cards with updated values', () => {
    render(<About />);
    expect(screen.getByText('8+')).toBeInTheDocument();
    expect(screen.getByText('Years in Tech')).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('Uptime Maintained')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Languages Spoken')).toBeInTheDocument();
  });

  it('renders about text content', () => {
    render(<About />);
    expect(screen.getByText(/Senior Backend Engineer/i)).toBeInTheDocument();
  });

  it('renders key achievements section', () => {
    render(<About />);
    expect(screen.getByText('🎯 Key Achievements')).toBeInTheDocument();
    expect(screen.getByText(/clean Application\/Infrastructure\/Service architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/Owner of multiple implementations/i)).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    render(<About />);
    const section = document.getElementById('about');
    expect(section).toBeInTheDocument();
  });
});
