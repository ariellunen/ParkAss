import 'react-native-gesture-handler';
import * as React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import reportReducer from './store/reducers/report';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { TouchableWithoutFeedback, Keyboard, I18nManager } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/storage';
require('firebase/storage');
require('firebase/database');
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyB907390BLI_mPxruGHafJHOeb-XjycbFo',
    authDomain: 'parkass.firebaseapp.com',
    databaseURL: 'https://parkass-default-rtdb.firebaseio.com',
    projectId: 'parkass',
    storageBucket: 'parkass.appspot.com',
    messagingSenderId: '212784895158',
    appId: '1:212784895158:web:bc65487af9b35aea718217',
    measurementId: 'G-M8BJ7QY64L',
  });
}
firebase.storage().ref();
I18nManager.forceRTL(true);
const rootReducer = combineReducers({
  auth: authReducer,
  report: reportReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const hideKeyBoard = () => {
  Keyboard.dismiss();
};
export default function App() {
  return (
    <TouchableWithoutFeedback onPress={hideKeyBoard}>
      <Provider store={store}>
        {/* <LinearGradient colors={['red', 'yellow', 'green']}> */}
        <AppNavigator />
        {/* </LinearGradient> */}
      </Provider>
    </TouchableWithoutFeedback>
  );
}
