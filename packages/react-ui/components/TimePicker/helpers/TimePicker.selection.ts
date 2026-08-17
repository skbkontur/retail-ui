import type { TimeFormat, TimeSegment } from './TimePicker.shared.js';

/** Возвращает следующий сегмент для навигации по вводу или `null`, если текущий сегмент последний. */
export const getNextTimeSegment = (segment: TimeSegment, format: TimeFormat): TimeSegment | null => {
  switch (segment) {
    case 'hours':
      return 'minutes';

    case 'minutes':
      return format === 'HH:mm:ss' ? 'seconds' : null;

    case 'seconds':
      return null;
  }
};

/** Возвращает предыдущий сегмент для навигации по вводу или `null`, если текущий сегмент первый. */
export const getPreviousTimeSegment = (segment: TimeSegment): TimeSegment | null => {
  switch (segment) {
    case 'hours':
      return null;

    case 'minutes':
      return 'hours';

    case 'seconds':
      return 'minutes';
  }
};
