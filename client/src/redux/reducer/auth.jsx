import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  REGISTERATION_REQUEST,
  REGISTERATION_SUCCESS,
  REGISTERATION_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  USER_DEVICES_REQUEST,
  USER_DEVICES_SUCCESS,
  USER_DEVICES_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_RESET,
} from "../type/auth";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTERATION_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        profileUpdateLoading: true,
      };
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTERATION_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        profileUpdateLoading: false,
        profileUpdate: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case REGISTERATION_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case PROFILE_UPDATE_FAIL:
      return {
        ...state,
        profileUpdateLoading: false,
        profileUpdateError: action.payload,
      };
    case PROFILE_UPDATE_RESET:
      return {
        ...state,
        profileUpdate: null,
        profileUpdateError: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        message: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDevicesReducer = (
  state = { registered: [], stolen: [] },
  action
) => {
  switch (action.type) {
    case USER_DEVICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DEVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: action.payload.registered,
        stolen: action.payload.stolen,
      };
    case USER_DEVICES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
