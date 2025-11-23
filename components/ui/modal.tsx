import { getGray500Color } from '@/utils/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Modal as RNModal, ModalProps as RNModalProps, Text, View } from 'react-native';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps extends RNModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  size?: ModalSize;
  children: React.ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'w-80',
  md: 'w-96',
  lg: 'w-full max-w-lg',
  xl: 'w-full max-w-2xl',
};

export function Modal({
  visible,
  onClose,
  title,
  showCloseButton = true,
  size = 'md',
  children,
  ...props
}: ModalProps) {
  const gray500Color = getGray500Color();
  const sizeClass = sizeClasses[size];

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <Pressable
        className="flex-1 bg-black/50 items-center justify-center p-4"
        onPress={onClose}
      >
        <Pressable
          className={`
            ${sizeClass}
            bg-background
            rounded-2xl
            shadow-2xl
            p-6
          `}
          onPress={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <View className="flex-row items-center justify-between mb-4">
              {title && (
                <Text className="text-2xl font-bold text-text flex-1">
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  className="ml-4 p-2 -mr-2 -mt-2"
                >
                  <FontAwesome5 name="times" size={20} color={gray500Color} />
                </Pressable>
              )}
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

