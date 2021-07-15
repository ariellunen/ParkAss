import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ParkAssNavigation, AuthNavigator } from './ParkAssNavigation';
import { useSelector } from 'react-redux';

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.userId);
  const image = useSelector((state) => state.auth.image);
  return (
    <NavigationContainer>
      {isAuth && <ParkAssNavigation image={image} />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};
export default AppNavigator;
