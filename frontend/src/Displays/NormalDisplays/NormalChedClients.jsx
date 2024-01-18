import { useState, useEffect } from "react";
import axios from "axios";
import ChedClientsNormalTable from "./ChedClientsNormalDisplayComponent/ChedClientsNormalTable";
import ChedClientsNormalEditForm from "./ChedClientsNormalDisplayComponent/ChedClientsNormalEditForm";
import ChedClientsNormalPagination from "./ChedClientsNormalDisplayComponent/ChedClientsNormalPagination";
import ChedClientsNormalMoreDetails from "./ChedClientsNormalDisplayComponent/ChedClientsNormalMoreDetails";


export default function NormalChedClients() {
  const [formData, setFormData] = useState({
    clientID: "Client2024000",
    clientName: "",
    address: "",
    clientType: "",
    email: "",
    contactPerson: "", 
    contactNumber: "", 
    userID: "",
  });
  console.log("the formData " + JSON.stringify(formData));

 // to fetch user_ID
 useEffect(() => {
  axios
    .get("http://localhost:8081")
    .then((res) => {
      const userID = res.data.User_ID;
      console.log("Institutions-This is the User_ID: " + userID);
      // Set the userID in the state
      setFormData((prevData) => ({ ...prevData, userID }));
    })
    .catch((error) => {
      console.error("Error fetching User_ID:", error);
    });
}, []);

  //===== Edit =====//
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    clientName: "",
    address: "",
    clientType: "",   
    email: "",
    // filingCat: "",
    contactPerson: "",
    contactNumber: "",
    // file: null,
  }); console.log("the EditformData " + JSON.stringify(editFormData));


  const handleEditClick = (client_id) => {
    const selectedRow = clients.find((client) => client.client_id === client_id);
    if (selectedRow) {
      console.log("Selected Row Data to edit:", selectedRow);
      setEditFormData({
        ...selectedRow,
        // file: selectedRow.file ? new File([], selectedRow.file.name) : null,
      });
      setShowEditForm(true);
    }
  };
  
  
 // the "save form function of edit modal"

 const handleEditSubmit = async (e) => {
  e.preventDefault();
  const userConfirmed = window.confirm("Are you sure you want to save changes?");

  if (!userConfirmed) {
    // User clicked 'Cancel' in the confirmation dialog
    alert("Changes not saved.");
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost:8081/updateClient/${editFormData.client_id}`,
      {
        client_id: editFormData.client_id,
        client_name: editFormData.client_name,
        address: editFormData.address,
        email: editFormData.email,
        client_type_id: editFormData.client_type_id,
        contact_person: editFormData.contact_person,
        contact_number: editFormData.contact_number,
      }
    );

    if (response.data.Status === "Success") {
      alert("Client edited successfully!");
      setShowEditForm(false);
      fetchClients(); // Refresh the client list
    } else {
      alert("Error editing client. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while editing the client.");
  }
};

  //====Edit====//
  

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };
    


  const [clients, setClients] = useState([]);

  // const[showInstitutionList, setShowInstitutionListButton]= useState(true);  sa admin ra ni
 

  // // for search for filter
  // const [searchQueryID, setSearchQueryID] = useState("");
  // const [searchQueryName, setSearchQueryName] = useState("");

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  // for info or more details
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);




  const handleInfoClick = (client_id) => {
    // Find the selected row data based on the client_id
    const selectedRow = clients.find((client) => client.client_id === client_id);
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
      console.log(response.data); //  line to check the fetched data
      const sortedClients = response.data.sort();
      setClients(sortedClients);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching clients(client side).");
    }
  };


  
//   // sa pang search filter sa inst_ID
//   const handleSearchIDChange = (e) => {
//     setSearchQueryID(e.target.value);
//   };
//  // sa pang search filter sa inst_Name
//   const handleSearchNameChange = (e) => {
//     setSearchQueryName(e.target.value);
//   };

  

  return (
    <div className="w-screen h-screen mt-2 p-2 ml-4">
      <h1 className="font-semibold text-2xl mb-4">CHED CLIENTS</h1>



      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">List of CHED Clients</h2>

        {/* Search bar for filter by Institution ID or Name */}
        {/* <div className="mb-4">
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
        </div> */}

        


        {/* Table sa pagtawag sa data gikan sa server */}
        <div>
  <ChedClientsNormalTable
    currentItems={currentItems}
    // searchQueryID={searchQueryID}
    // searchQueryName={searchQueryName}
    handleInfoClick={handleInfoClick}
  handleEditClick={handleEditClick}
  />
</div>


{/* Edit Modal Form */}
        {showEditForm && (
    <ChedClientsNormalEditForm
      editFormData={editFormData}
      handleEditSubmit={handleEditSubmit}
      handleCloseEditForm={handleCloseEditForm}
      handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
      handleFileChange={(e) =>setEditFormData({ ...editFormData, file: e.target.files[0] })  }  
    />
  )}  

    
    </div>

     {/* Pagination */}
     <ChedClientsNormalPagination
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  itemsPerPage={itemsPerPage}
  totalItems={clients.length}
/>

      {/* Info modal(MORE DETAILS) */}
<ChedClientsNormalMoreDetails 
  isInfoModalOpen={isInfoModalOpen}
  setInfoModalOpen={setInfoModalOpen}
  selectedRowData={selectedRowData}
/>




    </div>
  );
}
