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

  const treeOptions = useMemo(() => {
    return tags.map(item => ({
      value: item.id,
      label: item.name,
      disabled: true,
      children: item.scenarios.map(scenarios => ({
        value: scenarios.id,
        label: scenarios.name,
        optional: true,
        checked: false
      }))
    }))
  }, [tags]);

  return (
    <div className="flex gap-5">
      {/*project detail*/}
      <div className="flex-1 content-wrapper">
        {
          project ?
            <Card title={project.name}>
              <div className="divide"></div>
              <div>
                {project.description}
              </div>
              <div className="divide"></div>
            </Card>
            : <ArticleSkeleton/>
        }
      </div>
      <div className="flex-1 content-wrapper">
        <Card title="Scenario">
          <TreeSelect options={treeOptions} />
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;
