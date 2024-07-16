import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type ColorScheme = 'light' | 'dark';

type TStateThemeStore = {
  colorScheme: ColorScheme;
};

type TActionsThemeStore = {
  toggleColorScheme: () => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

type IThemeStore = TStateThemeStore & TActionsThemeStore;

const getInitialColorScheme = (): ColorScheme => {
  if (typeof window !== 'undefined') {
    const savedColorScheme = localStorage.getItem('color-scheme');
    if (savedColorScheme) {
      return savedColorScheme as ColorScheme;
    }
    
    return 'light';
  }
  return 'light';
};

const themeStore = (set: any): IThemeStore => ({
  colorScheme: getInitialColorScheme(),
  toggleColorScheme: () => set((state: IThemeStore) => {
    const newColorScheme = state.colorScheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('color-scheme', newColorScheme);
    return { colorScheme: newColorScheme };
  }),
  setColorScheme: (colorScheme: ColorScheme) => {
    localStorage.setItem('color-scheme', colorScheme);
    set({ colorScheme });
  }
});

export const useThemeStore = create<IThemeStore>()(
  persist(devtools(themeStore), { name: 'theme-store' }),
);
