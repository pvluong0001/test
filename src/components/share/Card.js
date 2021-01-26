import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <div {...props}>
      <h1 className="text-2xl font-bold flex justify-between">
        <span>{props.title}</span>
        {props.asideTitle}
      </h1>
      {props.children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  asideTitle: PropTypes.any
}

export default Card;
