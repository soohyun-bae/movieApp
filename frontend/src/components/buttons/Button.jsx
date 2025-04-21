import classNames from "classnames";
import React from "react";
import "./ButtonsStyle.scss";

const Button = ({ onClick, size, color, children }) => {
  return (
    <button onClick={onClick} className={classNames("Button", size, color)}>
      {children}
    </button>
  );
};

export default Button;
