import createReactContext from 'create-react-context';
import ThemeManager, { ITheme } from "../../lib/ThemeManager";

export interface IThemeContext {
  theme: ITheme
}
const ThemeContext = createReactContext<IThemeContext>({
  theme: ThemeManager.getTheme(),
});

export const ThemeConsumer = ThemeContext.Consumer;
export default ThemeContext.Provider;
