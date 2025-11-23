/**
 * Utility to get theme colors dynamically
 * This ensures all colors come from a single source of truth
 */
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Get current theme (light/dark)
export const getTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme ?? 'light';
};

// Primary colors
export const getPrimaryColor = () => Colors.light.primary;
export const getPrimaryColorDark = () => Colors.light.primaryDark;

// Text colors
export const getTextColor = () => Colors.light.text;
export const getTextSecondaryColor = () => Colors.light.textSecondary;
export const getTextInverseColor = () => Colors.light.textInverse;

// Background colors
export const getBackgroundColor = () => Colors.light.background;
export const getBackgroundSecondaryColor = () => Colors.light.backgroundSecondary;

// Border colors
export const getBorderColor = () => Colors.light.border;
export const getBorderDarkColor = () => Colors.light.borderDark;

// Icon colors
export const getIconColor = () => Colors.light.icon;
export const getTabIconDefaultColor = () => Colors.light.tabIconDefault;
export const getTabIconSelectedColor = () => Colors.light.tabIconSelected;

// Common colors (for icons, etc.)
export const getWhiteColor = () => '#FFFFFF';
export const getBlackColor = () => '#000000';
export const getGray400Color = () => '#9CA3AF'; // For inactive states
export const getGray500Color = () => '#6B7280'; // For secondary text/icons
