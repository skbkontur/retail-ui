import createReactContext from 'create-react-context';
import ThemeFactory from '../../lib/theming/ThemeFactory';

const ThemeContext = createReactContext(ThemeFactory.getDefaultTheme());

export const ThemeConsumer = ThemeContext.Consumer;
export const ThemeProvider = ThemeContext.Provider;
