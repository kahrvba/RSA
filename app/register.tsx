import { Button, Card, CardContent, Input } from '@/components/ui';
import { icon } from '@/lib/responsive';
import { getGray500Color, getPrimaryColor, getWhiteColor } from '@/utils/colors';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const primaryColor = getPrimaryColor();
  const whiteColor = getWhiteColor();
  const gray500Color = getGray500Color();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);
  const progressWidth = useSharedValue(50);
  const iconRotation = useSharedValue(0);

  React.useEffect(() => {
    if (currentStep === 1) {
      progressWidth.value = withTiming(50, { duration: 500 });
      iconRotation.value = withSpring(0, { damping: 12 });
    } else {
      progressWidth.value = withTiming(100, { duration: 500 });
      iconRotation.value = withSpring(360, { damping: 12 });
    }
  }, [currentStep]);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) return;
      cardScale.value = withSpring(0.95, { damping: 15 });
      setTimeout(() => {
        setCurrentStep(2);
        cardScale.value = withSpring(1, { damping: 15 });
      }, 200);
    }
  };

  const handleSubmit = async () => {
    if (!formData.email.trim() || !formData.city.trim()) return;

    setLoading(true);
    cardScale.value = withSpring(0.98, { damping: 15 });

    setTimeout(() => {
      setLoading(false);
      cardOpacity.value = withTiming(0, { duration: 300 });
      setTimeout(() => {
        router.replace('/(home)');
      }, 300);
    }, 1000);
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));

  const isStep1Valid = formData.fullName.trim().length >= 2;
  const isStep2Valid = formData.email.trim() && formData.city.trim();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            className="flex-1"
            style={{
              paddingHorizontal: 24,
              paddingTop: 8,
              paddingBottom: 10,
            }}
          >
            <View className="max-w-md mx-auto w-full flex-1">
            {/* Decorative Background Elements */}
            <View className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/5" />
            <View className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/5" />

            {/* Header */}
            <Animated.View
              entering={FadeInDown.duration(700).springify()}
              className="items-center mb-3"
            >
              <Animated.View 
                style={iconAnimatedStyle}
                className="relative"
              >
                <View className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 items-center justify-center mb-3 shadow-2xl">
                  <View className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl" />
                  <FontAwesome5 
                    name={currentStep === 1 ? "user-edit" : "check-circle"} 
                    size={icon(32)} 
                    color={whiteColor} 
                  />
                </View>
              </Animated.View>
              
              <Text className="text-3xl font-black text-text mb-3 text-center tracking-tight">
                {currentStep === 1 ? 'Create Your Profile' : 'Final Details'}
              </Text>
              <Text className="text-base text-text-secondary text-center font-medium px-4 leading-6">
                {currentStep === 1
                  ? 'Let us know who you are'
                  : "You're almost there! Just a few more details"}
              </Text>
            </Animated.View>

            {/* Progress Indicator */}
            <Animated.View
              entering={FadeInUp.duration(500).springify()}
              className="mb-6"
            >
              <View className="flex-row items-center justify-center mb-3 gap-2">
                <View className={`w-10 h-10 rounded-full items-center justify-center ${currentStep >= 1 ? 'bg-primary' : 'bg-border'}`}>
                  {currentStep > 1 ? (
                    <FontAwesome5 name="check" size={icon(14)} color={whiteColor} />
                  ) : (
                    <Text className="text-xs font-bold text-white">1</Text>
                  )}
                </View>
                <View className={`h-0.5 w-16 ${currentStep > 1 ? 'bg-primary' : 'bg-border'}`} />
                <View className={`w-10 h-10 rounded-full items-center justify-center border-2 ${currentStep === 2 ? 'bg-primary/20 border-primary' : 'bg-background border-border'}`}>
                  <Text className={`text-xs font-bold ${currentStep === 2 ? 'text-primary' : 'text-text-secondary'}`}>2</Text>
                </View>
              </View>
              <View className="h-2 bg-border/50 rounded-full overflow-hidden backdrop-blur-sm">
                <Animated.View
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg"
                  style={progressAnimatedStyle}
                />
              </View>
              <Text className="text-xs text-text-secondary text-center font-semibold mt-3 tracking-wide">
                STEP {currentStep} OF 2
              </Text>
            </Animated.View>

            {/* Registration Card */}
            <Animated.View
              entering={FadeInUp.delay(250).duration(800).springify()}
              className="mb-3"
            >
              <Animated.View style={animatedCardStyle}>
                <Card
                  variant="elevated"
                  className="bg-background/95 backdrop-blur-xl border-2 border-border/50 shadow-2xl rounded-3xl overflow-hidden"
                >
                  <View className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary" />
                  
                  <CardContent className="p-6">
                  {currentStep === 1 ? (
                    <>
                      <View className="mb-4">
                        <Input
                          label="Full Name"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChangeText={(value) => updateField('fullName', value)}
                          size="lg"
                          className="mb-2"
                          leftIcon={
                            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                              <FontAwesome5
                                name="user"
                                size={18}
                                color={gray500Color}
                              />
                            </View>
                          }
                        />
                        <Text className="text-xs text-text-secondary ml-1 mt-2 font-medium">
                          This will be displayed on your profile
                        </Text>
                      </View>

                      <View className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-2xl mb-8 border-2 border-primary/20 shadow-sm">
                        <View className="flex-row items-start gap-3">
                          <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center mt-0.5">
                            <MaterialIcons
                              name="info-outline"
                              size={icon(16)}
                              color={primaryColor}
                            />
                          </View>
                          <Text className="flex-1 text-sm text-text leading-relaxed font-medium">
                            Your name will be visible when you list properties and interact with potential renters
                          </Text>
                        </View>
                      </View>

                      <Button
                        variant="primary"
                        size="lg"
                        onPress={handleNext}
                        disabled={!isStep1Valid}
                        className="w-full rounded-2xl shadow-xl h-14"
                      >
                        <Text className="font-bold text-base tracking-wide">
                          Continue to Contact Info
                        </Text>
                      </Button>
                    </>
                  ) : (
                    <>
                      <View className="mb-4">
                        <Input
                          label="Email Address"
                          placeholder="your.email@example.com"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          value={formData.email}
                          onChangeText={(value) => updateField('email', value)}
                          size="lg"
                          className="mb-2"
                          leftIcon={
                            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                              <MaterialIcons name="email" size={18} color={gray500Color} />
                            </View>
                          }
                        />
                        <Text className="text-xs text-text-secondary ml-1 mt-2 font-medium">
                          We&apos;ll send important updates here
                        </Text>
                      </View>

                      <View className="mb-4">
                        <Input
                          label="City"
                          placeholder="e.g. Ramallah, Nablus, Jerusalem"
                          value={formData.city}
                          onChangeText={(value) => updateField('city', value)}
                          size="lg"
                          className="mb-2"
                          leftIcon={
                            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                              <FontAwesome5
                                name="map-marker-alt"
                                size={icon(18)}
                                color={gray500Color}
                              />
                            </View>
                          }
                        />
                        <Text className="text-xs text-text-secondary ml-1 mt-2 font-medium">
                          Your primary location
                        </Text>
                      </View>

                      <View className="mb-4">
                        <Input
                          label="Street Address (Optional)"
                          placeholder="Enter your street address"
                          value={formData.address}
                          onChangeText={(value) => updateField('address', value)}
                          size="lg"
                          className="mb-2"
                          leftIcon={
                            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                              <FontAwesome5 name="home" size={icon(18)} color={gray500Color} />
                            </View>
                          }
                        />
                        <Text className="text-xs text-text-secondary ml-1 mt-2 font-medium">
                          Optional, but helps with local listings
                        </Text>
                      </View>

                      <View className="flex-row gap-3">
                        <Button
                          variant="ghost"
                          size="md"
                          onPress={() => {
                            setCurrentStep(1);
                          }}
                          className="flex-1 rounded-xl"
                        >
                          <FontAwesome5 name="arrow-left" size={icon(14)} color={gray500Color} style={{ marginRight: 8 }} />
                          <Text className="font-semibold">Back</Text>
                        </Button>
                        <Button
                          variant="primary"
                          size="lg"
                          onPress={handleSubmit}
                          loading={loading}
                          disabled={!isStep2Valid}
                          className="flex-[2] rounded-2xl ml-4 shadow-xl"
                        >
                          <Text className="font-bold text-base tracking-wide">
                            Complete Setup
                          </Text>
                        </Button>
                      </View>
                    </>
                  )}
                  </CardContent>
                </Card>
              </Animated.View>
            </Animated.View>

            {/* Security Badge */}
            <Animated.View
              entering={FadeInUp.delay(450).duration(600)}
              className="flex-row items-center justify-center gap-2 mb-3"
            >
              <View className="w-5 h-5 rounded-full bg-green-500/20 items-center justify-center">
                <FontAwesome5 name="shield-alt" size={icon(10)} color="#10b981" />
              </View>
              <Text className="text-xs text-text-secondary font-semibold">
                Your Data is Protected & Encrypted
              </Text>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              entering={FadeInUp.delay(500).duration(600)}
            >
              <Text className="text-xs text-text-secondary text-center leading-relaxed px-6 font-medium">
                Your information is secure and will only be used for{' '}
                <Text className="text-primary font-bold">account verification</Text>
                {' '}and{' '}
                <Text className="text-primary font-bold">property management</Text>
              </Text>
            </Animated.View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}