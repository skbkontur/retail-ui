import createReactContext from 'create-react-context';
import ThemeFactory from './ThemeFactory';

const ThemeContext = createReactContext(ThemeFactory.getDefaultTheme());

export const ThemeConsumer = ThemeContext.Consumer;
export default ThemeContext.Provider;
