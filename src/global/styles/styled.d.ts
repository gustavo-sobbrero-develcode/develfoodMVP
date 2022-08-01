import 'styled-components';
import themes from './themes';

declare module 'styled-components' {
  type ThemeType = typeof themes.light & typeof themes.dark;

  export interface DefaultTheme extends ThemeType {}
}
