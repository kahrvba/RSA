import { useMemo } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const SCALING_FACTOR = 0.7;

export const responsiveSize: {
  width: (size: number, factor?: number) => number;
  height: (size: number, factor?: number) => number;
  moderate: (size: number, factor?: number) => number;
  font: (size: number, factor?: number) => number;
  padding: (size: number, factor?: number) => number;
  radius: (size: number, factor?: number) => number;
  icon: (size: number, factor?: number) => number;
  small: (size: number) => number;
  medium: (size: number) => number;
  large: (size: number) => number;
} = {
  width: (size: number, factor: number = SCALING_FACTOR) => scale(size * factor),
  height: (size: number, factor: number = SCALING_FACTOR) => verticalScale(size * factor),
  moderate: (size: number, factor: number = SCALING_FACTOR) => moderateScale(size * factor, 0.5),
  font: (size: number, factor: number = SCALING_FACTOR) => {
    const systemFontScale = PixelRatio.getFontScale();
    return moderateScale(size * factor * systemFontScale, 0.5);
  },
  padding: (size: number, factor: number = SCALING_FACTOR) => moderateScale(size * factor, 0.5),
  radius: (size: number, factor: number = SCALING_FACTOR) => moderateScale(size * factor, 0.3),
  icon: (size: number, factor: number = SCALING_FACTOR) => moderateScale(size * factor, 0.4),
  
  small: (size: number) => moderateScale(size * 0.7, 0.5),
  medium: (size: number) => moderateScale(size * 0.85, 0.5),
  large: (size: number) => moderateScale(size * 0.95, 0.5),
};

export const useResponsiveDimensions = () => {
  return useMemo(() => {
    const { width, height } = Dimensions.get('window');
    const aspectRatio = width / height;
    
    return {
      width,
      height,
      aspectRatio,
      isPortrait: height > width,
      isLandscape: width > height,
      isTablet: width >= 768,
      isPhone: width < 768,
      isSmallPhone: width < 375,
      isLargePhone: width >= 414,
    };
  }, []);
};

export const useResponsiveSpacing = () => {
  return useMemo(() => ({
    xs: responsiveSize.padding(4),
    sm: responsiveSize.padding(8),
    md: responsiveSize.padding(12),
    lg: responsiveSize.padding(16),
    xl: responsiveSize.padding(20),
    xxl: responsiveSize.padding(24),
    
    screenPadding: responsiveSize.padding(16),
    cardPadding: responsiveSize.padding(12),
    buttonPadding: responsiveSize.padding(16),
  }), []);
};

export const useResponsiveTypography = () => {
  return useMemo(() => ({
    '4xl': responsiveSize.font(36), 
    '3xl': responsiveSize.font(30),  
    '2xl': responsiveSize.font(24),  
    xl: responsiveSize.font(20),     
    lg: responsiveSize.font(18),     
    base: responsiveSize.font(16),   
    sm: responsiveSize.font(14),     
    xs: responsiveSize.font(12),     
    
    h1: responsiveSize.font(30),     
    h2: responsiveSize.font(24),    
    h3: responsiveSize.font(20),     
    h4: responsiveSize.font(18),    
    body: responsiveSize.font(16),   
    caption: responsiveSize.font(14), 
    small: responsiveSize.font(12),  
    
    getLineHeight: (fontSize: number) => fontSize * 1.4,
  }), []);
};

export const useResponsiveColors = () => {
  return useMemo(() => ({
    primary: '#DC2626', 
    primaryDark: '#B91C1C', 
    secondary: '#000000',
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB', 
    surface: '#F9FAFB',
    text: '#000000',
    textSecondary: '#6B7280', 
    border: '#E5E7EB', 
    borderDark: '#D1D5DB', 
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
  }), []);
};

export const useResponsiveLayout = () => {
  const spacing = useResponsiveSpacing();
  
  return useMemo(() => ({
    getContainerStyle: (insets: any) => ({
      flex: 1,
      paddingHorizontal: spacing.screenPadding,
      paddingTop: Platform.OS === 'ios' ? insets.top : responsiveSize.padding(8),
      paddingBottom: insets.bottom,
    }),
    
    getCardStyle: () => ({
      backgroundColor: '#ffffff',
      borderRadius: responsiveSize.radius(12),
      padding: spacing.cardPadding,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.2,
      shadowRadius: Platform.OS === 'ios' ? 4 : 2,
      elevation: Platform.OS === 'android' ? 3 : 0,
    }),
    
    getButtonStyle: (variant: 'primary' | 'secondary' | 'outline' = 'primary') => {
      const baseStyle = {
        borderRadius: responsiveSize.radius(8),
        paddingVertical: spacing.buttonPadding,
        paddingHorizontal: responsiveSize.padding(24),
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        minHeight: responsiveSize.height(44),
      };
      
      switch (variant) {
        case 'primary':
          return { ...baseStyle, backgroundColor: '#DC2626' };
        case 'secondary':
          return { ...baseStyle, backgroundColor: '#F9FAFB' };
        case 'outline':
          return { 
            ...baseStyle, 
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#DC2626'
          };
        default:
          return baseStyle;
      }
    }
  }), [spacing]);
};

export const useAccessibilityProps = (label: string, hint?: string) => {
  return useMemo(() => ({
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: 'button' as const,
  }), [label, hint]);
};

export const useResponsiveUtils = () => {
  const dimensions = useResponsiveDimensions();
  const spacing = useResponsiveSpacing();
  const typography = useResponsiveTypography();
  const colors = useResponsiveColors();
  const layout = useResponsiveLayout();
  
  return {
    dimensions,
    spacing,
    typography,
    colors,
    layout,
    scale: responsiveSize.width,
    verticalScale: responsiveSize.height,
    moderateScale: responsiveSize.moderate,
    fontScale: responsiveSize.font,
    small: responsiveSize.small,
    medium: responsiveSize.medium,
    large: responsiveSize.large,
  };
};

export const { width, height, moderate, font, padding, radius, icon, small, medium, large } = responsiveSize;

