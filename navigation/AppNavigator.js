import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ParkAssNavigation, AuthNavigator } from './ParkAssNavigation';
// import firebase from 'firebase/app';
import { useSelector } from 'react-redux';
// import * as authActions from '../store/action/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.userId);
  const valueA = useSelector((state) => state.auth);

  console.log('isAuth', isAuth);
  console.log('Auth state app nav', valueA);

  // useEffect(() => {
  //   checkIfLoggedIn();
  // }, []);
  // // const isAuth = useSelector((state) => !!state.auth.token);
  // const isAuth = useSelector((state) => !!state.auth.token);
  // console.log(isSaved);
  // console.log("isAuth",isAuth);
  // // const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  // const [isAuth, setIsAuth] = useState(false);
  // const checkIfLoggedIn = () => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setIsAuth(true);
  //     } else {
  //       setIsAuth(false);
  //     }
  //   });
  // };
  return (
    <NavigationContainer>
      {isAuth && <ParkAssNavigation />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};
export default AppNavigator;
