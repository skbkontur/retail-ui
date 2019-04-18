import createReactContext from 'create-react-context';
import ThemeManager from "../../lib/ThemeManager";

const ThemeContext = createReactContext(ThemeManager.getTheme());

export const ThemeConsumer = ThemeContext.Consumer;
export default ThemeContext.Provider;
