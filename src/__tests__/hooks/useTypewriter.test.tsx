import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTypewriter } from '../../hooks/useTypewriter';

describe('useTypewriter Hook', () => {
  it('starts with empty text', () => {
    const { result } = renderHook(() => useTypewriter('Hello', 50, 0));
    expect(result.current.displayedText).toBe('');
    expect(result.current.isComplete).toBe(false);
  });

  it('eventually completes typing', async () => {
    const { result } = renderHook(() => useTypewriter('Hi', 10, 0));
    
    // Wait for typing to complete (real timers)
    await waitFor(
      () => {
        expect(result.current.isComplete).toBe(true);
        expect(result.current.displayedText).toBe('Hi');
      },
      { timeout: 500 }
    );
  });

  it('returns correct final text', async () => {
    const testText = 'Test';
    const { result } = renderHook(() => useTypewriter(testText, 5, 0));
    
    await waitFor(
      () => {
        expect(result.current.displayedText).toBe(testText);
      },
      { timeout: 500 }
    );
  });
});
