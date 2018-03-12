// @flow
import { type ITheme } from '../theme';

export default function Calendar(theme: ITheme) {
  return {
    root: {
      padding: '0 15px',
      display: 'block',
      width: '210px'
    },
    wrapper: {
      fontSize: '14px',
      position: 'relative',
      overflow: 'hidden'
    }
  };
}
