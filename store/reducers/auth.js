import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../action/auth';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false
};

export default (state = initialState, action) => {
  console.log(state.token);
  console.log("userId",state.userId);

  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
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
