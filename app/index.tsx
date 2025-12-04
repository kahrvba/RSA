import { Button } from '@/components/ui';
import { height, icon, moderate, useResponsiveDimensions } from '@/lib/responsive';
import { getPrimaryColor } from '@/utils/colors';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  SlideInUp
} from 'react-native-reanimated';

export default function LandingScreen() {
  const screenDimensions = useResponsiveDimensions();
  const primaryColor = getPrimaryColor();
  
  const handleGetStarted = () => {
    router.push('/phone-verification');
  };


  const contentTopMargin = height(510);
  const minContentHeight = screenDimensions.height - contentTopMargin;

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <View>
          {/* Hero Image Section - Full Background extending to status bar */}
          <Animated.View
            entering={FadeInDown.duration(1000)}
            className="absolute top-0 left-0 right-0"
            style={{ height: height(620), marginTop: moderate(-48) }}
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
              <Animated.View 
                entering={FadeInDown.duration(800).delay(400)}
                className="absolute"
                style={{ top: moderate(130), left: moderate(24), right: moderate(24) }}
              >
                <View className="bg-gradient-to-r from-black/70 to-transparent rounded-3xl" style={{ paddingHorizontal: 0, paddingVertical: moderate(16) }}>
                  <Text className="text-primary font-extrabold tracking-tight" style={{ fontSize: moderate(36) }}>
                    PalLand
                  </Text>
                  <Text className="text-white font-semibold tracking-wide" style={{ fontSize: moderate(16), marginTop: moderate(8) }}>
                    Land in Palestine, made simple
                  </Text>
                </View>
              </Animated.View>
            </View>
          </Animated.View>

          {/* Content Card - Full Width */}
          <Animated.View
            entering={SlideInUp.duration(900).delay(300).springify()}
            style={{
              marginTop: contentTopMargin,
              minHeight: minContentHeight,
              marginBottom: -moderate(16), 
            }}
          >
            <View
              className="bg-white shadow-2xl"
              style={{
                borderTopLeftRadius: moderate(40),
                borderTopRightRadius: moderate(40),
                paddingTop: moderate(32),
                paddingBottom: moderate(12),
                paddingHorizontal: moderate(24),
                minHeight: minContentHeight,
              }}
            >
              {/* Title */}
              <Text className="text-text font-extrabold leading-tight" style={{ fontSize: moderate(30), marginBottom: moderate(16) }}>
                Find Your Perfect{'\n'}Land
              </Text>
              <Text className="text-text-secondary leading-relaxed" style={{ fontSize: moderate(16), marginBottom: moderate(32) }}>
                Discover verified properties with clear documents. Buy and sell land with confidence through our secure platform.
              </Text>

              {/* Quick Features */}
              <View className="flex-row mb-8">
                <View className="flex-1 bg-primary/5 rounded-2xl border border-primary/10" style={{ padding: moderate(16), marginRight: moderate(6) }}>
                  <MaterialIcons name="verified" size={icon(28)} color={primaryColor} style={{ marginBottom: moderate(8) }} />
                  <Text className="text-text font-bold" style={{ fontSize: moderate(14), marginTop: moderate(8) }}>Verified</Text>
                  <Text className="text-text-secondary" style={{ fontSize: moderate(12), marginTop: moderate(4) }}>Legal docs</Text>
                </View>
                <View className="flex-1 bg-primary/5 rounded-2xl border border-primary/10" style={{ padding: moderate(16), marginHorizontal: moderate(6) }}>
                  <FontAwesome5 name="map-marked-alt" size={icon(26)} color={primaryColor} style={{ marginBottom: moderate(8) }} />
                  <Text className="text-text font-bold" style={{ fontSize: moderate(14), marginTop: moderate(8) }}>Map View</Text>
                  <Text className="text-text-secondary" style={{ fontSize: moderate(12), marginTop: moderate(4) }}>Easy search</Text>
                </View>
                <View className="flex-1 bg-primary/5 rounded-2xl border border-primary/10" style={{ padding: moderate(16), marginLeft: moderate(6) }}>
                  <FontAwesome5 name="shield-alt" size={icon(26)} color={primaryColor} style={{ marginBottom: moderate(8) }} />
                  <Text className="text-text font-bold" style={{ fontSize: moderate(14), marginTop: moderate(8) }}>Secure</Text>
                  <Text className="text-text-secondary" style={{ fontSize: moderate(12), marginTop: moderate(4) }}>Safe deals</Text>
                </View>
              </View>

              {/* CTA */}
              <Button
                variant="primary"
                size="lg"
                onPress={handleGetStarted}
                className="w-full rounded-2xl shadow-lg"
              >
                Get Started
              </Button>
              <Text
                className="text-text-secondary text-center font-medium"
                style={{ fontSize: moderate(12), marginTop: moderate(6) }}
              >
                Join thousands discovering lands across Palestine
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}