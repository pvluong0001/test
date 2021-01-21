import React from 'react';
import {Link} from 'react-router-dom';

const ProjectItem = ({project, handleDelete, handleOpenEdit}) => {
  return (
    <>
      <div
        className="project-item relative">
        <div className="p-2 block rounded-t font-bold text-lg flex justify-between items-center">
          <div>
            {project.name}
          </div>
          <div className="p-2 flex gap-2 flex-row-reverse">
            <button className="btn:danger-sm" onClick={() => handleDelete(project.id)}>
              <i className="fas fa-trash"></i>
            </button>
            <button className="btn:warning-sm"
                    onClick={() => handleOpenEdit(project.id)}>
              <i className="far fa-edit"></i>
            </button>
          </div>
        </div>
        <div className="p-2 rounded-b">
          {project.description}
        </div>

        {/*readmore*/}
        <Link to={`/admin/project/${project.id}`} className="readmore-overlay">Detail</Link>
      </div>
    </>
  );
};

export default ProjectItem;
