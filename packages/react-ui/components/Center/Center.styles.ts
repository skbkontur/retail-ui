import { ITheme } from '../theme';

export default function Center(theme: ITheme) {
  return {
    root: {
      height: '100%'
    },

    spring: {
      display: 'inline-block',
      height: '100%',
      verticalAlign: 'middle'
    },

    container: {
      display: 'inline-block',
      textAlign: 'left',
      verticalAlign: 'middle'
    }
  };
}
