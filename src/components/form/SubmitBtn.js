import React from 'react';

const SubmitBtn = (props) => {
  return (
    <button type="submit" disabled={!props.isValid} className={"btn:primary-sm " + (props.isValid ? '' : 'not-allow')}>Submit</button>
  );
};

export default SubmitBtn;
