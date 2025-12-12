import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Architecture } from '../../components/Architecture/index';

// Mock crypto.randomUUID
beforeEach(() => {
  vi.stubGlobal('crypto', {
    randomUUID: () => 'test-uuid-1234',
  });
});

describe('Architecture Component', () => {
  it('renders the section title', () => {
    render(<Architecture />);
    expect(screen.getByText('Backend Showcase')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(<Architecture />);
    expect(screen.getByRole('tab', { name: /Live Demo/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Architecture/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Tech Stack/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /API Design/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Database/ })).toBeInTheDocument();
  });

  it('shows Live Demo tab by default', () => {
    render(<Architecture />);
    const liveTab = screen.getByRole('tab', { name: /Live Demo/ });
    expect(liveTab).toHaveClass('active');
  });

  it('switches to Tech Stack tab when clicked', () => {
    render(<Architecture />);
    const techStackTab = screen.getByRole('tab', { name: /Tech Stack/ });
    
    fireEvent.click(techStackTab);
    
    expect(techStackTab).toHaveClass('active');
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('switches to API Design tab when clicked', () => {
    render(<Architecture />);
    const apiTab = screen.getByRole('tab', { name: /API Design/ });
    
    fireEvent.click(apiTab);
    
    expect(apiTab).toHaveClass('active');
    expect(screen.getByText('https://api.olegmaksimov.dev')).toBeInTheDocument();
  });

  it('switches to Database tab when clicked', () => {
    render(<Architecture />);
    const dbTab = screen.getByRole('tab', { name: /Database/ });
    
    fireEvent.click(dbTab);
    
    expect(dbTab).toHaveClass('active');
    expect(screen.getByText(/CREATE TABLE/)).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    render(<Architecture />);
    const section = document.getElementById('architecture');
    expect(section).toBeInTheDocument();
  });
});
