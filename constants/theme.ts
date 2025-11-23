/**
 * Design System - Theme Tokens
 * Colors, spacing, typography, and other design tokens for the app
 */

import { Platform } from 'react-native';

// Color Palette
const primaryRed = '#DC2626'; // Red-600
const primaryRedDark = '#B91C1C'; // Red-700
const textBlack = '#000000';
const textGray = '#6B7280'; // Gray-500
const backgroundWhite = '#FFFFFF';
const borderGray = '#E5E7EB'; // Gray-200

export const Colors = {
  light: {
    // Primary colors
    primary: primaryRed,
    primaryDark: primaryRedDark,
    
    // Text colors
    text: textBlack,
    textSecondary: textGray,
    textInverse: backgroundWhite,
    
    // Background colors
    background: backgroundWhite,
    backgroundSecondary: '#F9FAFB', // Gray-50
    
    // Border colors
    border: borderGray,
    borderDark: '#D1D5DB', // Gray-300
    
    // Legacy support
    tint: primaryRed,
    icon: textGray,
    tabIconDefault: textGray,
    tabIconSelected: primaryRed,
  },
  dark: {
    // Primary colors
    primary: primaryRed,
    primaryDark: primaryRedDark,
    
    // Text colors
    text: backgroundWhite,
    textSecondary: '#9CA3AF', // Gray-400
    textInverse: textBlack,
    
    // Background colors
    background: '#111827', // Gray-900
    backgroundSecondary: '#1F2937', // Gray-800
    
    // Border colors
    border: '#374151', // Gray-700
    borderDark: '#4B5563', // Gray-600
    
    // Legacy support
    tint: primaryRed,
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: primaryRed,
  },
};

// Spacing Scale (4px base)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Border Radius
export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Typography
export const Typography = {
  fontFamily: Platform.select({
    ios: 'system-ui',
    android: 'Roboto',
    default: 'system-ui',
    web: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  }),
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Component Sizes
export const ComponentSizes = {
  sm: {
    height: 36,
    paddingX: 12,
    paddingY: 8,
    fontSize: Typography.fontSize.sm,
  },
  md: {
    height: 44,
    paddingX: 20,
    paddingY: 12,
    fontSize: Typography.fontSize.base,
  },
  lg: {
    height: 52,
    paddingX: 24,
    paddingY: 16,
    fontSize: Typography.fontSize.lg,
  },
};

// Shadows/Elevation
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Legacy Fonts export for backward compatibility
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
