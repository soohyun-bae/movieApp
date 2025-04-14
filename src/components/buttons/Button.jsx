import React from 'react';
import './ButtonsStyle.scss'
import classNames from 'classnames';

const Button = ({onClick, size, color, children}) => {
  return (
    <button onClick={onClick} className={classNames("Button", size, color)}>
      {children}
    </button>
  );
};

export default Button;