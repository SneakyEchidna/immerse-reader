import { BOOK_LOADED } from '../actions/actionTypes';

const initialState = {
  userName: null,
  uid: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_LOCATION:
    //   return { ...state, location: action.payload };
    default:
      return state;
  }
};
export const getUid = state => state.user.uid;
export default userReducer;
