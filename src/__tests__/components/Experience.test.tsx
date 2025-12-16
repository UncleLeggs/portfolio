import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Experience } from '../../components/Experience';

describe('Experience Component', () => {
  it('renders the section title', () => {
    render(<Experience />);
    expect(screen.getByText('Career Journey')).toBeInTheDocument();
  });

  it('renders all company names', () => {
    render(<Experience />);
    expect(screen.getByText('Strapi Solutions')).toBeInTheDocument();
    expect(screen.getByText('Datagatherers')).toBeInTheDocument();
  });

  it('renders job roles', () => {
    render(<Experience />);
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Co-founder & Backend Developer')).toBeInTheDocument();
  });

  it('most recent job (Strapi) is expanded by default', () => {
    render(<Experience />);
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    // Last item in DOM is Strapi (most recent) and should be expanded
    const lastItem = roadmapItems[roadmapItems.length - 1];
    expect(lastItem).toHaveClass('expanded');
  });

  it('toggles expansion when clicked', () => {
    render(<Experience />);
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    const lastItem = roadmapItems[roadmapItems.length - 1]; // Strapi
    
    // Click to collapse
    fireEvent.click(lastItem);
    expect(lastItem).not.toHaveClass('expanded');
    
    // Click to expand again
    fireEvent.click(lastItem);
    expect(lastItem).toHaveClass('expanded');
  });

  it('has correct section id for navigation', () => {
    render(<Experience />);
    const section = document.getElementById('experience');
    expect(section).toBeInTheDocument();
  });
});
