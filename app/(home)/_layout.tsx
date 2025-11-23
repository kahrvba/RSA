import { getBlackColor, getGray400Color, getPrimaryColor, getWhiteColor } from '@/utils/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
  focused: boolean;
  primaryColor: string;
}) {
  return (
    <View
      style={[
        styles.iconContainer,
        props.focused && styles.iconContainerFocused,
      ]}
    >
      <FontAwesome5
        size={props.focused ? 22 : 20}
        style={{ marginBottom: -2 }}
        {...props}
      />
    </View>
  );
}

export default function TabLayout() {
  const primaryColor = getPrimaryColor();
  const gray400Color = getGray400Color();
  const whiteColor = getWhiteColor();
  const blackColor = getBlackColor();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: gray400Color,
        tabBarStyle: {
          backgroundColor: whiteColor,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          elevation: 0,
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} primaryColor={primaryColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="search" color={color} focused={focused} primaryColor={primaryColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: 'Sell',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="plus-circle" color={color} focused={focused} primaryColor={primaryColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} focused={focused} primaryColor={primaryColor} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  iconContainerFocused: {
    backgroundColor: 'transparent',
  },
});
