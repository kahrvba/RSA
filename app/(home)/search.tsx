import { Card, CardContent } from '@/components/ui';
import { getGray500Color, getPrimaryColor, getWhiteColor } from '@/utils/colors';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Mock land listings with coordinates (Palestine area)
const mockLands = [
  {
    id: '1',
    title: 'Olive Grove Land',
    location: 'Ramallah',
    size: '2,400 m²',
    price: '$120,000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    latitude: 31.9073,
    longitude: 35.2042,
    type: 'Agricultural',
  },
  {
    id: '2',
    title: 'Residential Plot',
    location: 'Nablus',
    size: '1,800 m²',
    price: '$95,000',
    verified: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    latitude: 32.2211,
    longitude: 35.2544,
    type: 'Residential',
  },
  {
    id: '3',
    title: 'Agricultural Land',
    location: 'Hebron',
    size: '3,200 m²',
    price: '$150,000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    latitude: 31.5326,
    longitude: 35.0998,
    type: 'Agricultural',
  },
  {
    id: '4',
    title: 'Mountain View Plot',
    location: 'Jerusalem',
    size: '2,100 m²',
    price: '$180,000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    latitude: 31.7683,
    longitude: 35.2137,
    type: 'Residential',
  },
  {
    id: '5',
    title: 'Farm Land',
    location: 'Bethlehem',
    size: '4,500 m²',
    price: '$200,000',
    verified: false,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    latitude: 31.7054,
    longitude: 35.2024,
    type: 'Agricultural',
  },
];

