import React from 'react';
import PropTypes from 'prop-types';
import {useField} from 'formik';
import ErrorText from '@components/text/ErrorText';

const FormGroup = (props) => {
  const [field, meta] = useField(props);

  let render;
  if(props.children) {
    render = (
      <>{props.children}</>
    )
  } else {
    render = (
      <>
        <input type="text" id={props.name} {...field} {...props} placeholder={props.name} className="input"/>
        {meta.touched && meta.error ? (
          <ErrorText>{meta.error}</ErrorText>
        ) : null}
      </>
    )
  }

  return (
    <div className={"mb-3 pt-0 " + props.className}>
      <label htmlFor="name" className="capitalize block mb-2">{props.name}</label>
      {render}
    </div>
  );
};

FormGroup.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.any,
  onChange: PropTypes.func
}

export default FormGroup;
