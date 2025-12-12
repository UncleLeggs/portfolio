import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from '../../components/Skills';
import { skills } from '../../data/portfolio';

describe('Skills Component', () => {
  it('renders the section title', () => {
    render(<Skills />);
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
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

  it('shows growth mindset message', () => {
    render(<Skills />);
    expect(screen.getByText(/Growth Mindset/i)).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    render(<Skills />);
    const section = document.getElementById('skills');
    expect(section).toBeInTheDocument();
  });
});
