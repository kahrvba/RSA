import { getPrimaryColor, getWhiteColor } from '@/utils/colors';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:opacity-90 shadow-lg',
  outline: 'bg-transparent border-2 border-primary active:bg-primary/10 shadow-sm',
  ghost: 'bg-transparent active:bg-gray-100',
};

const sizeClasses: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: 'px-3 py-2',
    text: 'text-sm',
  },
  md: {
    container: 'px-5 py-3',
    text: 'text-base',
  },
  lg: {
    container: 'px-6 py-4',
    text: 'text-lg',
  },
};

const textColorClasses: Record<ButtonVariant, string> = {
  primary: 'text-white',
  outline: 'text-primary',
  ghost: 'text-text',
};

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
}: ButtonProps) {
  const primaryColor = getPrimaryColor();
  const whiteColor = getWhiteColor();
  const isDisabled = disabled || loading;
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  const textColorClass = textColorClasses[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`
        ${variantClass}
        ${sizeClass.container}
        ${isDisabled ? 'opacity-50' : ''}
        rounded-xl
        flex-row
        items-center
        justify-center
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? whiteColor : primaryColor}
        />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text className={`${sizeClass.text} ${textColorClass} font-semibold`}>
            {children}
          </Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
}

