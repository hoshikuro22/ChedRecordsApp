import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ChedClientsAdminTable({
  currentItems,
  // handleDeleteClick,
  handleInfoClick,
  handleEditClick,
  searchQuery,
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
          <tr className="bg-gray-400">
            <th className="px-4 py-2 ">Client ID</th>
            <th className="px-4 py-2">Name of Client</th>
            <th className="px-4 py-2">
              <div className="relative inline-block ml-2">
                <button
                  onClick={handleToggleClientTypeFilterDropdown}
                  type="button"
                  className="inline-flex justify-center w-32 px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
                >
                  {selectedClientTypeFilter === "1"
                    ? "CHED10"
                    : selectedClientTypeFilter === "2"
                    ? "HEIS"
                    : selectedClientTypeFilter === "3"
                    ? "Government Office"
                    : selectedClientTypeFilter === "4"
                    ? "Agency"
                    : selectedClientTypeFilter === "5"
                    ? "Individual"
                    : "Client Type"}
                </button>
                {showClientTypeFilterDropdown ? (
                  <div className="origin-top-right absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        CHED10
                      </button>
                      <button
                        onClick={() => handleSelectClientTypeFilter("2")}
                        className={`${
                          selectedClientTypeFilter === "2"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        HEIS
                      </button>
                      <button
                        onClick={() => handleSelectClientTypeFilter("3")}
                        className={`${
                          selectedClientTypeFilter === "3"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        Government Office
                      </button>
                      <button
                        onClick={() => handleSelectClientTypeFilter("4")}
                        className={`${
                          selectedClientTypeFilter === "4"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        Agency
                      </button>
                      <button
                        onClick={() => handleSelectClientTypeFilter("5")}
                        className={`${
                          selectedClientTypeFilter === "5"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-4 py-2 text-sm w-full text-left`}
                      >
                        Individual
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
          {currentItems
            .filter((client) => (
              ((selectedClientTypeFilter === "1" && client.client_type === "CHED10") ||
                (selectedClientTypeFilter === "2" && client.client_type === "HEIS") ||
                (selectedClientTypeFilter === "3" && client.client_type === "Government Office") ||
                (selectedClientTypeFilter === "4" && client.client_type === "Agency") ||
                selectedClientTypeFilter === "") &&
              (client.client_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.client_type.toLowerCase().includes(searchQuery.toLowerCase()))
            ))
            .map((client) => (
              <tr key={client.client_id}>
                <td className="border px-3 py-2 text-left">{client.client_id}</td>
                <td className="border px-3 py-2 text-left">{client.client_name}</td>
                <td className="border px-3 py-2 text-left">{client.client_type}</td>
                <td className="border px-3 py-2 text-left">
                  <button
                    className="text-blue-500 hover:underline ml-2 font-bold"
                    onClick={() => handleEditClick(client.client_id)}
                  >
                    Modify
                  </button>
                  {/* <button
                    className="text-red-500 hover:underline ml-2 font-bold"
                    onClick={() => handleDeleteClick(client.client_id)}
                  >
                    Delete
                  </button> */}
                  <button
                    className="text-gray-500 hover:underline ml-2 font-bold"
                    onClick={() => handleInfoClick(client.client_id)}
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

ChedClientsAdminTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};
