import PropTypes from 'prop-types';
import { useState } from 'react';
export default function CommunicationsAdminTable({
  currentItems,
  handleDeleteClick,
  handleInfoClick,
  handleEditClick,
  clientsOptions,
  documentTypeOptions,
  searchQuery,
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


//sa filtering function for UNIT//

const [showUnitFilterDropdown, setShowUnitFilterDropdown] = useState(false);
const [selectedUnitFilter, setSelectedUnitFilter] = useState('');

const handleToggleUnitFilterDropdown = () => {
  setShowUnitFilterDropdown(!showUnitFilterDropdown);
};

const handleSelectUnitFilter = (value) => {
  setSelectedUnitFilter(value);
  setShowUnitFilterDropdown(false);
};
//sa filtering function for UNIT//

//sa filtering function for DOCUMENT TYPE//

const [showTypeFilterDropdown, setShowTypeFilterDropdown] = useState(false);
const [selectedTypeFilter, setSelectedTypeFilter] = useState('');

const handleToggleTypeFilterDropdown = () => {
  setShowTypeFilterDropdown(!showTypeFilterDropdown);
};

const handleSelectTypeFilter = (value) => {
  setSelectedTypeFilter(value);
  setShowTypeFilterDropdown(false);
};
//sa filtering function for DOCUMENT TYPE//


//sa filtering function for CLIENT/INSTITUTION TYPE//

const [showClientNameFilterDropdown, setShowClientNameFilterDropdown] = useState(false);
const [selectedClientNameFilter, setSelectedClientNameFilter] = useState('');

const handleToggleClientNameFilterDropdown = () => {
  setShowClientNameFilterDropdown(!showClientNameFilterDropdown);
};

const handleSelectClientNameFilter = (value) => {
  setSelectedClientNameFilter(value);
  setShowClientNameFilterDropdown(false);
};

//sa filtering function for CLIENT/INSTITUTION TYPE//


  return (
    <div>
        <table className="table-auto w-full border-collapse border h-24">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Doc ID</th>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">
  <div className="relative inline-block ml-2">
    <button
      onClick={handleToggleClientNameFilterDropdown}
      type="button"
      className="inline-flex justify-center w-32 px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
    >
      {selectedClientNameFilter ? selectedClientNameFilter : 'Client Name'}
    </button>
    {showClientNameFilterDropdown && (
      <div
        className="origin-top-right absolute right-0 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-96 overflow-auto"
      >
        <div className="py-1">
          <button
            onClick={() => handleSelectClientNameFilter('')} // Clears the filter
            className={`${
              selectedClientNameFilter === ''
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left`}
          >
            All
          </button>
          {clientsOptions.map((client) => (
            <button
              key={client.client_id}
              onClick={() => handleSelectClientNameFilter(client.client_name)}
              className={`${
                selectedClientNameFilter === client.client_name
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
            >
              {client.client_name}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</th>
            <th className="px-4 py-2">Assigned Personnel</th>
            <th className="px-4 py-2">
                                      
                 <div className="relative inline-block ml-2">
                  <button
                    onClick={handleToggleUnitFilterDropdown}
                    type="button"
                    className="inline-flex justify-center w-auto px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
                  >
                    {selectedUnitFilter === '1'
                      ? 'Receiving'
                      : selectedUnitFilter === '2'
                      ? 'Scholarship'
                      : selectedUnitFilter  === '3'
                      ? 'Records'
                      : 'Unit'}
                  </button>
    {showUnitFilterDropdown ? (
      <div
        className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-1">
          <button
            onClick={() => handleSelectUnitFilter('')}
            className={`${
              selectedUnitFilter === ''
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left`}
          >
            All
          </button>
          <button
            onClick={() => handleSelectUnitFilter('1')}
            className={`${
              selectedUnitFilter === '1'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left`}
          >
            Receiving
          </button>
          <button
            onClick={() => handleSelectUnitFilter('2')}
            className={`${
              selectedUnitFilter === '2'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left`}
          >
            Scholarship
          </button>
          <button
            onClick={() => handleSelectUnitFilter('3')}
            className={`${
              selectedUnitFilter === '3'
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
           <th className="px-4 py-2">
  
  <div className="relative inline-block ml-2">
    <button
      onClick={handleToggleTypeFilterDropdown}
      type="button"
      className="inline-flex justify-center w-44 px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
    >
      {selectedTypeFilter ? selectedTypeFilter : 'Filing Category'}
    </button>
    {showTypeFilterDropdown && (
      <div
        className="origin-top-right absolute right-0 flex w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-96 overflow-auto "
      >
        <div className="py-1">
          <button
            onClick={() => handleSelectTypeFilter('')} // Clears the filter
            className={`${
              selectedTypeFilter === ''
                ? 'bg-gray-200 text-gray-900 '
                : 'text-gray-700'
            } block px-4 py-2 text-sm w-full text-left `}
          >
            All
          </button>
          {documentTypeOptions.map((type) => (
            <button
              key={type.Doc_type_ID}
              onClick={() => handleSelectTypeFilter(type.Type)}
              className={`${
                selectedTypeFilter === type.Doc_type_ID
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
            >
              {type.Type}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</th>

            <th className="px-4 py-2">Date Received</th>
            <th className="px-4 py-2">Date Release</th>
            <th className="px-4 py-2">
              
              <div className="relative inline-block ml-2">
                <div>
                  <button
                    onClick={handleToggleStatusFilterDropdown}
                    type="button"
                    className="inline-flex justify-center w-26 px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
                  >
                    {selectedStatusFilter === '0'
                      ? 'Pending'
                      : selectedStatusFilter === '1'
                      ? 'Approved'
                      : selectedStatusFilter === '2'
                      ? 'Disapproved'
                      : 'Status'}
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
            <th className="px-4 py-2">Tags</th>
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
      ((selectedUnitFilter === '1' && document.unit === 'Receiving') ||
        (selectedUnitFilter === '2' && document.unit === 'Scholarship') ||
        (selectedUnitFilter === '3' && document.unit === 'Records') ||
        selectedUnitFilter === '') &&
        (selectedTypeFilter === '' || document.document_type === selectedTypeFilter) &&
        (selectedClientNameFilter === '' || document.client_name === selectedClientNameFilter) &&
        (document.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.contact_firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.contact_lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.date_received.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.date_released.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.document_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
         document.file.toLowerCase().includes(searchQuery.toLowerCase())

         
        
        )
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
        <td className="border px-4 py-2 text-center">{document.client_name}</td>
        <td className="border px-4 py-2 text-center">{document.contact_firstName} {document.contact_lastName}</td>
        <td className="border px-4 py-2 text-center">{document.unit}</td>
        <td className="border px-4 py-2 text-center">{document.document_type}</td>
        <td className="border px-4 py-2 text-center">{document.date_received}</td>
        <td className="border px-4 py-2 text-center">{document.date_released}</td>
        <td className="border px-4 py-2 text-center">{document.status}</td>
        <td className="border px-4 py-2 text-center">{document.remarks}</td>
        <td className="border px-4 py-2 text-center">*tags*</td>
        <td className="border px-4 py-2 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick(document.doc_ID)}
          >
            Modify
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
    ))}
</tbody>

      </table>
    </div>
  );
}

CommunicationsAdminTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  clientsOptions: PropTypes.array.isRequired,
  documentTypeOptions: PropTypes.array.isRequired,
};
