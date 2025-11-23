import { getGray400Color } from '@/utils/colors';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<InputSize, { container: string; text: string }> = {
  sm: {
    container: 'h-9',
    text: 'text-sm',
  },
  md: {
    container: 'h-11',
    text: 'text-base',
  },
  lg: {
    container: 'h-14',
    text: 'text-lg',
  },
};

export function Input({
  label,
  error,
  helperText,
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: InputProps) {
  const gray400Color = getGray400Color();
  const hasError = !!error;
  const sizeClass = sizeClasses[size];

  return (
    <View className={`w-full ${className}`}>
      {label && (
        <Text className={`${sizeClass.text} font-medium text-text mb-2`}>
          {label}
        </Text>
      )}
      <View
        className={`
          ${sizeClass.container}
          flex-row
          items-center
          bg-background
          border-2
          ${hasError ? 'border-red-500' : 'border-border'}
          rounded-lg
          px-4
        `}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        <TextInput
          className={`
            flex-1
            ${sizeClass.text}
            text-text
            ${!leftIcon ? '' : ''}
            ${!rightIcon ? '' : ''}
          `}
          placeholderTextColor={gray400Color}
          {...props}
        />
        {rightIcon && <View className="ml-3">{rightIcon}</View>}
      </View>
      {(error || helperText) && (
        <Text
          className={`text-sm mt-1 ${hasError ? 'text-red-500' : 'text-text-secondary'}`}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
}

