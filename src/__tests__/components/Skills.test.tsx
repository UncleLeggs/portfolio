import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Skills } from '../../components/Skills';
import { skills } from '../../data/portfolio';

describe('Skills Component', () => {
  it('renders the section title', () => {
    render(<Skills />);
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders all skills from data', () => {
    render(<Skills />);
    skills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it('renders skill categories', () => {
    render(<Skills />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('shows hint text', () => {
    render(<Skills />);
    expect(screen.getByText(/Try clicking all the skills/i)).toBeInTheDocument();
  });

  it('skill tag responds to hover', () => {
    render(<Skills />);
    const typeScriptTag = screen.getByText('TypeScript');
    
    fireEvent.mouseEnter(typeScriptTag);
    expect(typeScriptTag).toHaveClass('hovered');
    
    fireEvent.mouseLeave(typeScriptTag);
    expect(typeScriptTag).not.toHaveClass('hovered');
  });

  it('has correct section id for navigation', () => {
    render(<Skills />);
    const section = document.getElementById('skills');
    expect(section).toBeInTheDocument();
  });
});
