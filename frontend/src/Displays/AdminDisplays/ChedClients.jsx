import { useState, useEffect } from "react";
import axios from "axios";
import ChedClientsAdminAddForm from "./ChedClientsAdminDisplayComponent/ChedClientsAdminAddForm";
import ChedClientsAdminTable from "./ChedClientsAdminDisplayComponent/ChedClientsAdminTable";
import ChedClientsAdminEditForm from "./ChedClientsAdminDisplayComponent/ChedClientsAdminEditForm";
import ChedClientsAdminShowInstitutions from "./ChedClientsAdminDisplayComponent/ChedClientsAdminShowInstitutions";
import ChedClientsAdminMoreDetails from "./ChedClientsAdminDisplayComponent/ChedClientsAdminMoreDetails";
import ChedClientsAdminPagination from "./ChedClientsAdminDisplayComponent/ChedClientsAdminPagination";

export default function ChedClients() {
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
      console.log("Clients-This is the User_ID: " + userID);
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

const handleCloseEditForm = () => {
  setShowEditForm(false);
};

  //====Edit====//
  

    

  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const[showInstitutionList, setShowInstitutionListButton]= useState(true);
 

  // // for search for filter
  // const [searchQueryID, setSearchQueryID] = useState("");
  // const [searchQueryName, setSearchQueryName] = useState("");

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;
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

  const getMaxSeqNo = () => {
    if (clients.length === 0) {
      return 1;
    }
    const maxSeqNo = Math.max(...clients.map((client) => client.seq_no));
    return maxSeqNo + 1;
  };

  // all data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
//   // sa pang search filter sa client_ID
//   const handleSearchIDChange = (e) => {
//     setSearchQueryID(e.target.value);
//   };
//  // sa pang search filter sa inst_Name
//   const handleSearchNameChange = (e) => {
//     setSearchQueryName(e.target.value);
//   };

  const handleAddClientClick = () => {
    setShowForm(true);
    setShowInstitutionListButton(false);
    setFormData((prevData) => ({
      ...prevData,
    }));
  };

  const handleHideFormClick = () => {
    setShowForm(false);
    setShowInstitutionListButton(true);
  };

  const handleClearFormClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      clientID: "Client2024000",
      institutionName: "",
      address: "",
      clientType: "",
      email: "",
      contactPerson: "",
      contactNumber: "",
      userID: prevData.userID,
    }));
  };


  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("Are you sure you want to add this client?");

    if (!userConfirmed) {
        // User clicked 'Cancel' in the confirmation dialog
        alert("Client not added.");
        return;
    }

    try {
        const seq_no = getMaxSeqNo();

        const response = await axios.post("http://localhost:8081/addClient", {
            seq_no: seq_no,
            clientID: formData.clientID,
            clientName: formData.clientName,
            address: formData.address,
            clientType: formData.clientType,
            email: formData.email,
            contactPerson: formData.contactPerson,
            contactNumber: formData.contactNumber,
            userID: formData.userID,
        });

        if (response.data.Status === "Success") {
            alert("Client added successfully!");
            setFormData({
                clientID: "Client2024000",
                clientName: "",
                address: "",
                clientType: "",
                email: "",
                contactPerson: "",
                contactNumber: "",
                userID: formData.userID,
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


  const handleDeleteClick = async (id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
  
    if (confirmDelete) {
      try {
        // Fetch user information (replace this with your actual method of getting user info)
        const userResponse = await axios.get("http://localhost:8081"); 
        const { User_ID, First_Name, Last_Name } = userResponse.data;
  
        const deleteResponse = await axios.delete(`http://localhost:8081/deleteClient/${id}`, {
          headers: {
            // Pass user information in headers
            User_ID: User_ID,
            First_Name: First_Name,
            Last_Name: Last_Name,
          },
        });
  
        console.log("delete function call user_id and name: " + User_ID, First_Name, Last_Name);
  
        if (deleteResponse.data.Status === "Success") {
          alert("Client deleted successfully!");
          fetchClients(); // Refresh the client list
        } else {
          alert("Error deleting client. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the client (frontend).");
      }
    }
  };


  return (
    <div className="w-screen h-auto mt-2 p-2 ml-4">
      <h1 className="font-semibold text-2xl mb-4">CHED CLIENTS</h1>


     <div className="flex-row gap-2">
      {/* The add form */}
      <ChedClientsAdminAddForm
        formData={formData}
        handleSubmit={handleSubmit}
        showForm={showForm}
        handleAddClientClick={handleAddClientClick}
        handleHideFormClick={handleHideFormClick}
        handleClearFormClick={handleClearFormClick}
        handleChange={handleChange}
        // handleFileChange={handleFileChange}
      />
  
     {/* Show Institution list */}
      </div>
      {showInstitutionList &&(
      <ChedClientsAdminShowInstitutions
      clients={clients} /> )}
      


      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md h-78">
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
  <ChedClientsAdminTable
    currentItems={currentItems}
    // searchQueryID={searchQueryID}
    // searchQueryName={searchQueryName}
    handleDeleteClick={handleDeleteClick}
    handleInfoClick={handleInfoClick}
  handleEditClick={handleEditClick}
  />
</div>


  {/* Edit Modal Form */}
     {showEditForm && (
    <ChedClientsAdminEditForm
      editFormData={editFormData}
      handleEditSubmit={handleEditSubmit}
      handleCloseEditForm={handleCloseEditForm}
      handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
      // handleFileChange={(e) =>setEditFormData({ ...editFormData, file: e.target.files[0] })  }  
    />
  )}  

    
    </div>

     {/* Pagination */}
     <ChedClientsAdminPagination
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  itemsPerPage={itemsPerPage}
  totalItems={clients.length}
/>

      {/* Info modal(MORE DETAILS) */}
<ChedClientsAdminMoreDetails 
  isInfoModalOpen={isInfoModalOpen}
  setInfoModalOpen={setInfoModalOpen}
  selectedRowData={selectedRowData}
/>




    </div>
  );
}
