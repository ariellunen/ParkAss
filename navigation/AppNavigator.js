import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ParkAssNavigation, AuthNavigator } from './ParkAssNavigation';
import firebase from 'firebase/app';

const AppNavigator = () => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  // const isAuth = useSelector((state) => !!state.auth.token);
  // const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const [isAuth, setIsAuth] = useState();
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
      {isAuth && <ParkAssNavigation />}
      {!isAuth && <AuthNavigator />}
      {/* {!isAuth && !didTryAutoLogin && <StartupScreen />} */}
    </NavigationContainer>
  );
};
export default AppNavigator;
