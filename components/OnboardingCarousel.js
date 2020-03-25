import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
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
      <OnboardingOne style={styles.image} />
      <Text style={human.body}>{data.paragraph}</Text>
    </View>
  );
  
  return (
    <Carousel
      pagination={Pagination}
      renderItem={renderItem}
      data={ONBOARDING_CAROUSEL_ENTRIES}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: width - (theme.gutters * 2),
    paddingTop: theme.gutters,
    paddingBottom: theme.gutters * 2
  },
  h1: {
    ...theme.typography.h1,
  },
  image: {
    width: width - (theme.gutters * 2),
    marginVertical: theme.gutters
  }
});

export default OnboardingCarousel;