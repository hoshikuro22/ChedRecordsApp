import PropTypes from 'prop-types';



export default function ChedClientsNormalTable({
  currentItems,
  searchQueryID,
  searchQueryName,
  selectedFilter,
  selectedInstitutionTypeFilter,
  handleInfoClick,
  handleToggleInstitutionTypeFilterDropdown,
  handleToggleClientTypeFilterDropdown,
  handleSelectFilter,
  handleSelectInstitutionTypeFilter,
  showClientTypeFilterDropdown,
  showInstitutionTypeFilterDropdown,
}) {
  return (
    <div>
        
        <table className="table-auto w-full border-collapse border ">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Seq No</th>
              <th className="px-4 py-2">Name of Institution</th>
              <th className="px-4 py-2">
                Institution Type
                <div className="relative inline-block ml-2">
                  <div>
                    <button
                      onClick={handleToggleInstitutionTypeFilterDropdown}
                      type="button"
                      className="inline-flex justify-center w-16 px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      {selectedInstitutionTypeFilter === "1"
                        ? "NGO"
                        : selectedInstitutionTypeFilter === "2"
                        ? "NGA"
                        : selectedInstitutionTypeFilter === "3"
                        ? "Public"
                        : selectedInstitutionTypeFilter === "4"
                        ? "Private"
                        : "Filter"}
                    </button>
                  </div>
                  {showInstitutionTypeFilterDropdown ? (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => handleSelectInstitutionTypeFilter("")}
                          className={`${
                            selectedInstitutionTypeFilter === ""
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => handleSelectInstitutionTypeFilter("1")}
                          className={`${
                            selectedInstitutionTypeFilter === "1"
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          NGO
                        </button>
                        <button
                          onClick={() => handleSelectInstitutionTypeFilter("2")}
                          className={`${
                            selectedInstitutionTypeFilter === "2"
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          NGA
                        </button>
                        <button
                          onClick={() => handleSelectInstitutionTypeFilter("3")}
                          className={`${
                            selectedInstitutionTypeFilter === "3"
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Public
                        </button>
                        <button
                          onClick={() => handleSelectInstitutionTypeFilter("4")}
                          className={`${
                            selectedInstitutionTypeFilter === "4"
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Private
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">
                Client Type
                <div className="relative inline-block ml-2">
                  <div>
                    <button
                      onClick={handleToggleClientTypeFilterDropdown}
                      type="button"
                      className="inline-flex justify-center w-16 px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      {selectedFilter === "1"
                        ? "Internal"
                        : selectedFilter === "2"
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
                          onClick={() => handleSelectFilter("")}
                          className={`${
                            selectedFilter === ""
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => handleSelectFilter("1")}
                          className={`${
                            selectedFilter === "1"
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Internal
                        </button>
                        <button
                          onClick={() => handleSelectFilter("2")}
                          className={`${
                            selectedFilter === "2"
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
  ((selectedFilter === "1" && client.client_type === "internal") ||
    (selectedFilter === "2" && client.client_type === "external") ||
    selectedFilter === "") &&
  ((selectedInstitutionTypeFilter === "1" && client.inst_type === "NGO") ||
    (selectedInstitutionTypeFilter === "2" && client.inst_type === "NGA") ||
    (selectedInstitutionTypeFilter === "3" && client.inst_type === "Public") ||
    (selectedInstitutionTypeFilter === "4" && client.inst_type === "Private") ||
    selectedInstitutionTypeFilter === "") &&
  (client.inst_id.includes(searchQueryID) &&
    client.inst_name.includes(searchQueryName)) && (
    <tr key={client.inst_id}>
      <td className="border px-4 py-2 text-center">{client.seq_no}</td>
      <td className="border px-4 py-2 text-center">{client.inst_name}</td>
      <td className="border px-4 py-2 text-center">{client.inst_type}</td>
      <td className="border px-4 py-2 text-center">{client.address}</td>
      <td className="border px-4 py-2 text-center">{client.client_type}</td>
      <td className="border px-4 py-2 text-center">
     
        
        <button
          className="text-blue-500 hover:underline ml-2"
          // onClick={() => handleUpdateClick(client.inst_id)}
        >
          Edit
        </button>
    
        <button
          className="text-gray-500 hover:underline ml-2"
          onClick={() => handleInfoClick(client.inst_id)}
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

ChedClientsNormalTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  searchQueryID: PropTypes.string.isRequired,
  searchQueryName: PropTypes.string.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  selectedInstitutionTypeFilter: PropTypes.string.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleToggleInstitutionTypeFilterDropdown: PropTypes.func.isRequired,
  handleToggleClientTypeFilterDropdown: PropTypes.func.isRequired,
  handleSelectFilter: PropTypes.func.isRequired,
  handleSelectInstitutionTypeFilter: PropTypes.func.isRequired,
  showClientTypeFilterDropdown: PropTypes.bool.isRequired,
  showInstitutionTypeFilterDropdown: PropTypes.bool.isRequired,

};