export default function SearchScreen() {
  const primaryColor = getPrimaryColor();
  const whiteColor = getWhiteColor();
  const gray500Color = getGray500Color();
  const [selectedLand, setSelectedLand] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1">
        {/* Header */}
        <View className="px-5 pt-4 pb-3 bg-background border-b border-border">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-2xl font-extrabold text-text mb-1">
                Find Lands
              </Text>
              <Text className="text-sm text-text-secondary">
                {mockLands.length} properties available
              </Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => setViewMode('map')}
                className={`px-4 py-2 rounded-xl ${
                  viewMode === 'map' ? 'bg-primary' : 'bg-background-secondary'
                }`}
              >
                <FontAwesome5
                  name="map"
                  size={16}
                  color={viewMode === 'map' ? whiteColor : gray500Color}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setViewMode('list')}
                className={`px-4 py-2 rounded-xl ${
                  viewMode === 'list' ? 'bg-primary' : 'bg-background-secondary'
                }`}
              >
                <FontAwesome5
                  name="list"
                  size={16}
                  color={viewMode === 'list' ? whiteColor : gray500Color}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-background-secondary rounded-xl p-3.5 flex-row items-center border border-border"
          >
            <FontAwesome5 name="search" size={16} color={gray500Color} />
            <Text className="ml-3 text-sm text-text-secondary font-medium flex-1">
              Search by location, size, price...
            </Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'map' ? (
          <View className="flex-1 relative">
            {/* Map Placeholder */}
            <View className="flex-1 bg-gray-100 relative">
              {/* Map-like background pattern */}
              <View className="absolute inset-0 opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <View
                    key={i}
                    className="absolute border border-gray-300"
                    style={{
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
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: [{ translateX: -12 }, { translateY: -12 }],
                }}
              >
                <View className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary" />
                <View
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -4 }, { translateY: -4 }],
                  }}
                />
              </View>

              {/* Land Markers */}
              {mockLands.map((land, index) => (
                <TouchableOpacity
                  key={land.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedLand(land.id)}
                  className="absolute"
                  style={{
                    left: `${20 + (index % 3) * 30}%`,
                    top: `${25 + Math.floor(index / 3) * 30}%`,
                  }}
                >
                  <Animated.View
                    entering={FadeInDown.delay(index * 100).duration(500)}
                  >
                    <View
                      className={`w-12 h-12 rounded-full items-center justify-center shadow-lg ${
                        selectedLand === land.id
                          ? 'bg-primary scale-125'
                          : 'bg-white'
                      }`}
                    >
                      <FontAwesome5
                        name="map-marker-alt"
                        size={20}
                        color={
                          selectedLand === land.id ? whiteColor : primaryColor
                        }
                      />
                    </View>
                    {land.verified && (
                      <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary border-2 border-white items-center justify-center">
                        <MaterialIcons name="verified" size={10} color={whiteColor} />
                      </View>
                    )}
                  </Animated.View>
                </TouchableOpacity>
              ))}

              {/* Map Controls */}
              <View className="absolute bottom-6 right-5 gap-3">
                <TouchableOpacity className="w-12 h-12 rounded-xl bg-white shadow-lg items-center justify-center border border-border">
                  <FontAwesome5 name="location-arrow" size={18} color={primaryColor} />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 rounded-xl bg-white shadow-lg items-center justify-center border border-border">
                  <FontAwesome5 name="layer-group" size={18} color={gray500Color} />
                </TouchableOpacity>
              </View>

              {/* Map Legend */}
              <View className="absolute top-6 left-5 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border">
                <Text className="text-xs font-bold text-text mb-2">Legend</Text>
                <View className="flex-row items-center gap-2 mb-1">
                  <View className="w-3 h-3 rounded-full bg-primary" />
                  <Text className="text-xs text-text-secondary">Verified</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-gray-400" />
                  <Text className="text-xs text-text-secondary">Unverified</Text>
                </View>
              </View>
            </View>

            {/* Selected Land Card */}
            {selectedLand && (
              <Animated.View
                entering={FadeInUp.duration(400)}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl border-t-2 border-border"
              >
                {(() => {
                  const land = mockLands.find((l) => l.id === selectedLand);
                  if (!land) return null;
                  return (
                    <View className="p-5">
                      <View className="flex-row items-start justify-between mb-4">
                        <View className="flex-1">
                          <View className="flex-row items-center gap-2 mb-2">
                            <Text className="text-lg font-bold text-text">
                              {land.title}
                            </Text>
                            {land.verified && (
                              <View className="px-2 py-0.5 rounded-full bg-primary/10 flex-row items-center gap-1">
                                <MaterialIcons
                                  name="verified"
                                  size={12}
                                  color={primaryColor}
                                />
                                <Text className="text-xs font-bold text-primary">
                                  Verified
                                </Text>
                              </View>
                            )}
                          </View>
                          <View className="flex-row items-center gap-1.5 mb-1">
                            <FontAwesome5
                              name="map-marker-alt"
                              size={11}
                              color={gray500Color}
                            />
                            <Text className="text-sm text-text-secondary font-medium">
                              {land.location}
                            </Text>
                          </View>
                          <Text className="text-xs text-text-secondary">
                            {land.type}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => setSelectedLand(null)}
                          className="w-8 h-8 rounded-full bg-background-secondary items-center justify-center"
                        >
                          <FontAwesome5
                            name="times"
                            size={14}
                            color={gray500Color}
                          />
                        </TouchableOpacity>
                      </View>

                      <View className="h-32 rounded-2xl overflow-hidden mb-4">
                        <Image
                          source={{ uri: land.image }}
                          className="w-full h-full"
                          contentFit="cover"
                          transition={300}
                        />
                      </View>

                      <View className="flex-row justify-between items-center pt-4 border-t border-border">
                        <View>
                          <Text className="text-xs text-text-secondary mb-1">
                            Size
                          </Text>
                          <Text className="text-base text-text font-bold">
                            {land.size}
                          </Text>
                        </View>
                        <View className="items-end">
                          <Text className="text-xs text-text-secondary mb-1">
                            Price
                          </Text>
                          <Text className="text-xl font-extrabold text-primary">
                            {land.price}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        className="mt-4 bg-primary rounded-2xl py-4 items-center shadow-lg"
                      >
                        <Text className="text-white font-bold text-base">
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
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {mockLands.map((land, index) => (
              <Animated.View
                key={land.id}
                entering={FadeInUp.delay(index * 100).duration(500)}
                className="mb-4"
              >
                <Card
                  variant="elevated"
                  padding="none"
                  className="overflow-hidden shadow-md border border-border rounded-2xl"
                >
                  <View className="h-44 relative">
                    <Image
                      source={{ uri: land.image }}
                      className="w-full h-full"
                      contentFit="cover"
                      transition={300}
                    />
                    {land.verified && (
                      <View className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary/95 shadow-lg">
                        <View className="flex-row items-center gap-1">
                          <MaterialIcons name="verified" size={11} color={whiteColor} />
                          <Text className="text-xs text-white font-bold">Verified</Text>
                        </View>
                      </View>
                    )}
                  </View>

                  <CardContent className="p-4">
                    <Text className="text-base font-bold text-text mb-1">
                      {land.title}
                    </Text>
                    <View className="flex-row items-center gap-1.5 mb-3">
                      <FontAwesome5
                        name="map-marker-alt"
                        size={10}
                        color={gray500Color}
                      />
                      <Text className="text-xs text-text-secondary font-medium">
                        {land.location}
                      </Text>
                    </View>
                    <View className="flex-row justify-between items-center pt-3 border-t border-border">
                      <View>
                        <Text className="text-xs text-text-secondary mb-0.5">
                          Size
                        </Text>
                        <Text className="text-sm text-text font-bold">
                          {land.size}
                        </Text>
                      </View>
                      <View className="items-end">
                        <Text className="text-xs text-text-secondary mb-0.5">
                          Price
                        </Text>
                        <Text className="text-lg font-extrabold text-primary">
                          {land.price}
                        </Text>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              </Animated.View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
