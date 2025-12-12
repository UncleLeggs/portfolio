import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { useKonamiCode } from '../../hooks/useKonamiCode';

describe('useKonamiCode Hook', () => {
  it('calls callback when Konami code is entered', () => {
    const callback = vi.fn();
    renderHook(() => useKonamiCode(callback));

    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];

    konamiSequence.forEach((key) => {
      fireEvent.keyDown(window, { key });
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback for incorrect sequence', () => {
    const callback = vi.fn();
    renderHook(() => useKonamiCode(callback));

    const wrongSequence = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    wrongSequence.forEach((key) => {
      fireEvent.keyDown(window, { key });
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('resets sequence after successful activation', () => {
    const callback = vi.fn();
    renderHook(() => useKonamiCode(callback));

    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];

    // Enter code twice
    konamiSequence.forEach((key) => {
      fireEvent.keyDown(window, { key });
    });
    konamiSequence.forEach((key) => {
      fireEvent.keyDown(window, { key });
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
