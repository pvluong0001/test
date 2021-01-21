import React from 'react';
import PropTypes from 'prop-types';
import {useField} from 'formik';
import ErrorText from '@components/text/ErrorText';

const FormGroup = (props) => {
  const [field, meta] = useField(props);
  const extraLabelClass = props.required ? 'require' : '';

  let render;
  if (props.children) {
    render = (
      <>
        <label htmlFor="name"
               className={"form-group-label " + extraLabelClass}>{props.name}</label>
        {props.children}
      </>
    );
  } else {
    render = (
      <>
        {
          props.type === 'textarea' ? (
            <>
              <label htmlFor="name"
                     className={"form-group-label " + extraLabelClass}>{props.name}</label>
              <textarea id={props.name} className={"textarea " + (props.inputClass || '')} {...field} placeholder={props.name}></textarea>
              {meta.touched && meta.error ? (
                <ErrorText>{meta.error}</ErrorText>
              ) : null}
            </>
          ) : (
            <>
              <label htmlFor="name"
                     className={"form-group-label " + extraLabelClass}>{props.name}</label>
              <input type="text" id={props.name} {...field} {...props}
                     placeholder={props.name} className="input"/>
              {meta.touched && meta.error ? (
                <ErrorText>{meta.error}</ErrorText>
              ) : null}
            </>
          )
        }
      </>
    );
  }

  return (
    <div className={'mb-3 pt-0 ' + (props.className || '')}>
      {render}
    </div>
  );
};

FormGroup.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  inputClass: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool
};

FormGroup.defaultProps = {
  type: 'text',
  required: false
};

export default FormGroup;
