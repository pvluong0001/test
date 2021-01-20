import React, { useEffect, useState } from 'react';
import api from "@plugins/api"
import {Link} from 'react-router-dom';
import {deleteConfirm} from '@plugins/helpers';
import Swal from 'sweetalert2';
import Modal from '@components/share/Modal';
import {connect} from 'react-redux';
import {useFormik} from 'formik';
import ErrorText from '@components/text/ErrorText';
import * as Yup from 'yup';

const Project = () => {
  const [projects, setProjects] = useState([])
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required()
    }),
    onSubmit: values => {
      console.log("hererere");
      api.post('/project', values).then(res => {
        setProjects([...projects, res.data.data])
        Swal.fire("Create Success!!")
      })
    }
  })

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
    // formik.validateForm()
    //   .then((res) => {
    //     console.log(res, '++++++++');
    //
    //   })
    //   .catch(console.log)
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
      <div className="mb-5 flex flex-row-reverse">
        <Modal
          name="New Project"
          title="New Project"
          submit={handleCreateProject}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3 pt-0">
              <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Project name" className="input" />
              <ErrorText>{formik.errors.name}</ErrorText>
            </div>
          </form>
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
