import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  I18nManager,
  Image,
} from 'react-native';
I18nManager.forceRTL(true);
import { useDispatch } from 'react-redux';
import Input from '../components/UI/Input';
import * as authActions from '../store/action/auth';
import { color } from 'react-native-reanimated';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const AuthScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'OK' }]);
    }
  }, [error]);
  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = authActions.login(formState.inputValues.email, formState.inputValues.password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="מייל:"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="אנא הזן כתובת מייל תקנית."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="סיסמא:"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="אנא הזן סיסמה חוקית."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={color.primary} />
            ) : (
              <Button title={isSignup ? 'הרשם' : 'התחבר'} color="darkgrey" onPress={authHandler} />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`החלף ל- ${isSignup ? 'התחבר' : 'הרשם'}`}
              color="gainsboro"
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4E67BB',
  },
  logo: {
    marginTop: 100,
    width: '90%',
    height: '20%',
    resizeMode: 'contain',
  },
  authContainer: {
    width: '90%',
    // maxWidth: 400,
    // maxHeight: 400,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 40,
    borderRadius: 50,
  },
});
export default AuthScreen;
