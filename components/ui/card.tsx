import React from 'react';
import { Text, View } from 'react-native';

export type CardVariant = 'default' | 'elevated' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-background',
  elevated: 'bg-background shadow-lg',
  outlined: 'bg-background border border-border',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
}: CardProps) {
  const variantClass = variantClasses[variant];
  const paddingClass = paddingClasses[padding];

  return (
    <View
      className={`
        ${variantClass}
        ${paddingClass}
        rounded-2xl
        ${className}
      `}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <View className={`mb-4 ${className}`}>{children}</View>;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <Text className={`text-2xl font-bold text-text ${className}`}>
      {children}
    </Text>
  );
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <View className={className}>{children}</View>;
}

