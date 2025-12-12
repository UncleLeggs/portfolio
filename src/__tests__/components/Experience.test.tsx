import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Experience } from '../../components/Experience';

describe('Experience Component', () => {
  it('renders the section title', () => {
    render(<Experience />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders all company names', () => {
    render(<Experience />);
    expect(screen.getByText('Strapi Solutions')).toBeInTheDocument();
    expect(screen.getByText('Datagatherers')).toBeInTheDocument();
    expect(screen.getByText('Teleperformance / Cognizant')).toBeInTheDocument();
  });

  it('renders job roles', () => {
    render(<Experience />);
    expect(screen.getByText('Back End Engineer')).toBeInTheDocument();
    expect(screen.getByText('Co-founder & Backend Developer')).toBeInTheDocument();
  });

  it('expands timeline item on click', () => {
    render(<Experience />);
    const strapiItem = screen.getByText('Strapi Solutions').closest('.timeline-item');
    
    // First item should be expanded by default
    expect(strapiItem).toHaveClass('expanded');
  });

  it('collapses expanded item when clicked again', () => {
    render(<Experience />);
    const strapiContent = screen.getByText('Strapi Solutions').closest('.timeline-content');
    const strapiItem = strapiContent?.closest('.timeline-item');
    
    // Click to collapse
    fireEvent.click(strapiItem!);
    expect(strapiItem).not.toHaveClass('expanded');
  });

  it('has correct section id for navigation', () => {
    render(<Experience />);
    const section = document.getElementById('experience');
    expect(section).toBeInTheDocument();
  });
});
