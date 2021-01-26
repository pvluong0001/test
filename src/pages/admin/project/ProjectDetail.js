import React, {useState, useEffect, useMemo} from 'react';
import {useParams} from 'react-router';
import api from '@plugins/api';
import ArticleSkeleton from '@components/skeleton/ArticleSkeleton';
import Card from '@components/share/Card';
import TreeSelect from '@components/share/TreeSelect';

const ProjectDetail = () => {
  const {id} = useParams();
  const [project, setProject] = useState(null);
  const [tags, setTags] = useState([]);
  const [scenarios, setScenarios] = useState([]);

  // get project detail
  useEffect(() => {
    api.get(`project/${id}`)
      .then(res => {
        setProject(res.data.data);
      });
  }, [id]);

  // get scenarios
  useEffect(() => {
    api.get('/tag')
      .then(res => {
        setTags(res.data.data);
      })
  }, [])

  const oldScenarioIds = useMemo(() => {
    return project ? project.scenarios.map(scenario => scenario.id) : []
  }, [project]);

  const treeOptions = useMemo(() => {
    return tags.map(item => ({
      id: item.id,
      label: item.name,
      disabled: true,
      children: item.scenarios.map(scenarios => ({
        id: scenarios.id,
        label: scenarios.name,
        optional: true,
        checked: oldScenarioIds.includes(scenarios.id)
      }))
    }))
  }, [tags, oldScenarioIds]);

  function handleSubmit() {
    api.put(`/project/${id}/set-scenarios`, {
      scenarios: scenarios.map(scenario => scenario.value)
    }).then(res => {

    })
  }

  function onChangeHandle(value) {
    setScenarios(value);
  }

  return (
    <>
      <div className="flex gap-5">
        {
          project && <>
            {/*project detail*/}
            <div className="flex-1 content-wrapper">
              {
                project ?
                  <Card title={project.name}>
                    <div className="divide"></div>
                    <div>
                      {project.description}
                    </div>
                  </Card>
                  : <ArticleSkeleton/>
              }
            </div>
            <div className="flex-1 content-wrapper">
              <Card title="Scenario">
                <TreeSelect options={treeOptions} onChange={onChangeHandle} oldValue={project.scenarios}/>
              </Card>
            </div>
          </>
        }
      </div>

      <div className="text-right content-wrapper mb-5 p-3">
        <button className="btn:primary-sm" onClick={handleSubmit}>Save</button>
      </div>
    </>
  );
};

export default ProjectDetail;
