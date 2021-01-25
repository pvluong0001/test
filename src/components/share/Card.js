import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{props.title}</h1>
      {props.children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string
}

export default Card;
