import "react-native-gesture-handler";
import * as React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import reportReducer from "./store/reducers/report";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import firebase from "firebase/app";
import "firebase/storage";
require("firebase/storage");
require("firebase/database");
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBeLRKGGRtYJUXpLFTc3sXpm6rUh3qa1tw",
    authDomain: "parkass-52f92.firebaseapp.com",
    projectId: "parkass-52f92",
    storageBucket: "parkass-52f92.appspot.com",
    messagingSenderId: "991818465397",
    appId: "1:991818465397:web:8757945e999a226863f83c",
    measurementId: "G-7FJ8CBM618",
  });
}
firebase.storage().ref();

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
        <AppNavigator />
      </Provider>
    </TouchableWithoutFeedback>
  );
}
