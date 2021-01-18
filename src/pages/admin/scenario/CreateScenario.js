import React, {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import FormGroup from '@components/form/FormGroup';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import api from '@plugins/api';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

const theme = {
  container: 'relative',
  suggestionsContainer: 'absolute bg-white w-full border shadow-lg rounded-b-md'
}

const CreateScenario = () => {
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = useCallback(debounce(({value}) => {
    api.get(`/tag?s=${value}`)
    .then(res => {
      setSuggestions(res.data.data)
    })
  }, 300), [])

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  }

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => (
    <div className="p-2 hover:bg-gray-100 cursor-pointer">
      {suggestion.name}
    </div>
  );

  function onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    console.log(suggestionValue, suggestion);
  }

  function handlePressSearch(e) {
    // press enter
    if (e.nativeEvent.keyCode === 13) {
      createSearch(value)
      e.preventDefault();
    }
  }

  function createSearch(value) {
    api.post('/tag', {
      name: value
    }).then(res => {
      console.log(res, '~~~');
    })
  }

  const onChange = (event, { newValue, method }) => {
    event.preventDefault();
    setValue(newValue)
  }

  const inputProps = {
    placeholder: "Search Star Wars",
    value,
    onChange
  };

  // useEffect(() => {
  //   api.get('/tag')
  //     .then(res => {
  //       setTags(res.data.data)
  //     })
  // }, [])

  const Tags = () => {
    return tags.map(tag => (
      <span key={tag.id} className="badge">{tag.name}</span>
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
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={onSuggestionSelected}
                    renderInputComponent={
                      inputProps => (
                        <input {...inputProps} type="text" onKeyPress={handlePressSearch} className="input" placeholder="Search...."/>
                      )
                    }
                    theme={theme}
                  />

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
