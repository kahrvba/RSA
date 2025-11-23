import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  value,
  onValueChange,
  disabled = false,
  className = '',
}: SwitchProps) {
  const translateX = useSharedValue(value ? 20 : 0);

  React.useEffect(() => {
    translateX.value = withSpring(value ? 20 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      className={`
        w-11
        h-6
        rounded-full
        ${value ? 'bg-primary' : 'bg-gray-300'}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
    >
      <Animated.View
        className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"
        style={animatedStyle}
      />
    </Pressable>
  );
}

