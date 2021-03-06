import AsyncStorage from '@react-native-async-storage/async-storage';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const AUTHENTICATE = 'AUTHENTICATE';
export const setDidTryAL = () => ({ type: SET_DID_TRY_AL });
export const authenticate = (userId, token) => (dispatch) => {
  dispatch({ type: AUTHENTICATE, userId, token });
};
export const signup = (email, password) => async (dispatch) => {
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB907390BLI_mPxruGHafJHOeb-XjycbFo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    },
  );
  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wront!';
    if (errorId === 'EMAIL_EXISTS') {
      message = 'This email exists already!';
    }
    throw new Error(message);
  }
  const resData = await response.json();
  dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
  const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
  saveDataStorage(resData.idToken, resData.localId, expirationDate);
};
export const login = (email, password) => async (dispatch) => {
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB907390BLI_mPxruGHafJHOeb-XjycbFo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    },
  );
  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wront!';
    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email could not be found!';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid!';
    }
    throw new Error(message);
  }
  const resData = await response.json();
  dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
  const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
  saveDataStorage(resData.idToken, resData.localId, expirationDate);
};
const saveDataStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
    }),
  );
};
export const logout = () => ({ type: LOGOUT });
export const googleLogIn = (userId, token, image) => ({
  type: AUTHENTICATE,
  userData: { userId, token, image },
});
