import 'react-native-gesture-handler';
import * as React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import reportReducer from './store/reducers/report';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';


const rootReducer = combineReducers({
  auth: authReducer,
  report: reportReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const hideKeyBoard = () => {
  Keyboard.dismiss();
}
export default function App() {
  return (
    <TouchableWithoutFeedback onPress={hideKeyBoard}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </TouchableWithoutFeedback>

  );
}
