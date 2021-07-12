import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/Colors';
import { element } from 'prop-types';

const Background = ({ children }) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      //   justifyContent: 'center',
      //   backgroundColor: colors.primary,
    }}
  >
    <LinearGradient
      // Background Linear Gradient
      colors={['transparent', colors.primary]}
    >
      {children}
    </LinearGradient>
  </View>
);

Background.propTypes = {
  children: element,
};

export default Background;
