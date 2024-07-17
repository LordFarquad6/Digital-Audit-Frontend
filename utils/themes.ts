import { MantineThemeOverride } from '@mantine/core';

export const lightTheme: MantineThemeOverride = {
  primaryColor: 'primary',
  colors: {
    primary: [
      '#ffffff',
      '#e6f1ff',
      '#cce4ff',
      '#9ac8ff',
      '#80bbff',
      '#67adff',
      '#1b84ff',
      '#4e9fff',
      '#3492ff',
      '#1b84ff',
    ],
    secondary: [
      '#f7fafc',
      '#edf2f7',
      '#e2e8f0',
      '#cbd5e0',
      '#a0aec0',
      '#718096',
      '#4a5568',
      '#2d3748',
      '#1a202c',
      '#171923',
    ],
  },
  fontFamily: 'Poppins, sans-serif',
  black: '#101010',
  white: '#ffffff',
};

export const darkTheme: MantineThemeOverride = {
  primaryColor: 'primary',
  colors: {
    primary: [
      '#0d2222',
      '#161b22',
      '#21262d',
      '#30363d',
      '#484f58',
      '#6e7681',
      '#8b949e',
      '#b1bac4',
      '#c9d1d9',
      '#e3e8ef',
    ],
    secondary: [
      '#171923',
      '#1a202c',
      '#2d3748',
      '#4a5568',
      '#718096',
      '#a0aec0',
      '#cbd5e0',
      '#e2e8f0',
      '#edf2f7',
      '#f7fafc',
    ],
  },
  fontFamily: 'Poppins, sans-serif',
  black: '#efefef',
  white: '#000000',
};
