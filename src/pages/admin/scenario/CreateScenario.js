import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import FormGroup from '@components/share/FormGroup';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import SubmitBtn from '@components/share/SubmitBtn';
import api from '@plugins/api';

const CreateScenario = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api.get('/tag')
      .then(res => {
        setTags(res.data.data)
      })
  }, [])

  const Tags = () => {
    return tags.map(tag => (
      <span className="badge">{tag.name}</span>
    ))
  }

  const formik = {
    initValues: {
      name: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required()
    }),
    submit: (values) => {
      console.log(values, '++++++++');
    }
  }

  return (
    <div className="content-wrapper flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold">Scenario</span>
        </div>
        <div>
          <Link className="underline" to="/admin/scenario">Back to list</Link>
        </div>
      </div>
      <div className="divide"></div>
      <Formik
        initialValues={formik.initValues}
        validationSchema={formik.validationSchema}
        onSubmit={formik.submit}
      >
        {
          props => (
            <Form>
              <div className="flex gap-5">
                <FormGroup name="name" className="flex-1"/>
                <FormGroup name="tags" className="flex-1">
                  <input type="text" className="input" placeholder="Search...."/>
                  <p className="text-gray-500 text-sm">Type <b>Enter</b> to create a new tag</p>
                  <div className="mt-2">
                    <Tags/>
                  </div>
                </FormGroup>
              </div>

              <div className="text-right">
                <SubmitBtn {...props}/>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
};

export default CreateScenario;
