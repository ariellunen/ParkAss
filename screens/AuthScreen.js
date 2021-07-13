import React from 'react';
import { useDispatch } from 'react-redux';
import Background from '../components/Background';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase/app';
import * as authActions from '../store/action/auth';
import { IconButton } from 'react-native-paper';
const AuthScreen = () => {
  const dispatch = useDispatch();
  const isUserEqual = (googleUser, firebaseUser) => {
    console.log('googleUser', googleUser);
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  const onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken,
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                });
            }
            console.log('idToken', googleUser.idToken);
            console.log(result.user.uid);
            dispatch(authActions.googleLogIn(result.user.uid, googleUser.idToken));
            console.log('user signed in');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: '212784895158-2k0boqlvgqbpb14r2d2cn8nlav9s1393.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };
  return (
    <Background>
      <View style={styles.container}>
        <Image source={require('../assets/logo11.png')} style={styles.logo} />
      </View>
      <TouchableOpacity onPress={signInWithGoogleAsync}>
        <View style={styles.button}>
          <IconButton icon="google" size={45} color="white" style={styles.googleLogo} />
          <Text style={styles.textButton}>התחבר\י</Text>
        </View>
      </TouchableOpacity>
    </Background>
  );
};
const styles = StyleSheet.create({
  button: {
    bottom: 30,
    backgroundColor: '#000',
    opacity: 0.3,
    width: '100%',
    height: 70,
    // display: 'flex',
    position: 'relative',
  },
  logo: {
    marginTop: 150,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 30,
    position: 'absolute',
    right: '60%',
    margin: 11,
  },
  googleLogo: {
    marginLeft: '80%',
    margin: 1,
  },
});
export default AuthScreen;
