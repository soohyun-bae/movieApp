import React from "react";
import { Link } from "react-router-dom";
import "./ButtonsStyle.scss";

const LogoButton = ({ to, className, children }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default LogoButton;
