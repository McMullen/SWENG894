import { formatDate, formatCalendarDate, calculateAge } from '../src/utils/dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats a date string as MM-DD-YYYY', () => {
      const input = '2024-01-05';
      const expected = '01-05-2024';
      expect(formatDate(input)).toBe(expected);
    });
  });

  describe('formatCalendarDate', () => {
    it('formats a date string as YYYY-MM-DD for calendar inputs', () => {
      const input = '2024-01-05';
      const expected = '2024-01-05';
      expect(formatCalendarDate(input)).toBe(expected);
    });
  });

  describe('calculateAge', () => {
    it('calculates age in years correctly', () => {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - 25);
      const expected = '25 year(s)';
      expect(calculateAge(birthDate.toISOString())).toBe(expected);
    });

    it('calculates age in months correctly when less than 1 year old', () => {
      const birthDate = new Date();
      birthDate.setMonth(birthDate.getMonth() - 6);
      const expected = '6 month(s)';
      expect(calculateAge(birthDate.toISOString())).toBe(expected);
    });

    it('calculates age in weeks correctly when less than 1 month old', () => {
      const birthDate = new Date();
      birthDate.setDate(birthDate.getDate() - 14);
      const expected = '2 week(s)';
      expect(calculateAge(birthDate.toISOString())).toMatch(/week\(s\)/);
    });
  });
});
