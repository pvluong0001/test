import React from 'react';
import PropTypes from 'prop-types';

// components

import TableDropdown from '@templates/Dropdowns/TableDropdown.js';

export default function CardTable({color, title, columns = []}) {
  const mergeColumns = JSON.parse(JSON.stringify(columns));
  mergeColumns.push({
    skip: true,
  })

  const colRender = mergeColumns.map(column => {
    return (
      <>
        {
          column.skip ? '' :
            <th
              className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
            >
              {column.label}
            </th>
        }
      </>
    );
  });

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-blue-900 text-white')
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-gray-800' : 'text-white')
                }
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              {colRender}
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-100 text-gray-600 border-gray-200'
                    : 'bg-blue-800 text-blue-300 border-blue-700')
                }
              ></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                <img
                  src={require('@assets/img/bootstrap.jpg')}
                  className="h-12 w-12 bg-white rounded-full border"
                  alt="..."
                ></img>{' '}
                <span
                  className={
                    'ml-3 font-bold ' +
                    +(color === 'light' ? 'text-gray-700' : 'text-white')
                  }
                >
                    Argon Design System
                  </span>
              </th>
              <td
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                $2,500 USD
              </td>
              <td
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                <TableDropdown/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: 'light',
};

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
