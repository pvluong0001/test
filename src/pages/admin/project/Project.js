import React, {useEffect, useRef, useState, useMemo} from 'react';
import api from '@plugins/api';
import {deleteConfirm} from '@plugins/helpers';
import Swal from 'sweetalert2';
import Modal from '@components/share/Modal';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import FormGroup from '@components/form/FormGroup';
import ProjectItem from '@components/domain/project/ProjectItem';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const modalRef = useRef();
  const formik = useMemo(() => {
    function storeProject(values, setModal) {
      api.post('/project', values).then(res => {
        setProjects([...projects, res.data.data]);
        Swal.fire('Create Success!!');

        setModal(false);
      });
    }

    function updateProject(values, setModal) {
      api.put(`/project/${currentProject.id}`, values).then(res => {
        const index = projects.findIndex(project => project.id === currentProject.id)
        const newProject = [...projects];
        newProject[index] = res.data.data;
        setProjects(newProject);
        Swal.fire('Update Success!!');

        setModal(false);
      });
    }

    return {
      initialValues: {
        name: currentProject?.name || '',
        description: currentProject?.description || ''
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required()
      }),
      onSubmit: currentProject ? updateProject : storeProject,
      currentProject: null
    }
  }, [currentProject, projects])

  const modalTitle = useMemo(() => {
    return currentProject ? `Update '${currentProject.name}' project` : 'New Project';
  }, [currentProject])

  function modalStateChange(showModal) {
    if(!showModal) {
      setCurrentProject(null);
    }
  }

  useEffect(() => {
    api.get('project')
      .then(res => {
        const {data: responseData} = res;

        setProjects(responseData.data);
      });
  }, []);

  function handleOpenEdit(projectId) {
    const project = projects.find(project => project.id === projectId);
    setCurrentProject(project);

    modalRef.current.setShowModal(true)
  }

  const handleDeleteProject = async (projectId) => {
    await deleteConfirm(() => {
      api.delete(`/project/${projectId}`)
        .then(() => {
          setProjects(projects.filter(project => project.id !== projectId));

          Swal.fire('Delete Success!!');
        });
    });
  };

  return (
    <>
      <div className="mb-5 flex flex-row-reverse">
        <Modal
          name="New Project"
          title={modalTitle}
          formik={formik}
          minWidth="500px"
          ref={modalRef}
          modalStateChange={modalStateChange}
        >
          {
            () => {
              return (
                <>
                  <FormGroup name="name" required={true}/>
                  <FormGroup name="description" type="textarea" inputClass="h-80" required={true}/>
                </>
              );
            }
          }
        </Modal>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 z-20">
        {
          projects.map(item => (
            <ProjectItem
              handleDelete={handleDeleteProject}
              handleOpenEdit={handleOpenEdit}
              key={item.id}
              project={item}
            />
          ))
        }
      </div>
    </>
  );
};

export default connect()(Project);
