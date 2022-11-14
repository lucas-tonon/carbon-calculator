import { sanitizeFloatInput } from '../utils';

describe('sanitizeFloatInput', () => {
  it('should return empty if provided input was string', () => {
    expect(sanitizeFloatInput('someTest+-[]{}with$trangeChars')).toBe('');
  });

  it('should filter text from input that has valid number, and return float', () => {
    expect(sanitizeFloatInput('123.456someTestText')).toBe(123.456);
  });

  it('should remove zeros from the start of the number, and return float', () => {
    expect(sanitizeFloatInput('0000123.456')).toBe(123.456);
  });

  it('should allow only a single dot, representing floating number', () => {
    expect(sanitizeFloatInput('123.456.7...89.')).toBe(123.456789);
  });
});
