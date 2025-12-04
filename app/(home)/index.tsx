import { Card } from '@/components/ui';
import { featuredListing, newListings, trendingListings } from '@/lib/land-data';
import { font, icon, moderate, useAccessibilityProps, useResponsiveUtils } from '@/lib/responsive';
import { getGray500Color, getPrimaryColor, getWhiteColor } from '@/utils/colors';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: '1', name: 'Agricultural', icon: 'seedling', count: 24 },
  { id: '2', name: 'Residential', icon: 'home', count: 18 },
  { id: '3', name: 'Commercial', icon: 'store', count: 12 },
  { id: '4', name: 'Industrial', icon: 'industry', count: 8 },
];

const formatPrice = (price: string) => {
  const parts = price.split(',');
  if (parts.length < 2) return price;
  const last = parts[parts.length - 1] ?? '';
  const trimmed = last.slice(0, 2).padEnd(2, '0');
  return [...parts.slice(0, -1), trimmed].join(',');
};

export default function HomeScreen() {
  const { spacing, typography } = useResponsiveUtils();
  const primaryColor = getPrimaryColor();
  const whiteColor = getWhiteColor();
  const gray500Color = getGray500Color();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const bellAccessibility = useAccessibilityProps('Notifications', 'View notifications');
  const searchAccessibility = useAccessibilityProps('Search', 'Search for properties');

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: moderate(100),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.duration(600)} 
          style={{
            paddingHorizontal: spacing.screenPadding,
            paddingTop: spacing.lg,
            paddingBottom: spacing.xl,
          }}
        >
          <View className="flex-row justify-between items-start" style={{ marginBottom: spacing.lg }}>
            <View className="flex-1">
              <Text 
                style={{
                  fontSize: font(11),
                  color: gray500Color,
                  marginBottom: spacing.xs,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: moderate(2),
                }}
              >
                Welcome back
              </Text>
              <Text 
                style={{
                  fontSize: typography.h1,
                  fontWeight: '900',
                  color: '#000000',
                  lineHeight: typography.getLineHeight(typography.h1),
                }}
              >
                Discover Your{'\n'}Perfect Land
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: moderate(48),
                height: moderate(48),
                borderRadius: moderate(16),
                backgroundColor: `${primaryColor}1A`,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
              {...bellAccessibility}
            >
              <FontAwesome5 name="bell" size={icon(18)} color={primaryColor} />
              <View 
                style={{
                  position: 'absolute',
                  top: moderate(8),
                  right: moderate(8),
                  width: moderate(8),
                  height: moderate(8),
                  borderRadius: moderate(4),
                  backgroundColor: primaryColor,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Enhanced Search */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/(home)/search')}
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: moderate(16),
              padding: moderate(20),
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
            {...searchAccessibility}
          >
            <View 
              style={{
                width: moderate(40),
                height: moderate(40),
                borderRadius: moderate(12),
                backgroundColor: `${primaryColor}1A`,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
              }}
            >
              <FontAwesome5 name="search" size={icon(16)} color={primaryColor} />
            </View>
            <Text 
              style={{
                fontSize: font(15),
                color: gray500Color,
                fontWeight: '500',
                flex: 1,
              }}
            >
              Search location, size, price...
            </Text>
            <View 
              style={{
                width: moderate(40),
                height: moderate(40),
                borderRadius: moderate(12),
                backgroundColor: whiteColor,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="tune" size={icon(20)} color={gray500Color} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Categories */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={{ marginBottom: spacing.xl }}
        >
          <View style={{ paddingHorizontal: spacing.screenPadding, marginBottom: spacing.md }}>
            <Text 
              style={{
                fontSize: typography.h4,
                fontWeight: '900',
                color: '#000000',
              }}
            >
              Categories
            </Text>
            <Text 
              style={{
                fontSize: font(12),
                color: gray500Color,
                marginTop: spacing.xs,
              }}
            >
              Find your ideal property type
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingLeft: spacing.lg, 
              paddingRight: spacing.lg, 
              gap: moderate(14) 
            }}
          >
            {categories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInRight.delay(150 + index * 50).duration(500)}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(category.id)}
                  style={{
                    width: moderate(190),
                    height: moderate(160),
                    borderRadius: moderate(24),
                    padding: moderate(16),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selectedCategory === category.id 
                      ? primaryColor 
                      : '#F9FAFB',
                    borderWidth: selectedCategory === category.id ? 0 : 2,
                    borderColor: '#E5E7EB',
                  }}
                >
                  <View
                    style={{
                      width: moderate(56),
                      height: moderate(56),
                      borderRadius: moderate(16),
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: spacing.md,
                      backgroundColor: selectedCategory === category.id
                        ? 'rgba(255, 255, 255, 0.2)'
                        : whiteColor,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: selectedCategory === category.id ? 0 : 0.1,
                      shadowRadius: 2,
                      elevation: selectedCategory === category.id ? 0 : 2,
                    }}
                  >
                    <FontAwesome5
                      name={category.icon as any}
                      size={icon(20)}
                      color={
                        selectedCategory === category.id
                          ? whiteColor
                          : primaryColor
                      }
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: font(12),
                      fontWeight: '700',
                      textAlign: 'center',
                      marginBottom: spacing.xs,
                      color: selectedCategory === category.id
                        ? whiteColor
                        : '#000000',
                    }}
                    numberOfLines={1}
                  >
                    {category.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: font(11),
                      fontWeight: '600',
                      color: selectedCategory === category.id
                        ? 'rgba(255, 255, 255, 0.9)'
                        : gray500Color,
                    }}
                  >
                    {category.count} lands
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Featured Listing */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={{ marginBottom: spacing.xl, paddingHorizontal: spacing.screenPadding }}
        >
          <View className="flex-row items-center justify-between" style={{ marginBottom: spacing.md }}>
            <View>
              <Text 
                style={{
                  fontSize: typography.h4,
                  fontWeight: '900',
                  color: '#000000',
                }}
              >
                Featured Property
              </Text>
              <Text 
                style={{
                  fontSize: font(12),
                  color: gray500Color,
                  marginTop: spacing.xs,
                }}
              >
                Premium selection
              </Text>
            </View>
            <View 
              style={{
                paddingHorizontal: spacing.md,
                paddingVertical: moderate(6),
                borderRadius: moderate(9999),
                backgroundColor: `${primaryColor}1A`,
              }}
            >
              <Text 
                style={{
                  fontSize: font(10),
                  color: primaryColor,
                  fontWeight: '700',
                }}
              >
                ⭐ BEST PICK
              </Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.95}>
            <Card
              variant="elevated"
              padding="none"
              className="overflow-hidden rounded-3xl shadow-lg"
            >
              <View style={{ height: moderate(256), position: 'relative' }}>
                <Image
                  source={{ uri: featuredListing.image }}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                  transition={300}
                />
                <View 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'transparent',
                  }}
                />
                
                {/* Type Badge */}
                <View 
                  style={{
                    position: 'absolute',
                    top: moderate(16),
                    left: moderate(16),
                  }}
                >
                  <View 
                    style={{
                      paddingHorizontal: moderate(16),
                      paddingVertical: moderate(8),
                      borderRadius: moderate(9999),
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <Text 
                      style={{
                        fontSize: font(11),
                        color: '#000000',
                        fontWeight: '900',
                      }}
                    >
                      {featuredListing.type}
                    </Text>
                  </View>
                </View>

                {/* Bookmark Icon */}
                <View 
                  style={{
                    position: 'absolute',
                    top: moderate(16),
                    right: moderate(16),
                  }}
                >
                  <View 
                    style={{
                      width: moderate(40),
                      height: moderate(40),
                      borderRadius: moderate(20),
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <FontAwesome5 name="heart" size={icon(14)} color={primaryColor} />
                  </View>
                </View>

                {/* Content */}
                <View 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: moderate(20),
                  }}
                >
                  <Text 
                    style={{
                      fontSize: typography.h2,
                      fontWeight: '900',
                      color: whiteColor,
                      marginBottom: spacing.xs,
                    }}
                    numberOfLines={1}
                  >
                    {featuredListing.title}
                  </Text>
                  <View className="flex-row items-center" style={{ marginBottom: spacing.md, gap: moderate(8) }}>
                    <View 
                      style={{
                        width: moderate(24),
                        height: moderate(24),
                        borderRadius: moderate(12),
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FontAwesome5 name="map-marker-alt" size={icon(11)} color={whiteColor} />
                    </View>
                    <Text 
                      style={{
                        fontSize: font(14),
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontWeight: '700',
                      }}
                    >
                      {featuredListing.location}
                    </Text>
                  </View>
                  <View 
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: moderate(16),
                      padding: moderate(16),
                    }}
                  >
                    <View className="flex-1">
                      <Text 
                        style={{
                          fontSize: font(10),
                          color: 'rgba(255, 255, 255, 0.7)',
                          marginBottom: spacing.xs,
                          fontWeight: '600',
                        }}
                      >
                        Size
                      </Text>
                      <Text 
                        style={{
                          fontSize: font(16),
                          color: whiteColor,
                          fontWeight: '900',
                        }}
                      >
                        {featuredListing.size}
                      </Text>
                    </View>
                    <View 
                      style={{
                        height: moderate(32),
                        width: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        marginHorizontal: spacing.md,
                      }}
                    />
                    <View className="flex-1 items-end">
                      <Text 
                        style={{
                          fontSize: font(10),
                          color: 'rgba(255, 255, 255, 0.7)',
                          marginBottom: spacing.xs,
                          fontWeight: '600',
                        }}
                      >
                        Price
                      </Text>
                      <Text 
                        style={{
                          fontSize: typography.h3,
                          fontWeight: '900',
                          color: whiteColor,
                        }}
                      >
                        {formatPrice(featuredListing.price)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </Animated.View>

        {/* New Listings */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600)}
          style={{ marginBottom: spacing.xl }}
        >
          <View 
            className="flex-row items-center justify-between" 
            style={{ marginBottom: spacing.md, paddingHorizontal: spacing.screenPadding }}
          >
            <View>
              <Text 
                style={{
                  fontSize: typography.h4,
                  fontWeight: '900',
                  color: '#000000',
                }}
              >
                New Listings
              </Text>
              <Text 
                style={{
                  fontSize: font(12),
                  color: gray500Color,
                  marginTop: spacing.xs,
                }}
              >
                Recently added properties
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center" style={{ gap: moderate(4) }}>
              <Text 
                style={{
                  fontSize: font(14),
                  fontWeight: '700',
                  color: primaryColor,
                }}
              >
                See All
              </Text>
              <FontAwesome5 name="chevron-right" size={icon(12)} color={primaryColor} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingLeft: spacing.lg, 
              paddingRight: spacing.lg, 
              gap: moderate(14) 
            }}
          >
            {newListings.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInRight.delay(350 + index * 80).duration(500)}
              >
                <TouchableOpacity activeOpacity={0.95}>
                  <View style={{ width: moderate(280) }}>
                    <Card
                      variant="default"
                      padding="none"
                      className="overflow-hidden rounded-2xl"
                    >
                    <View style={{ height: moderate(160), position: 'relative' }}>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={300}
                      />
                      <View 
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'transparent',
                        }}
                      />
                      <View 
                        style={{
                          position: 'absolute',
                          top: moderate(12),
                          right: moderate(12),
                        }}
                      >
                        <View 
                          style={{
                            width: moderate(36),
                            height: moderate(36),
                            borderRadius: moderate(18),
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                          }}
                        >
                          <FontAwesome5 name="heart" size={icon(12)} color={gray500Color} />
                        </View>
                      </View>
                      <View 
                        style={{
                          position: 'absolute',
                          bottom: moderate(12),
                          left: moderate(12),
                          paddingHorizontal: moderate(10),
                          paddingVertical: moderate(4),
                          borderRadius: moderate(9999),
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        <Text 
                          style={{
                            fontSize: font(10),
                            color: whiteColor,
                            fontWeight: '700',
                          }}
                        >
                          🕐 {item.added}
                        </Text>
                      </View>
                    </View>
                    <View style={{ padding: moderate(18) }}>
                      <Text 
                        style={{
                          fontSize: font(14),
                          fontWeight: '900',
                          color: '#000000',
                          marginBottom: moderate(6),
                        }}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <View className="flex-row items-center" style={{ marginBottom: spacing.md, gap: moderate(6) }}>
                        <FontAwesome5
                          name="map-marker-alt"
                          size={icon(10)}
                          color={gray500Color}
                        />
                        <Text 
                          style={{
                            fontSize: font(12),
                            color: gray500Color,
                            fontWeight: '600',
                            flex: 1,
                          }}
                          numberOfLines={1}
                        >
                          {item.location}
                        </Text>
                      </View>
                      <View 
                        className="flex-row items-center" 
                        style={{
                          paddingTop: spacing.md,
                          borderTopWidth: 1,
                          borderTopColor: '#E5E7EB',
                        }}
                      >
                        <View className="flex-1">
                          <Text 
                            style={{
                              fontSize: font(10),
                              color: gray500Color,
                              marginBottom: spacing.xs,
                              fontWeight: '600',
                            }}
                          >
                            Size
                          </Text>
                          <Text 
                            style={{
                              fontSize: font(12),
                              color: '#000000',
                              fontWeight: '900',
                            }}
                          >
                            {item.size}
                          </Text>
                        </View>
                        <View 
                          style={{
                            height: moderate(32),
                            width: 1,
                            backgroundColor: '#E5E7EB',
                            marginHorizontal: spacing.md,
                          }}
                        />
                        <View className="flex-1 items-end">
                          <Text 
                            style={{
                              fontSize: font(10),
                              color: gray500Color,
                              marginBottom: spacing.xs,
                              fontWeight: '600',
                            }}
                          >
                            Price
                          </Text>
                          <Text 
                            style={{
                              fontSize: font(14),
                              fontWeight: '900',
                              color: primaryColor,
                            }}
                          >
                            {formatPrice(item.price)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    </Card>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Trending */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(600)}
          style={{ marginBottom: spacing.xl, paddingHorizontal: spacing.screenPadding }}
        >
          <View className="flex-row items-center justify-between" style={{ marginBottom: spacing.md }}>
            <View>
              <Text 
                style={{
                  fontSize: typography.h4,
                  fontWeight: '900',
                  color: '#000000',
                }}
              >
                Trending Now
              </Text>
              <Text 
                style={{
                  fontSize: font(12),
                  color: gray500Color,
                  marginTop: spacing.xs,
                }}
              >
                🔥 Most viewed this week
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center" style={{ gap: moderate(4) }}>
              <Text 
                style={{
                  fontSize: font(14),
                  fontWeight: '700',
                  color: primaryColor,
                }}
              >
                See All
              </Text>
              <FontAwesome5 name="chevron-right" size={icon(12)} color={primaryColor} />
            </TouchableOpacity>
          </View>
          {trendingListings.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInUp.delay(450 + index * 100).duration(500)}
              style={{ marginBottom: spacing.md }}
            >
              <TouchableOpacity activeOpacity={0.95}>
                <Card
                  variant="elevated"
                  padding="none"
                  className="overflow-hidden rounded-2xl shadow-md"
                >
                  <View className="flex-row" style={{ height: moderate(144) }}>
                    <View style={{ width: moderate(144), height: '100%', position: 'relative' }}>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={300}
                      />
                      <View 
                        style={{
                          position: 'absolute',
                          top: moderate(8),
                          left: moderate(8),
                          paddingHorizontal: moderate(8),
                          paddingVertical: moderate(4),
                          borderRadius: moderate(9999),
                          backgroundColor: primaryColor,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.2,
                          shadowRadius: 2,
                          elevation: 2,
                        }}
                      >
                        <Text 
                          style={{
                            fontSize: font(9),
                            color: whiteColor,
                            fontWeight: '900',
                          }}
                        >
                          TRENDING
                        </Text>
                      </View>
                    </View>
                    <View className="flex-1" style={{ padding: moderate(16) }}>
                      <Text 
                        style={{
                          fontSize: font(14),
                          fontWeight: '900',
                          color: '#000000',
                          marginBottom: moderate(6),
                        }}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <View className="flex-row items-center" style={{ marginBottom: spacing.xs, gap: moderate(6) }}>
                        <FontAwesome5
                          name="map-marker-alt"
                          size={icon(10)}
                          color={gray500Color}
                        />
                        <Text 
                          style={{
                            fontSize: font(12),
                            color: gray500Color,
                            fontWeight: '600',
                            flex: 1,
                          }}
                          numberOfLines={1}
                        >
                          {item.location}
                        </Text>
                      </View>
                      <View style={{ marginBottom: spacing.md }}>
                        <View 
                          style={{
                            paddingHorizontal: moderate(10),
                            paddingVertical: moderate(4),
                            borderRadius: moderate(9999),
                            backgroundColor: `${primaryColor}1A`,
                            alignSelf: 'flex-start',
                          }}
                        >
                          <View className="flex-row items-center" style={{ gap: moderate(6) }}>
                            <FontAwesome5 name="eye" size={icon(10)} color={primaryColor} />
                            <Text 
                              style={{
                                fontSize: font(10),
                                color: primaryColor,
                                fontWeight: '700',
                              }}
                            >
                              {item.views.toLocaleString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View 
                        className="flex-row items-center" 
                        style={{
                          paddingTop: spacing.xs,
                          borderTopWidth: 1,
                          borderTopColor: '#E5E7EB',
                          marginTop: 'auto',
                        }}
                      >
                        <View className="flex-1">
                          <Text 
                            style={{
                              fontSize: font(10),
                              color: gray500Color,
                              marginBottom: moderate(2),
                              fontWeight: '600',
                            }}
                          >
                            Size
                          </Text>
                          <Text 
                            style={{
                              fontSize: font(12),
                              color: '#000000',
                              fontWeight: '900',
                            }}
                          >
                            {item.size}
                          </Text>
                        </View>
                        <View 
                          style={{
                            height: moderate(32),
                            width: 1,
                            backgroundColor: '#E5E7EB',
                            marginHorizontal: spacing.xs,
                          }}
                        />
                        <View className="flex-1 items-end">
                          <Text 
                            style={{
                              fontSize: font(10),
                              color: gray500Color,
                              marginBottom: moderate(2),
                              fontWeight: '600',
                            }}
                          >
                            Price
                          </Text>
                          <Text 
                            style={{
                              fontSize: font(14),
                              fontWeight: '900',
                              color: primaryColor,
                            }}
                          >
                            {formatPrice(item.price)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(600)}
          style={{ paddingHorizontal: spacing.screenPadding, marginBottom: spacing.lg }}
        >
          <View 
            style={{
              backgroundColor: `${primaryColor}1A`,
              borderRadius: moderate(24),
              padding: moderate(24),
              borderWidth: 2,
              borderColor: `${primaryColor}33`,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View className="flex-row items-center" style={{ marginBottom: moderate(20) }}>
              <View 
                style={{
                  width: moderate(40),
                  height: moderate(40),
                  borderRadius: moderate(16),
                  backgroundColor: `${primaryColor}33`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}
              >
                <FontAwesome5 name="chart-line" size={icon(16)} color={primaryColor} />
              </View>
              <Text 
                style={{
                  fontSize: font(16),
                  fontWeight: '900',
                  color: '#000000',
                }}
              >
                Market Overview
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: moderate(16), paddingVertical: moderate(16) }}>
                <Text 
                  style={{
                    fontSize: typography.h2,
                    fontWeight: '900',
                    color: primaryColor,
                    marginBottom: moderate(6),
                  }}
                >
                  62
                </Text>
                <Text 
                  style={{
                    fontSize: font(10),
                    color: gray500Color,
                    textAlign: 'center',
                    fontWeight: '700',
                    paddingHorizontal: spacing.xs,
                  }}
                >
                  Total Properties
                </Text>
              </View>
              <View style={{ width: moderate(12) }} />
              <View className="flex-1 items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: moderate(16), paddingVertical: moderate(16) }}>
                <Text 
                  style={{
                    fontSize: typography.h2,
                    fontWeight: '900',
                    color: primaryColor,
                    marginBottom: moderate(6),
                  }}
                >
                  48
                </Text>
                <Text 
                  style={{
                    fontSize: font(10),
                    color: gray500Color,
                    textAlign: 'center',
                    fontWeight: '700',
                    paddingHorizontal: spacing.xs,
                  }}
                >
                  Available Lands
                </Text>
              </View>
              <View style={{ width: moderate(12) }} />
              <View className="flex-1 items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: moderate(16), paddingVertical: moderate(16) }}>
                <Text 
                  style={{
                    fontSize: typography.h2,
                    fontWeight: '900',
                    color: primaryColor,
                    marginBottom: moderate(6),
                  }}
                >
                  $95K
                </Text>
                <Text 
                  style={{
                    fontSize: font(10),
                    color: gray500Color,
                    textAlign: 'center',
                    fontWeight: '700',
                    paddingHorizontal: spacing.xs,
                  }}
                >
                  Avg. Price
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}