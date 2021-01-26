import React, {useEffect, useState} from 'react';
import api from '@plugins/api';
import DataTable from 'react-data-table-component';
import {Link} from 'react-router-dom';
import {deleteConfirm} from '@plugins/helpers';
import Swal from 'sweetalert2';

const customStyles = {
  header: {
    style: {
      borderRadius: '0.25em 0.25em 0 0'
    }
  },
  headRow: {
    style: {
      background: '#f1f1f1',
      border: 'none',
      textTransform: 'uppercase',
      fontWeight: 650,
      minHeight: '40px'
    }
  }
};

const Scenario = () => {
  const [scenarios, setScenarios] = useState([]);
  const columns = [
    {
      name: 'name',
      selector: 'name'
    },
    {
      name: 'tags',
      selector: 'tags',
      cell: row => {
        return row.tags.map(tag => (
          <span className="badge" key={tag.id}>{tag.name}</span>
        ));
      },
    },
    {
      name: 'actions',
      cell: row => {
        return (
          <>
            <span className="delete-btn" onClick={() => handleDeleteScenario(row.id)}><i className="fas fa-trash"></i></span>
            <Link to={`/admin/scenario/${row.id}`} className="edit-btn"><i className="fas fa-edit"></i></Link>
          </>
        )
      },
      width: '100px'
    }
  ]

  function handleDeleteScenario(id) {
    deleteConfirm(() => {
      api.delete(`/scenario/${id}`)
        .then(res => {
          setScenarios(scenarios.filter(scenario => scenario.id !== id))

          Swal.fire('Delete success!');
        })
    })
  }

  useEffect(() => {
    api.get('/scenario')
      .then(res => {
        setScenarios(res.data.data)
      })
  }, []);

  return (
    <>
      <div className="text-right mb-5">
        <Link to="/admin/scenario/create" className="btn:default-sm">Create Scenario</Link>
      </div>
      <div className="shadow-lg">
        <DataTable
          title="Scenarios"
          columns={columns}
          data={scenarios}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default Scenario;
