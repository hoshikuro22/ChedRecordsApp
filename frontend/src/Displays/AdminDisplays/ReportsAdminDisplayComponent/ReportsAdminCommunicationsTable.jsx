import  { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReportsAdminCommunicationsTable() {
  const [reports, setReports] = useState([]);
  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  //to fetch the communications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getCommunicationReports");
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  fetchData();
  }, []);

   // to fetch institution for the add and edit form 
const [institutionsOptions, setInstitutionsOptions] = useState([]);

useEffect(() => {
  const fetchInstitutionData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getClients");
      setInstitutionsOptions(response.data);
    } catch (error) {
      console.error("Error fetching institution data:", error);
    }
  };

  fetchInstitutionData();
}, []);

  // for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reports.length / itemsPerPage);

    //  para ma truncate
    function truncateFileName(fileName, maxLength) {
      if (fileName.length <= maxLength) {
        return fileName;
      } else {
        const truncatedName = fileName.substring(0, maxLength - 3) + "...";
        return truncatedName;
      }
    }
  
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
    <div className="mt-2">
      <h1 className="font-bold">Communications Transaction: </h1>

      <div className="">
        <table className="table-auto w-full border-collapse border h-24">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">TransactionID</th>
              <th className="px-4 py-2">Released By</th>
              <th className="px-4 py-2">Doc ID</th>
              <th className="px-4 py-2">Client Name
  <div className="relative inline-block ml-2">
    <button
      onClick={handleToggleClientNameFilterDropdown}
      type="button"
      className="inline-flex justify-center w-auto px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      {selectedClientNameFilter ? selectedClientNameFilter : 'Filter'}
    </button>
    {showClientNameFilterDropdown && (
      <div
        className="origin-top-right absolute right-0 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
          {institutionsOptions.map((institution) => (
            <button
              key={institution.inst_id}
              onClick={() => handleSelectClientNameFilter(institution.inst_name)}
              className={`${
                selectedClientNameFilter === institution.inst_name
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
            >
              {institution.inst_name}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</th>
              <th className="px-4 py-2">Appointer </th>
              <th className="px-4 py-2">
       Department
  <div className="relative inline-block ml-2 h-auto ">
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
               <th className="px-4 py-2">
                     Document Type
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
              <th className="px-4 py-2">Date Received</th>
              <th className="px-4 py-2">Date Released</th>
              <th className="px-4 py-2">File Name</th>
              <th className="px-4 py-2">Remarks</th>
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
            </tr>
          </thead>
          <tbody>
  {currentItems
    .filter((report) =>
      ((selectedStatusFilter === '0' && report.Status === 'Pending') ||
        (selectedStatusFilter === '1' && report.Status === 'Approved') ||
        (selectedStatusFilter === '2' && report.Status === 'Disapproved') ||
        selectedStatusFilter === '') &&
      ((selectedDepartmentFilter === '1' && report.Department === 'Receiving') ||
        (selectedDepartmentFilter === '2' && report.Department === 'Scholarship') ||
        (selectedDepartmentFilter === '3' && report.Department === 'Records') ||
        selectedDepartmentFilter === '') &&
        (selectedTypeFilter === '' || report.DocumentType === selectedTypeFilter) &&
        (selectedClientNameFilter === '' || report.institution_name === selectedClientNameFilter)
    )
    .map((report) => (
      <tr key={report.TransactionID}>
        <td className="border px-4 py-2 text-center">{report.TransactionID}</td>
        <td className="border px-4 py-2 text-center">{report.SentBy}</td>
        <td className="border px-4 py-2 text-center">{report.DocID}</td>
        <td className="border px-4 py-2 text-center">{report.institution_name}</td>
        <td className="border px-4 py-2 text-center">{report.Assignatories}</td>
        <td className="border px-4 py-2 text-center">{report.Department}</td>
        <td className="border px-4 py-2 text-center">{report.DocumentType}</td>
        <td className="border px-4 py-2 text-center">{report.DateReceived}</td>
        <td className="border px-4 py-2 text-center">{report.DateReleased}</td>
        <td className="border px-4 py-2 text-center">{truncateFileName(report.File, 30)}</td>
        <td className="border px-4 py-2 text-center">{report.Remarks}</td>
        <td className="border px-4 py-2 text-center">{report.Status}</td>
      </tr>
    ))}
</tbody>

        </table>
      </div>

{/* pagination button */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Next
        </button>
      </div>  

    </div>
  );
}
