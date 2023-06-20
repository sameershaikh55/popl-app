import {
  CLEAR_ERRORS,
  GET_ALL_CARDS_FAIL,
  GET_ALL_CARDS_REQUEST,
  GET_ALL_CARDS_SUCCESS,
  GET_CARD_FAIL,
  GET_CARD_REQUEST,
  GET_CARD_SUCCESS,
} from "../type/card";
import axios from "axios";

export const allCards = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CARDS_REQUEST });

    const { data } = await axios.get(`/api/card/all`);

    dispatch({
      type: GET_ALL_CARDS_SUCCESS,
      payload: data.cards,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CARDS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCard = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CARD_REQUEST });

    const { data } = await axios.get(`/api/card/${id}`);

    dispatch({
      type: GET_CARD_SUCCESS,
      payload: data.card,
    });
  } catch (error) {
    dispatch({
      type: GET_CARD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCard = (updateData, id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CARD_REQUEST });

    const { data } = await axios.patch(`/api/card/${id}`, updateData);

    dispatch({
      type: GET_CARD_SUCCESS,
      payload: data.card,
    });
  } catch (error) {
    dispatch({
      type: GET_CARD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCardPicture = (updateData, name, id) => async (dispatch) => {
  try {
    window.location.reload(true);

    dispatch({ type: GET_CARD_REQUEST });

    let data;

    if (name === "cardDP") {
      data = await axios.patch(`/api/card/profile/${id}`, updateData);
    } else if (name === "coverDP") {
      data = await axios.patch(`/api/card/cover/${id}`, updateData);
    } else if (name === "companyDP") {
      data = await axios.patch(`/api/card/company/${id}`, updateData);
    } else if (name === "codeLogo") {
      data = await axios.patch(`/api/card/codeLogo/${id}`, updateData);
    } else if (name === "profile") {
      data = await axios.patch(`/api/card/sign/profile/${id}`, updateData);
    } else if (name === "company") {
      data = await axios.patch(`/api/card/sign/company/${id}`, updateData);
    } else if (name === "popCode") {
      data = await axios.patch(`/api/card/sign/popcode/${id}`, updateData);
    } else if (name === "VBPicture") {
      data = await axios.patch(`/api/card/vb/picture/${id}`, updateData);
    }

    dispatch({
      type: GET_CARD_SUCCESS,
      payload: data.data.card,
    });
  } catch (error) {
    dispatch({
      type: GET_CARD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCardVBColor = (updateData, id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CARD_REQUEST });

    const { data } = await axios.patch(`/api/card/vb/color/${id}`, updateData);

    dispatch({
      type: GET_CARD_SUCCESS,
      payload: data.card,
    });
  } catch (error) {
    dispatch({
      type: GET_CARD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCardSocial = (updateData, id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CARD_REQUEST });

    const { data } = await axios.post(`/api/card/social/${id}`, updateData);

    dispatch({
      type: GET_CARD_SUCCESS,
      payload: data.card,
    });
  } catch (error) {
    dispatch({
      type: GET_CARD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCardSocialUpdate = (updateData, id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CARD_REQUEST });

    const { data } = await axios.post(
      `/api/card/social/update/${id}`,
      updateData
    );

    dispatch({
      type: GET_CARD_SUCCESS,
      payload: data.card,
    });
  } catch (error) {
    dispatch({
      type: GET_CARD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
