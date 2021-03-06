import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { element } from 'prop-types';

const Background = ({ children }) => (
  <LinearGradient colors={['#E6E9F5', '#EEECE0']} style={styles.container}>
    <SafeAreaView style={styles.container}>{children}</SafeAreaView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Background.propTypes = {
  children: element,
};

export default Background;
