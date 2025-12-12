import { describe, it, expect } from 'vitest';
import {
  personalInfo,
  aboutMe,
  experiences,
  skills,
  education,
  easterEggs,
} from '../../data/portfolio';

describe('Portfolio Data', () => {
  describe('personalInfo', () => {
    it('has required fields', () => {
      expect(personalInfo.name).toBe('Oleg Maksimov');
      expect(personalInfo.title).toBeDefined();
      expect(personalInfo.tagline).toBeDefined();
      expect(personalInfo.linkedin).toContain('linkedin.com');
      expect(personalInfo.cvPath).toBeDefined();
    });

    it('has valid LinkedIn URL', () => {
      expect(personalInfo.linkedin).toMatch(/^https:\/\/www\.linkedin\.com/);
    });
  });

  describe('aboutMe', () => {
    it('is a non-empty string', () => {
      expect(aboutMe).toBeTruthy();
      expect(typeof aboutMe).toBe('string');
      expect(aboutMe.length).toBeGreaterThan(100);
    });

    it('mentions key technologies', () => {
      expect(aboutMe).toContain('TypeScript');
      expect(aboutMe).toContain('Node.js');
    });
  });

  describe('experiences', () => {
    it('has at least 3 experiences', () => {
      expect(experiences.length).toBeGreaterThanOrEqual(3);
    });

    it('each experience has required fields', () => {
      experiences.forEach((exp) => {
        expect(exp.company).toBeDefined();
        expect(exp.role).toBeDefined();
        expect(exp.period).toBeDefined();
        expect(exp.location).toBeDefined();
        expect(exp.highlights).toBeInstanceOf(Array);
        expect(exp.highlights.length).toBeGreaterThan(0);
      });
    });

    it('experiences are in reverse chronological order', () => {
      // First experience should be most recent (Strapi)
      expect(experiences[0].company).toBe('Strapi Solutions');
    });
  });

  describe('skills', () => {
    it('has skills defined', () => {
      expect(skills.length).toBeGreaterThan(0);
    });

    it('each skill has name and category', () => {
      skills.forEach((skill) => {
        expect(skill.name).toBeDefined();
        expect(skill.category).toBeDefined();
        expect(['language', 'database', 'cloud', 'tools', 'framework']).toContain(
          skill.category
        );
      });
    });

    it('includes key technologies', () => {
      const skillNames = skills.map((s) => s.name);
      expect(skillNames).toContain('TypeScript');
      expect(skillNames).toContain('Node.js');
      expect(skillNames).toContain('PostgreSQL');
    });
  });

  describe('education', () => {
    it('has required fields', () => {
      expect(education.institution).toBeDefined();
      expect(education.degree).toBeDefined();
      expect(education.period).toBeDefined();
      expect(education.location).toBeDefined();
    });

    it('has valid website URL', () => {
      expect(education.website).toMatch(/^https?:\/\//);
    });
  });

  describe('easterEggs', () => {
    it('has Konami code sequence', () => {
      expect(easterEggs.konamiCode).toBeInstanceOf(Array);
      expect(easterEggs.konamiCode.length).toBe(10);
    });

    it('has secret messages', () => {
      expect(easterEggs.secretMessages).toBeInstanceOf(Array);
      expect(easterEggs.secretMessages.length).toBeGreaterThan(0);
    });

    it('has click threshold', () => {
      expect(easterEggs.clickThreshold).toBeGreaterThan(0);
    });
  });
});
