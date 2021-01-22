import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import api from '@plugins/api';
import ArticleSkeleton from '@components/skeleton/ArticleSkeleton';

const ProjectDetail = () => {
  const {id} = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    api.get(`project/${id}`)
      .then(res => {
        setProject(res.data.data);

        console.log(project);
      });
  }, []);

  return (
    <div className="content-wrapper">
      {
        project ?
          <>
            <div>
              <div>
                <h1 className="text-2xl font-bold">{project.name}</h1>
                <div className="divide"></div>
                <div>
                  {project.description}
                </div>
                <div className="divide"></div>
              </div>
              <div>

              </div>
            </div>
          </> :
          <ArticleSkeleton/>
      }
    </div>
  );
};

export default ProjectDetail;
