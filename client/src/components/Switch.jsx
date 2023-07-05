import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCardSocialUpdate } from "../redux/action/card";

const ToggleSwitch = ({ content }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch(
      updateCardSocialUpdate(
        {
          _id: content._id,
          active: !content.active,
        },
        id
      )
    );
  };

  return (
    <label className={`toggle-switch ${content.active ? "on" : "off"}`}>
      <input type="checkbox" checked={content.active} onChange={toggleSwitch} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
