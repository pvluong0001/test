import React, {useEffect, useState} from 'react';
import api from '@plugins/api';
import CardTable from '@templates/Cards/CardTable';
import DataTable from 'react-data-table-component';
import {Link} from 'react-router-dom';

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
      selector: 'tags'
    }
  ]

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
          title="Arnold Movies"
          columns={columns}
          data={scenarios}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default Scenario;