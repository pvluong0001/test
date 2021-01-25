import React from 'react';
import {generateString} from '@src/helpers/global';

const TreeSelect = (props) => {
  const {options} = props;
  const [input, setInput] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  function handleChecked(item) {
    console.log(item, '+++++++');
  }

  return (
    <div className="tree-option-wrapper">
      <div className="flex gap-4">
        <div className="flex-1 tree-result">
          {
            input.map(item => <span className="tree-result-item">{item} <i
              className="far fa-times-circle cursor-pointer"></i></span>)
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
                options={options}
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
        props.options.map(item => {
          const uniqueId = generateString();

          return (
            <div key={item.value} className="tree-option">
              <span className="tree-label">
                {item.children && <i className="fas fa-plus text-sm"></i>}
                {item.optional && <input type="checkbox" onChange={() => item.checked = !item.checked} onClick={() => props.handleChecked(item)} checked={item.checked} id={uniqueId}/>}&nbsp;
                <label htmlFor={uniqueId}>{item.label}</label>
              </span>
              <div className="pl-3">
                {
                  (item.children && item.children.length) && (
                    <RecursiveNode
                      options={item.children}
                      handleChecked={props.handleChecked}
                    />
                  )
                }
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default TreeSelect;
