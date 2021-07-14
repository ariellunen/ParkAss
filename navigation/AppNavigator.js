import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ParkAssNavigation, AuthNavigator } from './ParkAssNavigation';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';

const AppNavigator = () => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  const isSaved = useSelector((state) => !!state.auth.token);
  console.log(isSaved)
  // const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const [isAuth, setIsAuth] = useState(false);
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  };
  return (
    <NavigationContainer>
      {isAuth && isSaved && <ParkAssNavigation />}
      {!isAuth && !isSaved && <AuthNavigator />}
      {/* {!isAuth && !didTryAutoLogin && <StartupScreen />} */}
    </NavigationContainer>
  );
};
export default AppNavigator;
