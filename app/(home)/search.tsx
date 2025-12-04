import { Card } from '@/components/ui';
import { mockLands } from '@/lib/land-data';
import { font, icon, moderate, useAccessibilityProps, useResponsiveUtils } from '@/lib/responsive';
import { getGray500Color, getPrimaryColor, getWhiteColor } from '@/utils/colors';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const { spacing, typography } = useResponsiveUtils();
  const primaryColor = getPrimaryColor();
  const whiteColor = getWhiteColor();
  const gray500Color = getGray500Color();
  const [selectedLand, setSelectedLand] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Accessibility props
  const mapViewAccessibility = useAccessibilityProps('Map view', 'Switch to map view');
  const listViewAccessibility = useAccessibilityProps('List view', 'Switch to list view');
  const searchAccessibility = useAccessibilityProps('Search', 'Search for properties');

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1">
        {/* Header */}
        <View 
          style={{
            paddingHorizontal: moderate(20),
            paddingTop: moderate(16),
            paddingBottom: moderate(12),
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
          }}
        >
          <View className="flex-row items-center justify-between" style={{ marginBottom: spacing.md }}>
            <View className="flex-1">
              <Text 
                style={{
                  fontSize: typography.h2,
                  fontWeight: '800',
                  color: '#000000',
                  marginBottom: spacing.xs,
                }}
              >
                Find Lands
              </Text>
              <Text 
                style={{
                  fontSize: font(14),
                  color: gray500Color,
                }}
              >
                {mockLands.length} properties available
              </Text>
            </View>
            <View className="flex-row" style={{ gap: moderate(8) }}>
              <TouchableOpacity
                onPress={() => setViewMode('map')}
                style={{
                  paddingHorizontal: moderate(16),
                  paddingVertical: moderate(8),
                  borderRadius: moderate(12),
                  backgroundColor: viewMode === 'map' ? primaryColor : '#F9FAFB',
                }}
                {...mapViewAccessibility}
              >
                <FontAwesome5
                  name="map"
                  size={icon(16)}
                  color={viewMode === 'map' ? whiteColor : gray500Color}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setViewMode('list')}
                style={{
                  paddingHorizontal: moderate(16),
                  paddingVertical: moderate(8),
                  borderRadius: moderate(12),
                  backgroundColor: viewMode === 'list' ? primaryColor : '#F9FAFB',
                }}
                {...listViewAccessibility}
              >
                <FontAwesome5
                  name="list"
                  size={icon(16)}
                  color={viewMode === 'list' ? whiteColor : gray500Color}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: moderate(12),
              padding: moderate(14),
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
            {...searchAccessibility}
          >
            <FontAwesome5 name="search" size={icon(16)} color={gray500Color} />
            <Text 
              style={{
                marginLeft: spacing.md,
                fontSize: font(14),
                color: gray500Color,
                fontWeight: '500',
                flex: 1,
              }}
            >
              Search by location, size, price...
            </Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'map' ? (
          <View className="flex-1" style={{ position: 'relative' }}>
            {/* Map Placeholder */}
            <View className="flex-1" style={{ backgroundColor: '#F3F4F6', position: 'relative' }}>
              {/* Map-like background pattern */}
              <View style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <View
                    key={i}
                    style={{
                      position: 'absolute',
                      borderWidth: 1,
                      borderColor: '#D1D5DB',
                      left: `${(i % 5) * 20}%`,
                      top: `${Math.floor(i / 5) * 20}%`,
                      width: '18%',
                      height: '18%',
                    }}
                  />
                ))}
              </View>

              {/* Map Center Indicator */}
              <View
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: [{ translateX: moderate(-12) }, { translateY: moderate(-12) }],
                }}
              >
                <View 
                  style={{
                    width: moderate(24),
                    height: moderate(24),
                    borderRadius: moderate(12),
                    backgroundColor: `${primaryColor}33`,
                    borderWidth: 2,
                    borderColor: primaryColor,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: moderate(8),
                    height: moderate(8),
                    borderRadius: moderate(4),
                    backgroundColor: primaryColor,
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: moderate(-4) }, { translateY: moderate(-4) }],
                  }}
                />
              </View>

              {/* Land Markers */}
              {mockLands.map((land, index) => (
                <TouchableOpacity
                  key={land.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedLand(land.id)}
                  style={{
                    position: 'absolute',
                    left: `${20 + (index % 3) * 30}%`,
                    top: `${25 + Math.floor(index / 3) * 30}%`,
                  }}
                >
                  <Animated.View
                    entering={FadeInDown.delay(index * 100).duration(500)}
                  >
                    <View
                      style={{
                        width: moderate(48),
                        height: moderate(48),
                        borderRadius: moderate(24),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selectedLand === land.id ? primaryColor : whiteColor,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5,
                        transform: selectedLand === land.id ? [{ scale: 1.25 }] : [],
                      }}
                    >
                      <FontAwesome5
                        name="map-marker-alt"
                        size={icon(20)}
                        color={
                          selectedLand === land.id ? whiteColor : primaryColor
                        }
                      />
                    </View>
                    {land.verified && (
                      <View 
                        style={{
                          position: 'absolute',
                          top: moderate(-4),
                          right: moderate(-4),
                          width: moderate(20),
                          height: moderate(20),
                          borderRadius: moderate(10),
                          backgroundColor: primaryColor,
                          borderWidth: 2,
                          borderColor: whiteColor,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MaterialIcons name="verified" size={icon(10)} color={whiteColor} />
                      </View>
                    )}
                  </Animated.View>
                </TouchableOpacity>
              ))}

              {/* Map Controls */}
              <View 
                style={{
                  position: 'absolute',
                  bottom: moderate(24),
                  right: moderate(20),
                  gap: moderate(12),
                }}
              >
                <TouchableOpacity 
                  style={{
                    width: moderate(48),
                    height: moderate(48),
                    borderRadius: moderate(12),
                    backgroundColor: whiteColor,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                  }}
                >
                  <FontAwesome5 name="location-arrow" size={icon(18)} color={primaryColor} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{
                    width: moderate(48),
                    height: moderate(48),
                    borderRadius: moderate(12),
                    backgroundColor: whiteColor,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                  }}
                >
                  <FontAwesome5 name="layer-group" size={icon(18)} color={gray500Color} />
                </TouchableOpacity>
              </View>

              {/* Map Legend */}
              <View 
                style={{
                  position: 'absolute',
                  top: moderate(24),
                  left: moderate(20),
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: moderate(12),
                  padding: moderate(12),
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}
              >
                <Text 
                  style={{
                    fontSize: font(12),
                    fontWeight: '700',
                    color: '#000000',
                    marginBottom: spacing.xs,
                  }}
                >
                  Legend
                </Text>
                <View className="flex-row items-center" style={{ marginBottom: spacing.xs, gap: moderate(8) }}>
                  <View 
                    style={{
                      width: moderate(12),
                      height: moderate(12),
                      borderRadius: moderate(6),
                      backgroundColor: primaryColor,
                    }}
                  />
                  <Text 
                    style={{
                      fontSize: font(12),
                      color: gray500Color,
                    }}
                  >
                    Verified
                  </Text>
                </View>
                <View className="flex-row items-center" style={{ gap: moderate(8) }}>
                  <View 
                    style={{
                      width: moderate(12),
                      height: moderate(12),
                      borderRadius: moderate(6),
                      backgroundColor: '#9CA3AF',
                    }}
                  />
                  <Text 
                    style={{
                      fontSize: font(12),
                      color: gray500Color,
                    }}
                  >
                    Unverified
                  </Text>
                </View>
              </View>
            </View>

            {/* Selected Land Card */}
            {selectedLand && (
              <Animated.View
                entering={FadeInUp.duration(400)}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: whiteColor,
                  borderTopLeftRadius: moderate(24),
                  borderTopRightRadius: moderate(24),
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 10,
                  borderTopWidth: 2,
                  borderTopColor: '#E5E7EB',
                }}
              >
                {(() => {
                  const land = mockLands.find((l) => l.id === selectedLand);
                  if (!land) return null;
                  return (
                    <View style={{ padding: moderate(20) }}>
                      <View className="flex-row items-start justify-between" style={{ marginBottom: spacing.md }}>
                        <View className="flex-1">
                          <View className="flex-row items-center" style={{ marginBottom: spacing.xs, gap: moderate(8) }}>
                            <Text 
                              style={{
                                fontSize: typography.h4,
                                fontWeight: '700',
                                color: '#000000',
                              }}
                            >
                              {land.title}
                            </Text>
                            {land.verified && (
                              <View 
                                style={{
                                  paddingHorizontal: moderate(8),
                                  paddingVertical: moderate(2),
                                  borderRadius: moderate(9999),
                                  backgroundColor: `${primaryColor}1A`,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: moderate(4),
                                }}
                              >
                                <MaterialIcons
                                  name="verified"
                                  size={icon(12)}
                                  color={primaryColor}
                                />
                                <Text 
                                  style={{
                                    fontSize: font(12),
                                    fontWeight: '700',
                                    color: primaryColor,
                                  }}
                                >
                                  Verified
                                </Text>
                              </View>
                            )}
                          </View>
                          <View className="flex-row items-center" style={{ marginBottom: spacing.xs, gap: moderate(6) }}>
                            <FontAwesome5
                              name="map-marker-alt"
                              size={icon(11)}
                              color={gray500Color}
                            />
                            <Text 
                              style={{
                                fontSize: font(14),
                                color: gray500Color,
                                fontWeight: '500',
                              }}
                            >
                              {land.location}
                            </Text>
                          </View>
                          <Text 
                            style={{
                              fontSize: font(12),
                              color: gray500Color,
                            }}
                          >
                            {land.type}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => setSelectedLand(null)}
                          style={{
                            width: moderate(32),
                            height: moderate(32),
                            borderRadius: moderate(16),
                            backgroundColor: '#F9FAFB',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <FontAwesome5
                            name="times"
                            size={icon(14)}
                            color={gray500Color}
                          />
                        </TouchableOpacity>
                      </View>

                      <View 
                        style={{
                          height: moderate(128),
                          borderRadius: moderate(16),
                          overflow: 'hidden',
                          marginBottom: spacing.md,
                        }}
                      >
                        <Image
                          source={{ uri: land.image }}
                          style={{ width: '100%', height: '100%' }}
                          contentFit="cover"
                          transition={300}
                        />
                      </View>

                      <View 
                        className="flex-row justify-between items-center" 
                        style={{
                          paddingTop: spacing.md,
                          borderTopWidth: 1,
                          borderTopColor: '#E5E7EB',
                        }}
                      >
                        <View>
                          <Text 
                            style={{
                              fontSize: font(12),
                              color: gray500Color,
                              marginBottom: spacing.xs,
                            }}
                          >
                            Size
                          </Text>
                          <Text 
                            style={{
                              fontSize: font(16),
                              color: '#000000',
                              fontWeight: '700',
                            }}
                          >
                            {land.size}
                          </Text>
                        </View>
                        <View className="items-end">
                          <Text 
                            style={{
                              fontSize: font(12),
                              color: gray500Color,
                              marginBottom: spacing.xs,
                            }}
                          >
                            Price
                          </Text>
                          <Text 
                            style={{
                              fontSize: typography.h3,
                              fontWeight: '800',
                              color: primaryColor,
                            }}
                          >
                            {land.price}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={{
                          marginTop: spacing.md,
                          backgroundColor: primaryColor,
                          borderRadius: moderate(16),
                          paddingVertical: moderate(16),
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.3,
                          shadowRadius: 8,
                          elevation: 5,
                        }}
                      >
                        <Text 
                          style={{
                            color: whiteColor,
                            fontWeight: '700',
                            fontSize: font(16),
                          }}
                        >
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })()}
              </Animated.View>
            )}
          </View>
        ) : (
          /* List View */
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ 
              padding: moderate(20), 
              paddingBottom: moderate(100) 
            }}
            showsVerticalScrollIndicator={false}
          >
            {mockLands.map((land, index) => (
              <Animated.View
                key={land.id}
                entering={FadeInUp.delay(index * 100).duration(500)}
                style={{ marginBottom: spacing.md }}
              >
                <Card
                  variant="elevated"
                  padding="none"
                  className="overflow-hidden shadow-md border border-border rounded-2xl"
                >
                  <View style={{ height: moderate(176), position: 'relative' }}>
                    <Image
                      source={{ uri: land.image }}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                      transition={300}
                    />
                    {land.verified && (
                      <View 
                        style={{
                          position: 'absolute',
                          top: moderate(12),
                          right: moderate(12),
                          paddingHorizontal: moderate(10),
                          paddingVertical: moderate(4),
                          borderRadius: moderate(9999),
                          backgroundColor: `${primaryColor}F2`,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.3,
                          shadowRadius: 8,
                          elevation: 5,
                        }}
                      >
                        <View className="flex-row items-center" style={{ gap: moderate(4) }}>
                          <MaterialIcons name="verified" size={icon(11)} color={whiteColor} />
                          <Text 
                            style={{
                              fontSize: font(12),
                              color: whiteColor,
                              fontWeight: '700',
                            }}
                          >
                            Verified
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>

                  <View style={{ padding: moderate(16) }}>
                    <Text 
                      style={{
                        fontSize: font(16),
                        fontWeight: '700',
                        color: '#000000',
                        marginBottom: spacing.xs,
                      }}
                    >
                      {land.title}
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
                          fontWeight: '500',
                        }}
                      >
                        {land.location}
                      </Text>
                    </View>
                    <View 
                      className="flex-row justify-between items-center" 
                      style={{
                        paddingTop: spacing.md,
                        borderTopWidth: 1,
                        borderTopColor: '#E5E7EB',
                      }}
                    >
                      <View>
                        <Text 
                          style={{
                            fontSize: font(12),
                            color: gray500Color,
                            marginBottom: moderate(2),
                          }}
                        >
                          Size
                        </Text>
                        <Text 
                          style={{
                            fontSize: font(14),
                            color: '#000000',
                            fontWeight: '700',
                          }}
                        >
                          {land.size}
                        </Text>
                      </View>
                      <View className="items-end">
                        <Text 
                          style={{
                            fontSize: font(12),
                            color: gray500Color,
                            marginBottom: moderate(2),
                          }}
                        >
                          Price
                        </Text>
                        <Text 
                          style={{
                            fontSize: typography.h4,
                            fontWeight: '800',
                            color: primaryColor,
                          }}
                        >
                          {land.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </Animated.View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
