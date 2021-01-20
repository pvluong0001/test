import React, {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import FormGroup from '@components/form/FormGroup';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import api from '@plugins/api';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';
import {history} from '@src/configureStore';
import Swal from 'sweetalert2';

const theme = {
  container: 'relative',
  suggestionsContainer: 'absolute bg-white w-full border shadow-lg rounded-b-md',
  suggestionHighlighted: 'bg-gray-100',
  suggestionFirst: 'bg-gray-100'
}

const CreateScenario = () => {
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = useCallback(debounce(({value}) => {
    api.get(`/tag?s=${value}`)
    .then(res => {
      const idList = tags.map(tag => tag.id);
      const filterResult = res.data.data.filter(tag => !idList.includes(tag.id))
      setSuggestions(filterResult)
    })
  }, 150), [])

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
    setTags([...tags, {...suggestion}]);
  }

  function handlePressSearch(e) {
    // press enter
    if (e.nativeEvent.keyCode === 13) {
      e.preventDefault();

      if(suggestions.length === 1) {
        setTags([...tags, suggestions[0]]);
      } else {
        createSearch(value)
      }

      setValue('');
      setSuggestions([]);
    }
  }

  function createSearch(value) {
    api.post('/tag', {
      name: value
    }).then(res => {
      setTags([...tags, res.data.data]);
    }).catch(() => {})
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

  const Tags = () => {
    return tags.map(tag => (
      <span key={tag.id} className="badge">{tag.name}</span>
    ))
  }

  const formik = {
    initValues: {
      name: '',
      description: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required()
    }),
    submit: (values) => {
      const payload = {
        ...values,
        tags: tags.map(tag => tag.id)
      }

      api.post('/scenario', payload)
        .then(() => {
          Swal.fire({
            timer: 1500,
            title: 'Create success'
          })

          return history.push('/admin/scenario')
        })
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
                <div className="flex-1">
                  <FormGroup name="name"/>
                  <FormGroup name="description" type="textarea" inputClass="h-80"/>
                </div>

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
