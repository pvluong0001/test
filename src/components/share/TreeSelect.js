import React from 'react';
import {generateString} from '@src/helpers/global';

function setUUID(nodes) {
  return nodes.map((item, index) => {
    item.uuid = generateString();

    if(item.children && item.children.length) {
      nodes[index].children = setUUID(item.children)
    }

    return item;
  })
}

const TreeSelect = (props) => {
  const [options, setOptions] = React.useState([...props.options]);
  const [input, setInput] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setOptions(setUUID(props.options))
    setInput(props.oldValue)
  }, [props.options, props.oldValue])

  function handleChecked(event, item) {
    const newOptions = [...options];
    const isCheck = event.target.checked;

    newOptions.map(tag => {
      tag.children = tag.children.map(scenario => {
        if(scenario.id === item.id) {
          scenario.checked = isCheck;
        }

        return scenario;
      })

      return tag;
    })

    setOptions(newOptions);

    let newInput;
    if(isCheck) {
      newInput = [...input, item];
    } else {
      newInput = input.filter(i => i.id !== item.id)
    }
    setInput(newInput)
    props.onChange(newInput)
  }

  function uncheckHandle(item) {
    handleChecked({target: {checked: false}}, item);
  }

  return (
    <div className="tree-option-wrapper">
      <div className="flex gap-4">
        <div className="flex-1 tree-result">
          {
            input.map(item => <span key={item.id} className="tree-result-item">{item.label || item.name} <i
              className="far fa-times-circle cursor-pointer" onClick={() => uncheckHandle(item)}></i></span>)
          }
        </div>
        <div>
          <button className="btn:primary-sm" onClick={() => setIsOpen(!isOpen)}>Select</button>
        </div>
      </div>
      <div className="relative">
        {
          isOpen && (
            <div className="tree-toggle-content">
              <RecursiveNode
                nodes={options}
                handleChecked={handleChecked}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

function RecursiveNode(props) {
  return (
    <>
      {
        props.nodes.map(item => {
          return (
            <div key={item.id} className="tree-option">
              <span className="tree-label">
                {item.children && <i className="fas fa-plus text-sm"></i>}
                {item.optional && <input type="checkbox"
                                         onChange={(e) => props.handleChecked(e, item)}
                                         checked={item.checked}
                                         id={item.uuid}/>}&nbsp;
                <label htmlFor={item.uuid}>{item.label}</label>
              </span>
              <div className="pl-3">
                {
                  (item.children && item.children.length) && (
                    <RecursiveNode
                      nodes={item.children}
                      handleChecked={props.handleChecked}
                    />
                  )
                }
              </div>
            </div>
          );
        })
      }
    </>
  );
}

export default TreeSelect;
