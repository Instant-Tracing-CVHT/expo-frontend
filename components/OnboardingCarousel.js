import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-x-carousel';
import { human } from 'react-native-typography'
import theme from '../assets/theme';
import OnboardingOne from '../assets/onboarding/1.svg';
import { ONBOARDING_CAROUSEL_ENTRIES } from '../content/onboarding';

const { width } = Dimensions.get('window');

const OnboardingCarousel = () => {
  const renderItem = data => (
    <View key={data.title} style={styles.item}>
      <Text style={styles.h1}>{data.title}</Text>
      <OnboardingOne />
      <Text style={human.body}>{data.paragraph}</Text>
    </View>
  );
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Carousel
        pagination={Pagination}
        renderItem={renderItem}
        data={ONBOARDING_CAROUSEL_ENTRIES}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  item: {
    width: width,
    padding: theme.gutters,
    paddingBottom: theme.gutters * 2
  },
  h1: {
    ...theme.typography.h1,
  },
  image: {
    width: width - (theme.gutters * 2),
    // height: 100,
    marginVertical: theme.gutters
  }
});

export default OnboardingCarousel;