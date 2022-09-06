import React from 'react';
import './button.css';

const Button = ({onClick, text}) => {
  return (
    <button className="buttonStyle" onClick={onClick}>
      <h1>{text}</h1>
    </button>
  );
};

export default Button;
