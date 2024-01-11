import PropTypes from 'prop-types';
import { useState } from 'react';


export default function ChedClientsAdminTable({
  currentItems,
  handleDeleteClick,
  handleInfoClick,
  handleEditClick={handleEditClick} 
}) {
   // for Client Type Filter dropdown
   const [showClientTypeFilterDropdown, setShowClientTypeFilterDropdown] = useState(false);
   const [selectedClientTypeFilter, setSelectedClientTypeFilter] = useState("");

   const handleToggleClientTypeFilterDropdown = () => {
         setShowClientTypeFilterDropdown(!showClientTypeFilterDropdown);
  };
   const handleSelectClientTypeFilter = (value) => {
         setSelectedClientTypeFilter(value);
         setShowClientTypeFilterDropdown(false);
  };



  return (
    <div className="flex h-auto">
        
        <table className="table-auto w-full border-collapse border h-24">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Seq No</th>
              <th className="px-4 py-2">Name of Client</th>
              {/* <th className="px-4 py-2">Filing Category</th> */}
            
              <th className="px-4 py-2">
                Client Type
                <div className="relative inline-block ml-2">
                  <div>
                    <button
                      onClick={handleToggleClientTypeFilterDropdown}
                      type="button"
                      className="inline-flex justify-center w-16 px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      {selectedClientTypeFilter === "1"
                        ? "Internal"
                        : selectedClientTypeFilter === "2"
                        ? "External"
                        : "Filter"}
                    </button>
                  </div>
                  {showClientTypeFilterDropdown ? (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => handleSelectClientTypeFilter("")}
                          className={`${
                            selectedClientTypeFilter === ""
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => handleSelectClientTypeFilter("1")}
                          className={`${
                            selectedClientTypeFilter === "1"
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Internal
                        </button>
                        <button
                          onClick={() => handleSelectClientTypeFilter("2")}
                          className={`${
                            selectedClientTypeFilter === "2"
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          External
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
          {currentItems.map((client) => (
  ((selectedClientTypeFilter === "1" && client.client_type === "internal") ||
    (selectedClientTypeFilter === "2" && client.client_type === "external") ||
    selectedClientTypeFilter === "") &&
 
  // (client.inst_id.includes(searchQueryID) &&
  //   client.inst_name.includes(searchQueryName)) &&
     (
    <tr key={client.client_id}>
      <td className="border px-4 py-2 text-center">{client.seq_no}</td>
      <td className="border px-4 py-2 text-center">{client.client_name}</td>
      <td className="border px-4 py-2 text-center">{client.client_type}</td>
      <td className="border px-4 py-2 text-center">
     
        
        <button
          className="text-blue-500 hover:underline ml-2"
          onClick={() =>  handleEditClick(client.client_id)}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:underline ml-2"
          onClick={() => handleDeleteClick(client.client_id)}
        >
          Delete
        </button>
        <button
          className="text-gray-500 hover:underline ml-2"
          onClick={() => handleInfoClick(client.client_id)}
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
  )
}

ChedClientsAdminTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  // searchQueryID: PropTypes.string.isRequired,
  // searchQueryName: PropTypes.string.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};