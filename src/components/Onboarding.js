import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

import AuthProvider from 'providers/auth';
import GradientButton from 'components/GradientButton';
import Carousel from './Carousel';
import { IS_SMALLER } from 'styles/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  slider: {
    flex: 1,
    position: 'relative',
  },
  start: {
    paddingVertical: 24,
    borderRadius: 0,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  tabText: {
    textAlign: 'center',
    maxWidth: IS_SMALLER ? "90%": "72%",
    marginTop: 14,
  },
});

const slides = [
  {
    image: require('img/onboarding-1.jpg'),
    content: (
      <Layout style={styles.textWrapper}>
        <Text category="h1">Ready</Text>
        <Text category="p1" style={styles.tabText}>
          Take control of your portfolio, your business and your life with our
          property management app
        </Text>
      </Layout>
    ),
  },
  {
    image: require('img/onboarding-2.jpg'),
    content: (
      <Layout style={styles.textWrapper}>
        <Text category="h1">Set</Text>
        <Text category="p1" style={styles.tabText}>
          Track budgets, rent, vendor payments and more with powerful reporting.
        </Text>
      </Layout>
    ),
  },
  {
    image: require('img/onboarding-3.jpg'),
    content: (
      <Layout style={styles.textWrapper}>
        <Text category="h1">Go</Text>
        <Text category="p1" style={styles.tabText}>
          Find better tenants with comprehensive screenings and applications.
        </Text>
      </Layout>
    ),
  },
];

const Onboarding = ({navigation}) => {
  const {setOnboarding} = React.useContext(AuthProvider);

  const onStart = React.useCallback(() => {
    setOnboarding(true);
  }, [setOnboarding]);
  return (
    <>
      <Layout style={styles.container}>
        <Carousel slides={slides} style={styles.slider} />
        <GradientButton status="primary" style={styles.start} onPress={onStart}>
          Get Started
        </GradientButton>
      </Layout>
    </>
  );
};

export default Onboarding;
