import { useState, useEffect } from "react";
import axios from "axios";
import ChedClientsNormalAddForm from "./ChedClientsNormalDisplayComponent/ChedClientsNormalAddForm";
import ChedClientsNormalTable from "./ChedClientsNormalDisplayComponent/ChedClientsNormalTable";

export default function ChedClients() {
  const [formData, setFormData] = useState({
    institutionID: "",
    institutionName: "",
    institutionType: "",
    address: "",
    clientType: "",
    filingCat: "",
    contactPerson: "", 
    contactNumber: "", 
    file: "" 
  });

  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // for filter dropdown
  const [showInstitutionTypeFilterDropdown, setShowInstitutionTypeFilterDropdown] = useState(false);
  const [showClientTypeFilterDropdown, setShowClientTypeFilterDropdown] = useState(false);
 
  // for filter by type
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedInstitutionTypeFilter, setSelectedInstitutionTypeFilter] = useState("");

  // for search for filter
  const [searchQueryID, setSearchQueryID] = useState("");
  const [searchQueryName, setSearchQueryName] = useState("");

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  // for info or more details
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);




  const handleInfoClick = (inst_id) => {
    // Find the selected row data based on the inst_id
    const selectedRow = clients.find((client) => client.inst_id === inst_id);
    if (selectedRow) {
      setSelectedRowData(selectedRow);
      setInfoModalOpen(true);
    }
  };


  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getClients");
      console.log(response.data); // Add this line to check the fetched data
      const sortedClients = response.data.sort();
      setClients(sortedClients);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching clients(client side).");
    }
  };

  const getMaxSeqNo = () => {
    if (clients.length === 0) {
      return 1;
    }
    const maxSeqNo = Math.max(...clients.map((client) => client.seq_no));
    return maxSeqNo + 1;
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchIDChange = (e) => {
    setSearchQueryID(e.target.value);
  };

  const handleSearchNameChange = (e) => {
    setSearchQueryName(e.target.value);
  };

  const handleAddClientClick = () => {
    setShowForm(true);
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleClearFormClick = () => {
    setFormData({
      institutionID: "",
      institutionName: "",
      institutionType: "",
      address: "",
      clientType: "",
      contactPerson: "",
      contactNumber: "",
      file: "",
    });
  };


  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const seq_no = getMaxSeqNo();
      const response = await axios.post("http://localhost:8081/addClient", {
        ...formData,
        seq_no,
      });
      if (response.data.Status === "Success") {
        alert("Client added successfully!");
        setFormData({
          institutionID: "",
          institutionName: "",
          institutionType: "",
          address: "",
          clientType: "",
          filingCat: "",
          contactPerson: "",  // Clear the  fields
          contactNumber: "",
          file: "",
        });
        fetchClients();
        setShowForm(false);
      } else {
        alert("Error adding client. Please try again.(frontend)");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the client.");
    }
  };
  

  const handleToggleInstitutionTypeFilterDropdown = () => {
    setShowInstitutionTypeFilterDropdown(!showInstitutionTypeFilterDropdown);
  };

  const handleToggleClientTypeFilterDropdown = () => {
    setShowClientTypeFilterDropdown(!showClientTypeFilterDropdown);
  };

  const handleSelectFilter = (value) => {
    setSelectedFilter(value);
    setShowClientTypeFilterDropdown(false);
  };

  const handleSelectInstitutionTypeFilter = (value) => {
    setSelectedInstitutionTypeFilter(value);
    setShowInstitutionTypeFilterDropdown(false);
  };

  const handleDeleteClick = async (id) => {
  // Show a confirmation dialog
  const confirmDelete = window.confirm("Are you sure you want to delete this client?");

  if (confirmDelete) {
    try {
      const response = await axios.delete(`http://localhost:8081/deleteClient/${id}`);
      if (response.data.Status === "Success") {
        alert("Client deleted successfully!");
        fetchClients(); // Refresh the client list
      } else {
        alert("Error deleting client. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the client.");
    }
  }
};
  return (
    <div className="w-screen h-screen mt-2 p-2 ml-4">
      <h1 className="font-semibold text-2xl mb-4">CHED CLIENTS</h1>

      {/* The add form */}
      <ChedClientsNormalAddForm
        formData={formData}
        handleSubmit={handleSubmit}
        showForm={showForm}
        handleAddClientClick={handleAddClientClick}
        handleHideFormClick={handleHideFormClick}
        handleClearFormClick={handleClearFormClick}
        handleChange={handleChange}
      />


      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">List of CHED Clients</h2>

        {/* Search bar for filter by Institution ID or Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Institutional ID"
            value={searchQueryID}
            onChange={handleSearchIDChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="text"
            placeholder="Search by Institutional Name"
            value={searchQueryName}
            onChange={handleSearchNameChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ml-2"
          />
        </div>

        


        {/* Table sa pagtawag sa data gikan sa server */}
        <div>
  <ChedClientsNormalTable
    currentItems={currentItems}
    searchQueryID={searchQueryID}
    searchQueryName={searchQueryName}
    selectedFilter={selectedFilter}
    selectedInstitutionTypeFilter={selectedInstitutionTypeFilter}
    handleDeleteClick={handleDeleteClick}
    handleInfoClick={handleInfoClick}
    handleToggleInstitutionTypeFilterDropdown={handleToggleInstitutionTypeFilterDropdown}
    handleToggleClientTypeFilterDropdown={handleToggleClientTypeFilterDropdown}
    handleSelectFilter={handleSelectFilter}
    handleSelectInstitutionTypeFilter={handleSelectInstitutionTypeFilter}
    showClientTypeFilterDropdown={showClientTypeFilterDropdown}
    showInstitutionTypeFilterDropdown={showInstitutionTypeFilterDropdown}
  />
</div>
    
    </div>

     {/* Pagination */}
    <div className="flex justify-between mt-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
  >
    Previous
  </button>
  <span>{`Page ${currentPage}`}</span>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={indexOfLastItem >= clients.length}
    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
  >
    Next
  </button>
</div>

      {/* Info modal(MORE DETAILS) */}
      {isInfoModalOpen && selectedRowData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>

            <div>

               <thead>
                <tr className="bg-gray-200">
                
                <th className="px-4 py-2">Institution ID</th>
                <th className="px-4 py-2">Name of Institution</th>
                <th className="px-4 py-2">Filing Category</th>
                <th className="px-4 py-2">File</th>
                <th className="px-4 py-2">Contact Person</th>
                <th className="px-4 py-2">Contact Number</th>
                </tr>
               </thead>

              <tbody>
              <tr>
               
               <td className="border px-4 py-2 text-center">{selectedRowData.inst_id}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.inst_name}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.filing_category}</td>
               <td className="border px-4 py-2 text-center">*file*</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.contact_person}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.contact_number}</td>
               </tr>
              </tbody>

            </div>

            <button
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => setInfoModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}


    </div>
  );
}
