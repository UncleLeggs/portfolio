import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Highlights } from '../../components/Highlights';

describe('Highlights Component', () => {
  it('renders the section title', () => {
    render(<Highlights />);
    expect(screen.getByText('Highlight Reel')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Highlights />);
    expect(screen.getByText('Numbers that speak for themselves')).toBeInTheDocument();
  });

  it('renders all highlight cards', () => {
    render(<Highlights />);
    expect(screen.getByText('Strapi')).toBeInTheDocument();
    expect(screen.getByText('Current Company')).toBeInTheDocument();
    expect(screen.getByText('Feature Owner')).toBeInTheDocument();
    expect(screen.getByText('Technical Ownership')).toBeInTheDocument();
    expect(screen.getByText('Clean Architecture')).toBeInTheDocument();
    expect(screen.getByText('System Design')).toBeInTheDocument();
    expect(screen.getByText('SDLC')).toBeInTheDocument();
    expect(screen.getByText('Development Process')).toBeInTheDocument();
    expect(screen.getByText('Service Uptime')).toBeInTheDocument();
    expect(screen.getByText('Years as Co-founder')).toBeInTheDocument();
  });

  it('renders highlight icons', () => {
    render(<Highlights />);
    expect(screen.getByText('🏢')).toBeInTheDocument();
    expect(screen.getByText('👑')).toBeInTheDocument();
    expect(screen.getByText('🏗️')).toBeInTheDocument();
    expect(screen.getByText('📋')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('renders descriptions for highlights', () => {
    render(<Highlights />);
    expect(screen.getByText(/60k\+ GitHub stars/i)).toBeInTheDocument();
    expect(screen.getByText(/RFC to production deployment/i)).toBeInTheDocument();
    expect(screen.getByText(/Application\/Infrastructure\/Service architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/RFCs, POCs, backlog refinement/i)).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    render(<Highlights />);
    const section = document.getElementById('highlights');
    expect(section).toBeInTheDocument();
  });
});
