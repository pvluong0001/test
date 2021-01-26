import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Card from '@components/share/Card';
import api from '@plugins/api';

const DetailScenario = () => {
  const {id} = useParams();
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    api.get(`/scenario/${id}`)
      .then(res => {
        setScenario(res.data.data)

        console.log(res.data.data);
      })
  }, [id])

  const [items, setItems] = useState(
    ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

  const DragHandle = SortableHandle(() => <i className="fas fa-ellipsis-h mr-2 cursor-pointer"></i>);

  const SortableItem = SortableElement(({value}) => <div className="testcase-item"><DragHandle/> {value}</div>);

  const SortableList = SortableContainer(({items}) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value}/>
        ))}
      </div>
    );
  });

  function onSortEnd({oldIndex, newIndex}) {
    setItems(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <div className="detail-scenario-wrapper">
      {scenario &&
        <>
          <Card
            title="Testcase"
            className="content-wrapper testcase-list"
            asideTitle={
              <button className="btn:primary-sm">New testcase</button>
            }
          >
            <div className="mt-2">
              <SortableList items={items} onSortEnd={onSortEnd} useDragHandle/>
            </div>
          </Card>
          <Card
            title={scenario.name}
            className="content-wrapper scenario-box"
          >
            <textarea className="textarea" disabled={true}>{scenario.description}</textarea>
          </Card>
        </>
      }
    </div>
  );
};

export default DetailScenario;
