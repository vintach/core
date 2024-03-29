import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '@/contexts/theme-context';
import { setCookie } from '@/lib/cookie';

export const useDarkMode = () => {
  const defaultTheme = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState(defaultTheme === 'dark');

  const toggle = useCallback(() => {
    document.documentElement.classList.toggle('dark');
    const theme = isDarkMode ? 'light' : 'dark';
    setCookie('theme', theme, 365);
    setIsDarkMode(state => !state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isDarkMode, toggle };
};
