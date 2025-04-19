import React from "react";
import "./InputsStyle.scss";

const ValidationInput = ({ type, value, label, onChange }) => {
  return (
    <div className="validaton-input-container">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="validation-input"
      />
    </div>
  );
};

export default ValidationInput;
