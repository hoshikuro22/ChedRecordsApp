import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CommunicationsNormalTable({
  currentItems,
  // handleDeleteClick,
  handleInfoClick,
  handleEditClick,
}) {

  //sa filtering function for STATUS//
  const [showStatusFilterDropdown, setShowStatusFilterDropdown] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('');

  const handleToggleStatusFilterDropdown = () => {
    setShowStatusFilterDropdown(!showStatusFilterDropdown);
  };

  const handleSelectStatusFilter = (value) => {
    setSelectedStatusFilter(value);
    setShowStatusFilterDropdown(false);
  };
//sa filtering function for STATUS//

//sa filtering function for DEPARTMENT//

const [showDepartmentFilterDropdown, setShowDepartmentFilterDropdown] = useState(false);
const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState('');

const handleToggleDepartmentFilterDropdown = () => {
  setShowDepartmentFilterDropdown(!showDepartmentFilterDropdown);
};

const handleSelectDepartmentFilter = (value) => {
  setSelectedDepartmentFilter(value);
  setShowDepartmentFilterDropdown(false);
};
//sa filtering function for DEPARTMENT//

//sa filtering function for DOCUMENT TYPE//

const [showTypeFilterDropdown, setShowTypeFilterDropdown] = useState(false);
const [selectedTypeFilter, setSelectedTypeFilter] = useState('');

const handleToggleTypeFilterDropdown = () => {
  setShowTypeFilterDropdown(!showTypeFilterDropdown);
};

const handleSelectTypeFilter = (value) => {
  const selectedType = types.find(type => type.id === value)?.type || '';
  // Set selectedTypeFilter to an empty string for the "All" option
  setSelectedTypeFilter(value === '' ? '' : selectedType );

  setShowTypeFilterDropdown(false);
};

const types = [
  { id: '', type: 'ALL '},
  { id: 1, type: 'OFFICE MEMO' },
  { id: 2, type: 'MESSAGES' },
  { id: 3, type: 'CERTIFICATES' },
  { id: 4, type: 'RECOMMENDATIONS' },
  { id: 5, type: 'MAIL CERTIFICATES' },
  { id: 6, type: 'REGIONAL LETTER' },
  { id: 7, type: 'REGIONAL MEMO' },
  { id: 8, type: 'SPECIAL TRAVEL ORDER' },
  { id: 9, type: 'GOVERNMENT OFFICE' },
  { id: 10, type: 'CHED MANILA' },
  { id: 11, type: 'MISCELLANEOUS' },
  { id: 12, type: 'SPECIAL ORDER DEFICIENCY' },
  { id: 13, type: 'APPROVED/REPLY LETTERS TO SCHOLARS' },
  { id: 14, type: 'GOVERNMENT RECOGNITION' },
  { id: 15, type: 'CERTIFICATE OF PROGRAM COMPLETION- SUCS' },
  { id: 16, type: 'GOVERNMENT AUTHORITY-LUCS' },
  { id: 17, type: 'GOVERNMENT PERMIT' },
  { id: 18, type: 'COA-CHED 10 COMMUNICATION' },
  { id: 19, type: 'CHED MEMORANDUM' },
  { id: 20, type: 'SPECIAL ORDER DUPLICATES' },
  { id: 21, type: 'CAV DUPLICATES' },
  { id: 22, type: 'CUSTOMER FEEDBACK FORMS' },
  { id: 23, type: 'AUTHORIZATION' },
  { id: 24, type: 'HEIS DESIGNATION/SPECIMEN' },
  { id: 25, type: 'ENROLLMENT LIST' },
];  

//sa filtering function for DOCUMENT TYPE//

  return (
    <div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Doc No</th>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">Assignatory</th>
            <th className="px-4 py-2">
              Type
              <div className="relative inline-block ml-2">
                {/* Type filter dropdown */}
                <button
             onClick={handleToggleTypeFilterDropdown}
             type="button"
             className="inline-flex justify-center w-auto px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
             >
               {selectedTypeFilter ? types.find(t => t.type === selectedTypeFilter)?.type : 'Filter'}
               </button>

                {showTypeFilterDropdown && (
                  <div
                    className="origin-top-right absolute right-0 flex w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      {types.map(type => (
                        <button
                          key={type.id}
                          onClick={() => handleSelectTypeFilter(type.id)}
                          className={`${
                            selectedTypeFilter === type.id ? 'bg-gray-200 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          {type.type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </th>
            <th className="px-4 py-2">
  Department
  <div className="relative inline-block ml-2">
  <button
                    onClick={handleToggleDepartmentFilterDropdown}
                    type="button"
                    className="inline-flex justify-center w-auto px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    {selectedDepartmentFilter === '1'
                      ? 'Receiving'
                      : selectedDepartmentFilter === '2'
                      ? 'Scholarship'
                      : selectedDepartmentFilter === '3'
                      ? 'Records'
                      : 'Filter'}
                  </button>
    {showDepartmentFilterDropdown ? (
      <div
        className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-1">
          <button
            onClick={() => handleSelectDepartmentFilter('')}
            className={`${
              selectedDepartmentFilter === ''
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left`}
          >
            All
          </button>
          <button
            onClick={() => handleSelectDepartmentFilter('1')}
            className={`${
              selectedDepartmentFilter === '1'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left`}
          >
            Receiving
          </button>
          <button
            onClick={() => handleSelectDepartmentFilter('2')}
            className={`${
              selectedDepartmentFilter === '2'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left`}
          >
            Scholarship
          </button>
          <button
            onClick={() => handleSelectDepartmentFilter('3')}
            className={`${
              selectedDepartmentFilter === '3'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left`}
          >
            Records
          </button>
        </div>
      </div>
    ) : null}
  </div>
</th>
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
  {currentItems
    .filter((document) =>
      ((selectedStatusFilter === '0' && document.status === 'Pending') ||
        (selectedStatusFilter === '1' && document.status === 'Approved') ||
        (selectedStatusFilter === '2' && document.status === 'Disapproved') ||
        selectedStatusFilter === '') &&
      ((selectedDepartmentFilter === '1' && document.department === 'Receiving') ||
        (selectedDepartmentFilter === '2' && document.department === 'Scholarship') ||
        (selectedDepartmentFilter === '3' && document.department === 'Records') ||
        selectedDepartmentFilter === '') &&
        (selectedTypeFilter === '' || document.document_type === selectedTypeFilter)
    )
    .map((document) => (
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
        <td className="border px-4 py-2 text-center">{document.contact_firstName} {document.contact_lastName}</td>
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
          {/* <button
            className="text-red-500 hover:underline ml-2"
            onClick={() => handleDeleteClick(document.doc_ID)}
          >      sa admin ra ang delete
            Delete 
          </button> */}
          <button
            className="text-gray-500 hover:underline ml-2"
            onClick={() => handleInfoClick(document.doc_ID)}
          >
            More Details
          </button>
        </td>
      </tr>
    ))}
</tbody>
      </table>
    </div>
  );
}

CommunicationsNormalTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  // handleDeleteClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};
