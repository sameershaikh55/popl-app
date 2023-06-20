import React from "react";

const Checkbox = ({ label, value, handleChange }) => {
  return (
    <div className="checkbox__wrapper">
      <label className="checkbox">
        <span className="label">{label}</span>
        <input
          type="checkbox"
          className="checkbox__input"
          checked={value}
          onChange={handleChange}
        />
        <span className="checkbox__check">
          <svg xmlns="http://www.w3.org/2000/svg" className="checkbox__svg">
            <path d="M 1 7 L 4 10 L 10 2" fill="none" />
          </svg>
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
