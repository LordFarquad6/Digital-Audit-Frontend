import { MantineThemeOverride } from '@mantine/core';

export const lightTheme: MantineThemeOverride = {
  primaryColor: 'primary',
  colors: {
    primary: [
      '#ffffff', 
      '#f0f4ff', 
      '#d9e8ff', 
      '#b3d0ff', 
      '#8cb8ff', 
      '#66a0ff', 
      '#4088ff', 
      '#1b70ff', 
      '#0058ff', 
      '#0046cc', 
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
