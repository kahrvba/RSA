import { Button, Card, CardContent, Input } from '@/components/ui';
import { icon } from '@/lib/responsive';
import { getGray500Color, getWhiteColor } from '@/utils/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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

export default function PhoneVerificationScreen() {
  const whiteColor = getWhiteColor();
  const gray500Color = getGray500Color();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);
  const progressWidth = useSharedValue(0);
  const iconRotation = useSharedValue(0);

  useEffect(() => {
    cardScale.value = withSpring(1, { damping: 15 });
    cardOpacity.value = withTiming(1, { duration: 400 });
    if (showCodeInput) {
      progressWidth.value = withTiming(100, { duration: 600 });
      iconRotation.value = withSpring(360, { damping: 12 });
    } else {
      iconRotation.value = 0;
    }
  }, [showCodeInput]);

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) return;

    setLoading(true);
    cardScale.value = withSpring(0.98, { damping: 15 });

    setTimeout(() => {
      setLoading(false);
      setShowCodeInput(true);
      cardScale.value = withSpring(1, { damping: 15 });
    }, 800);
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) return;

    setLoading(true);
    cardScale.value = withSpring(0.98, { damping: 15 });

    setTimeout(() => {
      setLoading(false);
      cardOpacity.value = withTiming(0, { duration: 300 });
      setTimeout(() => {
        router.replace('/register');
      }, 300);
    }, 800);
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
              paddingBottom: 40,
            }}
          >
            <View className="max-w-md mx-auto w-full flex-1">
            {/* Decorative Background Elements */}
            <View className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/5" />
            <View className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/5" />

             {/* Header */}
             <Animated.View
               entering={FadeInDown.duration(700).springify()}
               className="items-center mb-4"
             >
              <Animated.View 
                style={iconAnimatedStyle}
                className="relative"
              >
                 <View className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 items-center justify-center mb-3 shadow-2xl">
                  <View className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl" />
                  <FontAwesome5 name={showCodeInput ? "lock" : "mobile-alt"} size={icon(32)} color={whiteColor} />
                </View>
              </Animated.View>
              
              <Text className="text-3xl font-black text-text mb-3 text-center tracking-tight">
                {showCodeInput ? 'Verify Your Code' : 'Enter Phone Number'}
              </Text>
              <Text className="text-base text-text-secondary text-center font-medium px-4 leading-6">
                {showCodeInput
                  ? 'We sent a 6-digit verification code'
                  : 'Get started with secure verification'}
              </Text>
            </Animated.View>

            {/* Progress Indicator */}
            {showCodeInput && (
              <Animated.View
                entering={FadeInUp.duration(500).springify()}
                className="mb-8"
              >
                <View className="flex-row items-center justify-center mb-3 gap-2">
                  <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                    <FontAwesome5 name="check" size={icon(14)} color={whiteColor} />
                  </View>
                  <View className="h-0.5 w-16 bg-primary" />
                  <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center border-2 border-primary">
                    <Text className="text-xs font-bold text-primary">2</Text>
                  </View>
                </View>
                <View className="h-2 bg-border/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <Animated.View
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg"
                    style={progressAnimatedStyle}
                  />
                </View>
                <Text className="text-xs text-text-secondary text-center font-semibold mt-3 tracking-wide">
                  STEP 1 OF 2 COMPLETE
                </Text>
              </Animated.View>
            )}

            {/* Auth Card */}
            <Animated.View
              entering={FadeInUp.delay(250).duration(800).springify()}
              className="mb-6"
            >
              <Animated.View style={animatedCardStyle}>
                <Card
                  variant="elevated"
                  className="bg-background/95 backdrop-blur-xl border-2 border-border/50 shadow-2xl rounded-3xl overflow-hidden"
                >
                  <View className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary" />
                  
                  <CardContent className="p-8">
                  {!showCodeInput ? (
                    <>
                      <View className="mb-8">
                        <Input
                          label="Phone Number"
                          placeholder="+970 59 123 4567"
                          keyboardType="phone-pad"
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                          size="lg"
                          className="mb-2"
                          leftIcon={
                            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                              <FontAwesome5
                                name="mobile-alt"
                                size={icon(18)}
                                color={gray500Color}
                              />
                            </View>
                          }
                        />
                        <Text className="text-xs text-text-secondary ml-1 mt-2 font-medium">
                          Enter your mobile number with country code
                        </Text>
                      </View>
                      
                      <Button
                        variant="primary"
                        size="lg"
                        onPress={handleSendCode}
                        loading={loading}
                        disabled={!phoneNumber.trim()}
                        className="w-full rounded-2xl shadow-xl h-14"
                      >
                        <Text className="font-bold text-base tracking-wide">
                          Send Verification Code
                        </Text>
                      </Button>
                    </>
                  ) : (
                  <>
                      <View className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-2xl mb-6 border-2 border-primary/20 shadow-sm">
                          <View className="flex-row items-center justify-center gap-3">
                          <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                            <FontAwesome5 name="mobile-alt" size={icon(16)} color={gray500Color} />
                          </View>
                          <View className="flex-1">
                            <Text className="text-xs text-text-secondary font-semibold mb-1 uppercase tracking-wide">
                              Code sent to
                            </Text>
                            <Text className="text-base text-text font-bold">
                              {phoneNumber}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View className="mb-6">
                        <Input
                          label="Verification Code"
                          placeholder="• • • • • •"
                          keyboardType="number-pad"
                          maxLength={6}
                          value={verificationCode}
                          onChangeText={setVerificationCode}
                          size="lg"
                          className="mb-2"
                          leftIcon={
                            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                              <FontAwesome5 name="lock" size={icon(18)} color={gray500Color} />
                            </View>
                          }
                        />
                        <View className="flex-row items-center justify-between mt-2 px-1">
                          <Text className="text-xs text-text-secondary font-medium">
                            Enter the 6-digit code
                          </Text>
                          <Text className="text-xs text-primary font-bold">
                            Resend Code
                          </Text>
                        </View>
                      </View>

                      <Button
                        variant="primary"
                        size="lg"
                        onPress={handleVerifyCode}
                        loading={loading}
                        disabled={
                          !verificationCode.trim() ||
                          verificationCode.length !== 6
                        }
                        className="w-full rounded-2xl shadow-xl mb-2"
                      >
                        <Text className="font-bold text-base tracking-wide">
                          Verify & Continue
                        </Text>
                      </Button>

                      <Button
                        variant="ghost"
                        size="md"
                        onPress={() => {
                          setShowCodeInput(false);
                          setVerificationCode('');
                          progressWidth.value = 0;
                        }}
                        className="w-full rounded-xl"
                      >
                        <FontAwesome5 name="arrow-left" size={icon(14)} color={gray500Color} style={{ marginRight: 8 }} />
                        <Text className="font-semibold">Change Phone Number</Text>
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
              </Animated.View>
            </Animated.View>

            {/* Security Badge */}
            <Animated.View
              entering={FadeInUp.delay(450).duration(600)}
              className="flex-row items-center justify-center gap-2 mb-6"
            >
              <View className="w-5 h-5 rounded-full bg-green-500/20 items-center justify-center">
                <FontAwesome5 name="shield-alt" size={icon(10)} color="#10b981" />
              </View>
              <Text className="text-xs text-text-secondary font-semibold">
                Secure & Encrypted Connection
              </Text>
            </Animated.View>

              {/* Footer */}
              <Animated.View
                entering={FadeInUp.delay(500).duration(600)}
                className="mt-auto"
              >
                <Text className="text-xs text-text-secondary text-center leading-relaxed px-6 font-medium">
                  By continuing, you agree to our{' '}
                  <Text className="text-primary font-bold">Terms of Service</Text>
                  {' '}and{' '}
                  <Text className="text-primary font-bold">Privacy Policy</Text>
                </Text>
              </Animated.View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}