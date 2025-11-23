import { Card, CardContent } from '@/components/ui';
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

const featuredListing = {
  id: 'featured-1',
  title: 'Premium Olive Grove Estate',
  location: 'Ramallah, Palestine',
  size: '5,200 m²',
  price: '$280,000',
  image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
  type: 'Agricultural',
};

const newListings = [
  {
    id: '1',
    title: 'Olive Grove Land',
    location: 'Ramallah',
    size: '2,400 m²',
    price: '$120,000',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
    type: 'Agricultural',
    added: '2 hours ago',
  },
  {
    id: '2',
    title: 'Residential Plot',
    location: 'Nablus',
    size: '1,800 m²',
    price: '$95,000',
    image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800&h=600&fit=crop',
    type: 'Residential',
    added: '5 hours ago',
  },
  {
    id: '3',
    title: 'Agricultural Land',
    location: 'Hebron',
    size: '3,200 m²',
    price: '$150,000',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop',
    type: 'Agricultural',
    added: '1 day ago',
  },
  {
    id: '4',
    title: 'Valley View Land',
    location: 'Bethlehem',
    size: '2,800 m²',
    price: '$126,000',
    image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&h=600&fit=crop',
    type: 'Agricultural',
    added: '2 days ago',
  },
];

const trendingListings = [
  {
    id: 'trend-1',
    title: 'Mountain View Plot',
    location: 'Jerusalem',
    size: '2,100 m²',
    price: '$180,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    views: 856,
  },
  {
    id: 'trend-2',
    title: 'Farm Land',
    location: 'Bethlehem',
    size: '4,500 m²',
    price: '$200,000',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    views: 743,
  },
];

