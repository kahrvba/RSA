import { Button } from '@/components/ui';
import { getPrimaryColor } from '@/utils/colors';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated, {
    FadeInDown,
    SlideInUp
} from 'react-native-reanimated';

export default function LandingScreen() {
  const primaryColor = getPrimaryColor();
  
  const handleGetStarted = () => {
    router.push('/phone-verification');
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1">
          {/* Hero Image Section - Full Background extending to status bar */}
          <Animated.View
            entering={FadeInDown.duration(1000)}
            className="absolute top-0 left-0 right-0 h-[500px] -mt-12"
          >
            <View className="w-full h-full">
              <Image
                source={require('@/assets/images/rsabg.jpg')}
                className="w-full h-full"
                contentFit="cover"
                transition={500}
              />
              <View className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
              
              {/* Brand */}
      {/* Brand */}
      <Animated.View 
                entering={FadeInDown.duration(800).delay(400)}
                className="absolute top-20 left-6 right-6"
              >
                <View className="bg-gradient-to-r from-black/70 to-transparent px-0 py-4 rounded-3xl ">
                  <Text className="text-4xl font-extrabold text-primary tracking-tight" >
                    PalLand
                  </Text>
                  <Text className="text-base text-white font-semibold mt-2 tracking-wide">
                    Land in Palestine, made simple
                  </Text>
                </View>
              </Animated.View>
            </View>
          </Animated.View>

          {/* Content Card - Full Width */}
          <Animated.View
            entering={SlideInUp.duration(900).delay(300).springify()}
            className="mt-[380px] flex-1"
          >
            <View className="bg-white rounded-t-[40px] shadow-2xl pt-8 pb-8 px-6">
              {/* Title */}
              <Text className="text-3xl font-extrabold text-text mb-4 leading-tight">
                Find Your Perfect{'\n'}Land
              </Text>
              <Text className="text-base text-text-secondary leading-relaxed mb-8">
                Discover verified properties with clear documents. Buy and sell land with confidence through our secure platform.
              </Text>

              {/* Quick Features */}
              <View className="flex-row gap-3 mb-8">
                <View className="flex-1 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <MaterialIcons name="verified" size={28} color={primaryColor} className="mb-2" />
                  <Text className="text-sm font-bold text-text mt-2">Verified</Text>
                  <Text className="text-xs text-text-secondary mt-1">Legal docs</Text>
                </View>
                <View className="flex-1 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <FontAwesome5 name="map-marked-alt" size={26} color={primaryColor} className="mb-2" />
                  <Text className="text-sm font-bold text-text mt-2">Map View</Text>
                  <Text className="text-xs text-text-secondary mt-1">Easy search</Text>
                </View>
                <View className="flex-1 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <FontAwesome5 name="shield-alt" size={26} color={primaryColor} className="mb-2" />
                  <Text className="text-sm font-bold text-text mt-2">Secure</Text>
                  <Text className="text-xs text-text-secondary mt-1">Safe deals</Text>
                </View>
              </View>

              {/* CTA */}
              <Button
                variant="primary"
                size="lg"
                onPress={handleGetStarted}
                className="w-full mb-4 rounded-2xl shadow-lg"
              >
                Get Started
              </Button>
              <Text className="text-xs text-text-secondary text-center font-medium">
                Join thousands discovering lands across Palestine
              </Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}