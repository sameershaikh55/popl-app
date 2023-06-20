import {
  GET_ALL_CARDS_FAIL,
  GET_ALL_CARDS_REQUEST,
  GET_ALL_CARDS_SUCCESS,
  GET_CARD_FAIL,
  GET_CARD_REQUEST,
  GET_CARD_SUCCESS,
  UPDATE_CARD_FAIL,
  UPDATE_CARD_REQUEST,
  UPDATE_CARD_SUCCESS,
  CLEAR_ERRORS,
} from "../type/card";

export const cardReducer = (state = { cards: [], card: {} }, action) => {
  switch (action.type) {
    case GET_ALL_CARDS_REQUEST:
    case GET_CARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: action.payload,
      };
    case GET_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        card: action.payload,
      };
    case GET_ALL_CARDS_FAIL:
    case GET_CARD_FAIL:
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
