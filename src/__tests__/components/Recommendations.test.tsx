import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Recommendations } from '../../components/Recommendations';
import { recommendations } from '../../data/portfolio';

describe('Recommendations Component', () => {
  it('renders the section title', () => {
    render(<Recommendations />);
    expect(screen.getByText('Recommendations')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<Recommendations />);
    expect(screen.getByText('What colleagues say about me')).toBeInTheDocument();
  });

  it('renders LinkedIn action buttons', () => {
    render(<Recommendations />);
    expect(screen.getByText('View All on LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('✍️ Write a Recommendation')).toBeInTheDocument();
  });

  it('renders first recommendation by default', () => {
    render(<Recommendations />);
    
    if (recommendations.length > 0) {
      expect(screen.getByText(recommendations[0].name)).toBeInTheDocument();
      expect(screen.getByText(recommendations[0].text)).toBeInTheDocument();
    }
  });

  it('renders navigation arrows', () => {
    render(<Recommendations />);
    expect(screen.getByLabelText('Previous recommendation')).toBeInTheDocument();
    expect(screen.getByLabelText('Next recommendation')).toBeInTheDocument();
  });

  it('navigates to next recommendation on click', () => {
    render(<Recommendations />);
    
    if (recommendations.length > 1) {
      const nextBtn = screen.getByLabelText('Next recommendation');
      fireEvent.click(nextBtn);
      
      expect(screen.getByText(recommendations[1].name)).toBeInTheDocument();
    }
  });

  it('renders verification badge', () => {
    render(<Recommendations />);
    expect(screen.getByText('✓ Verified')).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    render(<Recommendations />);
    const section = document.getElementById('recommendations');
    expect(section).toBeInTheDocument();
  });

  it('LinkedIn buttons have correct target', () => {
    render(<Recommendations />);
    const linkedinLinks = screen.getAllByRole('link');
    
    linkedinLinks.forEach((link) => {
      if (link.getAttribute('href')?.includes('linkedin.com')) {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });
});
