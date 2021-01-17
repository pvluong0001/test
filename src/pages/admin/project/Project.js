import React, { useEffect, useRef, useState } from 'react';
import api from "@plugins/api"
import {Link} from 'react-router-dom';
import {deleteConfirm} from '@plugins/helpers';
import Swal from 'sweetalert2';
import Modal from '@components/share/Modal';
import {connect} from 'react-redux';

const Project = () => {
  const [projects, setProjects] = useState([])
  const projectName = useRef(null);

  useEffect(() => {
    api.get('project')
      .then(res => {
        const { data: responseData } = res

        setProjects(responseData.data)
      })
  }, [])

  const ProjectItem = ({ project, handleDelete }) => {
    return (
      <>
        <div className="bg-white rounded shadow-lg transition transform hover:scale-105">
          <Link className="p-2 block rounded-t hover:bg-gray-200" to={`/admin/project/${project.id}`}>{project.name}</Link>
          <div className="p-2">
            Content
          </div>
          <div className="p-2 rounded-b text-right">
            <button className="btn:danger-sm" onClick={() => handleDelete(project.id)}><i className="fas fa-trash mr-2"></i>Delete</button>
          </div>
        </div>
      </>
    )
  }

  const handleCreateProject = (callback) => {
    api.post('/project', {
      name: projectName.current.value
    }).then(res => {
      setProjects([...projects, res.data.data])
      callback(false);

      Swal.fire("Create Success!!")
    })
  }

  const handleDeleteProject = async (projectId) => {
    await deleteConfirm(() => {
      api.delete(`/project/${projectId}`)
        .then(() => {
          setProjects(projects.filter(project => project.id !== projectId));

          Swal.fire("Delete Success!!")
        })
    })
  }

  return (
    <>
      <div className="text-right mb-5">
        <Modal
          name="New Project"
          title="New Project"
          submit={handleCreateProject}
        >
          <div className="mb-3 pt-0">
            <input type="text" ref={el => { projectName.current = el; }} placeholder="Project name" className="input" />
          </div>
        </Modal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 z-20">
        {
          projects.map(item => <ProjectItem handleDelete={handleDeleteProject} key={item.id} project={item} />)
        }
      </div>
    </>
  );
};

export default connect()(Project);