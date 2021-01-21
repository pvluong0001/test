import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import PropTypes from "prop-types";
import {Form, Formik} from 'formik';
import SubmitBtn from '@components/form/SubmitBtn';

const Modal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = React.useState(false);
  useImperativeHandle(ref, () => ({
    setShowModal
  }))

  useEffect(() => {
    props.modalStateChange(showModal);
  })

  const Content = (contentProps) => {
    const {formik} = contentProps;

    return (
      <>
        {/*body*/}
        <div className="relative p-6 flex-auto">
          {props.children({
            ...props,
            setShowModal,
            formik
          })}
        </div>
        {/*footer*/}
        <div className="flex items-center gap-5 justify-end p-6 border-t border-solid border-gray-300 rounded-b">
          <button
            className="btn:default-sm"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <SubmitBtn {...formik}/>
        </div>
      </>
    )
  }

  function handleSubmit(values) {
    return props.formik.onSubmit(values, setShowModal)
  }

  return (
    <>
      <button
        className="btn:default-sm"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {props.name}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                style={{minWidth: props.minWidth}}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-xl font-semibold">
                    {props.title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <Formik
                  initialValues={props.formik.initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={props.formik.validationSchema}
                >
                  {
                    formikProps => (
                      <Form>
                        <Content formik={formikProps}/>
                      </Form>
                    )
                  }
                </Formik>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
})

Modal.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  formik: PropTypes.object,
  minWidth: PropTypes.string,
  modalStateChange: PropTypes.func
}

export default Modal;
