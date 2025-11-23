import { getGray500Color } from '@/utils/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  const gray500Color = getGray500Color();
  
  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <FontAwesome5 name="user" size={64} color={gray500Color} />
      <Text className="text-2xl font-bold text-text mt-6 mb-2">
        Profile
      </Text>
      <Text className="text-base text-text-secondary text-center">
        Profile screen coming soon
      </Text>
    </View>
  );
}

