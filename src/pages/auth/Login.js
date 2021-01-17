import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import ErrorText from '@components/text/ErrorText';
import swal from 'sweetalert2';
import {connect} from 'react-redux';
import {loginHandle} from '@reducers/auth/action';

const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      email: 'admin@test.com',
      password: '123123123'
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required()
    }),
    onSubmit: async (values, {setErrors}) => {
      props.loginHandle(values)
        .then(() => {
          swal.fire({
            title: 'Login success',
            timer: 1500
          })
        })
        .catch(e => {
          if(e?.response?.data?.errors) {
            setErrors(e.response.data.errors)
          }
        })
    },
  });

  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                'url(' + require('@assets/img/register_bg_2.png').default + ')',
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div
              className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div
                  className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400"/>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          name="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        <ErrorText>{formik.errors.email}</ErrorText>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          name="password"
                          type="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                        />
                        <ErrorText>{formik.errors.password}</ErrorText>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  loginHandle: payload => dispatch(loginHandle(payload))
})

export default connect(null, mapDispatchToProps)(Login)