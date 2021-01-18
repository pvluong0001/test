import React from 'react';

const ErrorText = (props) => {
  return (
    <div className={"text-red-500 mt-1 text-sm capitalize " + props.className}>
      {props.children}
    </div>
  );
};

export default ErrorText;