export default function HomeScreen() {
  const primaryColor = getPrimaryColor();
  const whiteColor = getWhiteColor();
  const gray500Color = getGray500Color();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(600)} className="px-6 pt-6 pb-8">
          <View className="flex-row justify-between items-start mb-6">
            <View className="flex-1">
              <Text className="text-[11px] text-text-secondary mb-2 font-semibold uppercase tracking-widest">
                Welcome back
              </Text>
              <Text className="text-3xl font-black text-text leading-tight">
                Discover Your{'\n'}Perfect Land
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center shadow-sm"
            >
              <FontAwesome5 name="bell" size={18} color={primaryColor} />
              <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
            </TouchableOpacity>
          </View>

          {/* Enhanced Search */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/(home)/search')}
            className="bg-background-secondary rounded-2xl p-5 flex-row items-center border border-border shadow-sm"
          >
            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-3">
              <FontAwesome5 name="search" size={16} color={primaryColor} />
            </View>
            <Text className="text-[15px] text-text-secondary font-medium flex-1">
              Search location, size, price...
            </Text>
            <View className="w-10 h-10 rounded-xl bg-white border border-border items-center justify-center">
              <MaterialIcons name="tune" size={20} color={gray500Color} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Categories */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          className="mb-8"
        >
          <View className="px-6 mb-4">
            <Text className="text-lg font-black text-text">
              Categories
            </Text>
            <Text className="text-xs text-text-secondary mt-1">
              Find your ideal property type
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 24, gap: 14 }}
          >
            {categories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInRight.delay(150 + index * 50).duration(500)}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(category.id)}
                  className={`w-[120px] h-[130px] rounded-3xl p-4 items-center justify-center shadow-md ${
                    selectedCategory === category.id
                      ? 'bg-primary'
                      : 'bg-background-secondary border-2 border-border'
                  }`}
                >
                  <View
                    className={`w-14 h-14 rounded-2xl items-center justify-center mb-3 ${
                      selectedCategory === category.id
                        ? 'bg-white/20'
                        : 'bg-white shadow-sm'
                    }`}
                  >
                    <FontAwesome5
                      name={category.icon as any}
                      size={20}
                      color={
                        selectedCategory === category.id
                          ? whiteColor
                          : primaryColor
                      }
                    />
                  </View>
                  <Text
                    className={`text-[13px] font-bold text-center mb-1 ${
                      selectedCategory === category.id
                        ? 'text-white'
                        : 'text-text'
                    }`}
                    numberOfLines={1}
                  >
                    {category.name}
                  </Text>
                  <Text
                    className={`text-[11px] font-semibold ${
                      selectedCategory === category.id
                        ? 'text-white/90'
                        : 'text-text-secondary'
                    }`}
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
          className="mb-8 px-6"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg font-black text-text">
                Featured Property
              </Text>
              <Text className="text-xs text-text-secondary mt-1">
                Premium selection
              </Text>
            </View>
            <View className="px-3 py-1.5 rounded-full bg-primary/10">
              <Text className="text-[10px] text-primary font-bold">⭐ BEST PICK</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.95}>
            <Card
              variant="elevated"
              padding="none"
              className="overflow-hidden rounded-3xl shadow-lg"
            >
              <View className="h-64 relative">
                <Image
                  source={{ uri: featuredListing.image }}
                  className="w-full h-full"
                  contentFit="cover"
                  transition={300}
                />
                <View className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                
                {/* Type Badge */}
                <View className="absolute top-4 left-4">
                  <View className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-md">
                    <Text className="text-[11px] text-text font-black">
                      {featuredListing.type}
                    </Text>
                  </View>
                </View>

                {/* Bookmark Icon */}
                <View className="absolute top-4 right-4">
                  <View className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm items-center justify-center shadow-md">
                    <FontAwesome5 name="heart" size={14} color={primaryColor} />
                  </View>
                </View>

                {/* Content */}
                <View className="absolute bottom-0 left-0 right-0 p-5">
                  <Text className="text-2xl font-black text-white mb-2" numberOfLines={1}>
                    {featuredListing.title}
                  </Text>
                  <View className="flex-row items-center gap-2 mb-4">
                    <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center">
                      <FontAwesome5 name="map-marker-alt" size={11} color={whiteColor} />
                    </View>
                    <Text className="text-sm text-white/95 font-bold">
                      {featuredListing.location}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-4">
                    <View className="flex-1">
                      <Text className="text-[10px] text-white/70 mb-1 font-semibold">Size</Text>
                      <Text className="text-base text-white font-black">
                        {featuredListing.size}
                      </Text>
                    </View>
                    <View className="h-8 w-px bg-white/30 mx-3" />
                    <View className="flex-1 items-end">
                      <Text className="text-[10px] text-white/70 mb-1 font-semibold">Price</Text>
                      <Text className="text-xl font-black text-white">
                        {featuredListing.price}
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
          className="mb-8"
        >
          <View className="flex-row items-center justify-between mb-4 px-6">
            <View>
              <Text className="text-lg font-black text-text">
                New Listings
              </Text>
              <Text className="text-xs text-text-secondary mt-1">
                Recently added properties
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-1">
              <Text className="text-sm font-bold text-primary">See All</Text>
              <FontAwesome5 name="chevron-right" size={12} color={primaryColor} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 24, gap: 14 }}
          >
            {newListings.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInRight.delay(350 + index * 80).duration(500)}
              >
                <TouchableOpacity activeOpacity={0.95}>
                  <Card
                    variant="elevated"
                    padding="none"
                    className="overflow-hidden rounded-2xl w-64 shadow-md"
                  >
                    <View className="h-40 relative">
                      <Image
                        source={{ uri: item.image }}
                        className="w-full h-full"
                        contentFit="cover"
                        transition={300}
                      />
                      <View className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                      <View className="absolute top-3 right-3">
                        <View className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm items-center justify-center shadow-sm">
                          <FontAwesome5 name="heart" size={12} color={gray500Color} />
                        </View>
                      </View>
                      <View className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                        <Text className="text-[10px] text-white font-bold">
                          🕐 {item.added}
                        </Text>
                      </View>
                    </View>
                    <CardContent className="p-4">
                      <Text className="text-sm font-black text-text mb-1.5" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <View className="flex-row items-center gap-1.5 mb-3">
                        <FontAwesome5
                          name="map-marker-alt"
                          size={10}
                          color={gray500Color}
                        />
                        <Text className="text-xs text-text-secondary font-semibold flex-1" numberOfLines={1}>
                          {item.location}
                        </Text>
                      </View>
                      <View className="flex-row items-center pt-3 border-t border-border">
                        <View className="flex-1">
                          <Text className="text-[10px] text-text-secondary mb-1 font-semibold">
                            Size
                          </Text>
                          <Text className="text-xs text-text font-black">
                            {item.size}
                          </Text>
                        </View>
                        <View className="h-8 w-px bg-border mx-3" />
                        <View className="flex-1 items-end">
                          <Text className="text-[10px] text-text-secondary mb-1 font-semibold">
                            Price
                          </Text>
                          <Text className="text-sm font-black text-primary">
                            {item.price}
                          </Text>
                        </View>
                      </View>
                    </CardContent>
                  </Card>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Trending */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(600)}
          className="mb-8 px-6"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg font-black text-text">
                Trending Now
              </Text>
              <Text className="text-xs text-text-secondary mt-1">
                🔥 Most viewed this week
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-1">
              <Text className="text-sm font-bold text-primary">See All</Text>
              <FontAwesome5 name="chevron-right" size={12} color={primaryColor} />
            </TouchableOpacity>
          </View>
          {trendingListings.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInUp.delay(450 + index * 100).duration(500)}
              className="mb-4"
            >
              <TouchableOpacity activeOpacity={0.95}>
                <Card
                  variant="elevated"
                  padding="none"
                  className="overflow-hidden rounded-2xl shadow-md"
                >
                  <View className="flex-row h-36">
                    <View className="w-36 h-full relative">
                      <Image
                        source={{ uri: item.image }}
                        className="w-full h-full"
                        contentFit="cover"
                        transition={300}
                      />
                      <View className="absolute top-2 left-2 px-2 py-1 rounded-full bg-primary shadow-sm">
                        <Text className="text-[9px] text-white font-black">TRENDING</Text>
                      </View>
                    </View>
                    <View className="flex-1 p-4">
                      <Text className="text-sm font-black text-text mb-1.5" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <View className="flex-row items-center gap-1.5 mb-2">
                        <FontAwesome5
                          name="map-marker-alt"
                          size={10}
                          color={gray500Color}
                        />
                        <Text className="text-xs text-text-secondary font-semibold flex-1" numberOfLines={1}>
                          {item.location}
                        </Text>
                      </View>
                      <View className="mb-3">
                        <View className="px-2.5 py-1 rounded-full bg-primary/10 self-start">
                          <View className="flex-row items-center gap-1.5">
                            <FontAwesome5 name="eye" size={10} color={primaryColor} />
                            <Text className="text-[10px] text-primary font-bold">
                              {item.views.toLocaleString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View className="flex-row items-center pt-2 border-t border-border mt-auto">
                        <View className="flex-1">
                          <Text className="text-[10px] text-text-secondary mb-0.5 font-semibold">
                            Size
                          </Text>
                          <Text className="text-xs text-text font-black">
                            {item.size}
                          </Text>
                        </View>
                        <View className="h-8 w-px bg-border mx-2" />
                        <View className="flex-1 items-end">
                          <Text className="text-[10px] text-text-secondary mb-0.5 font-semibold">
                            Price
                          </Text>
                          <Text className="text-sm font-black text-primary">
                            {item.price}
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
          className="px-6 mb-6"
        >
          <View className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-6 border-2 border-primary/20 shadow-sm">
            <View className="flex-row items-center mb-5">
              <View className="w-10 h-10 rounded-2xl bg-primary/20 items-center justify-center mr-3">
                <FontAwesome5 name="chart-line" size={16} color={primaryColor} />
              </View>
              <Text className="text-base font-black text-text">
                Market Overview
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center bg-white/50 rounded-2xl py-4">
                <Text className="text-2xl font-black text-primary mb-1.5">
                  62
                </Text>
                <Text className="text-[10px] text-text-secondary text-center font-bold px-2">
                  Total Properties
                </Text>
              </View>
              <View className="w-3" />
              <View className="flex-1 items-center bg-white/50 rounded-2xl py-4">
                <Text className="text-2xl font-black text-primary mb-1.5">
                  48
                </Text>
                <Text className="text-[10px] text-text-secondary text-center font-bold px-2">
                  Available Lands
                </Text>
              </View>
              <View className="w-3" />
              <View className="flex-1 items-center bg-white/50 rounded-2xl py-4">
                <Text className="text-2xl font-black text-primary mb-1.5">
                  $95K
                </Text>
                <Text className="text-[10px] text-text-secondary text-center font-bold px-2">
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