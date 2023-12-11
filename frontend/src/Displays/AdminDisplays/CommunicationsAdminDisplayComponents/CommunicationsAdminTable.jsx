import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CommunicationsAdminTable({
  currentItems,
  handleDeleteClick,
  handleInfoClick,
  handleEditClick,
}) {
  const [showStatusFilterDropdown, setShowStatusFilterDropdown] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('');

  const handleToggleStatusFilterDropdown = () => {
    setShowStatusFilterDropdown(!showStatusFilterDropdown);
  };

  const handleSelectStatusFilter = (value) => {
    setSelectedStatusFilter(value);
    setShowStatusFilterDropdown(false);
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Doc No</th>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Date Issued (year/month/date)</th>
            <th className="px-4 py-2">
              Status
              <div className="relative inline-block ml-2">
                <div>
                  <button
                    onClick={handleToggleStatusFilterDropdown}
                    type="button"
                    className="inline-flex justify-center w-auto px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    {selectedStatusFilter === '0'
                      ? 'Pending'
                      : selectedStatusFilter === '1'
                      ? 'Approved'
                      : selectedStatusFilter === '2'
                      ? 'Disapproved'
                      : 'Filter'}
                  </button>
                </div>
                {showStatusFilterDropdown ? (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleSelectStatusFilter('')}
                        className={`${
                          selectedStatusFilter === ''
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-700'
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => handleSelectStatusFilter('0')}
                        className={`${
                          selectedStatusFilter === '0'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-700'
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleSelectStatusFilter('1')}
                        className={`${
                          selectedStatusFilter === '1'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-700'
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => handleSelectStatusFilter('2')}
                        className={`${
                          selectedStatusFilter === '2'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-700'
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        Disapproved
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </th>
            <th className="px-4 py-2">Remarks</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
  {currentItems.map((document) => (
    ((selectedStatusFilter === "0" && document.status === "Pending") ||
      (selectedStatusFilter === "1" && document.status === "Approved") ||
      (selectedStatusFilter === "2" && document.status === "Disapproved") ||
      selectedStatusFilter === "") && (
      <tr key={document.doc_ID}>
        <td className="border px-4 py-2 text-center">{document.doc_ID}</td>
        <td className="border px-4 py-2 text-center">
          <a
            href={`http://localhost:8081/communicationfiles/${document.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {document.file}
          </a>
        </td>
        <td className="border px-4 py-2 text-center">{document.document_type}</td>
        <td className="border px-4 py-2 text-center">{document.department}</td>
        <td className="border px-4 py-2 text-center">{document.date_issued}</td>
        <td className="border px-4 py-2 text-center">{document.status}</td>
        <td className="border px-4 py-2 text-center">{document.remarks}</td>
        <td className="border px-4 py-2 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick(document.doc_ID)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:underline ml-2"
            onClick={() => handleDeleteClick(document.doc_ID)}
          >
            Delete
          </button>
          <button
            className="text-gray-500 hover:underline ml-2"
            onClick={() => handleInfoClick(document.doc_ID)}
          >
            More Details
          </button>
        </td>
      </tr>
    )
  ))}
</tbody>
      </table>
    </div>
  );
}

CommunicationsAdminTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};
