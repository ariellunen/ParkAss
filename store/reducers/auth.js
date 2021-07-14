import { AUTHENTICATE, LOGOUT } from '../action/auth';

const initialState = {
  token: null,
  userId: null,
  // didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  console.log('state - ', state);
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.userData.token,
        userId: action.userData.userId,
        // ...state,
        // didTryAutoLogin: true,
      };
    // case SET_DID_TRY_AL:
    //   return {
    //     ...state,
    //     didTryAutoLogin: true,
    //   };
    case LOGOUT:
      return {
        ...initialState,
        // didTryAutoLogin: true,
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
