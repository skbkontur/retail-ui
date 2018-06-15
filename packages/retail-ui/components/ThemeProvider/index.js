
// TODO: define own custom ThemeProvider based on theming
import { ThemeProvider } from 'theming';
import createDefaultTheme from '../theme';

ThemeProvider.defaultTheme = createDefaultTheme();

export default ThemeProvider;
