import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ALERT
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: []
      };
    case SET_ALERT:
      return {
        ...state,
        msg: action.payload.msg,
        type: action.payload.type
      };
    default:
      return state;
  }
};
