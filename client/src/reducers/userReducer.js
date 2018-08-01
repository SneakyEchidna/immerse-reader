import { SET_USER } from '../actions/actionTypes';

const initialState = {
  userName: null,
  uid: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userName: action.payload.userName,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};
export const getUid = state => state.user.uid;
export default userReducer;
