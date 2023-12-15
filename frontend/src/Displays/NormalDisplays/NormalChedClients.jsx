import { useState, useEffect } from "react";
import axios from "axios";
import ChedClientsNormalAddForm from "./ChedClientsNormalDisplayComponent/ChedClientsNormalAddForm";
import ChedClientsNormalTable from "./ChedClientsNormalDisplayComponent/ChedClientsNormalTable";
import ChedClientsNormalEditForm from "./ChedClientsNormalDisplayComponent/ChedClientsNormalEditForm";
import ChedClientsNormalPagination from "./ChedClientsNormalDisplayComponent/ChedClientsNormalPagination";
import ChedClientsNormalMoreDetails from "./ChedClientsNormalDisplayComponent/ChedClientsNormalMoreDetails";


export default function NormalChedClients() {
  const [formData, setFormData] = useState({
    institutionID: "",
    institutionName: "",
    institutionType: "",
    address: "",
    clientType: "",
    filingCat: "",
    contactPerson: "", 
    contactNumber: "", 
    file: null,
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
    institutionName: "",
    inst_type_id: "",
    address: "",
    clientType: "",   
    filingCat: "",
    contactPerson: "",
    contactNumber: "",
    file: null,
  }); console.log("the EditformData " + JSON.stringify(editFormData));


  const handleEditClick = (inst_id) => {
    const selectedRow = clients.find((client) => client.inst_id === inst_id);
    if (selectedRow) {
      console.log("Selected Row Data to edit:", selectedRow);
      setEditFormData({
        ...selectedRow,
        file: selectedRow.file ? new File([], selectedRow.file.name) : null,
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
      // Create a new FormData object
      const formDataToSend = new FormData();

      // Append the non-file data to formDataToSend
      formDataToSend.append("inst_id", editFormData.inst_id);
      formDataToSend.append("inst_name", editFormData.inst_name);
      formDataToSend.append("inst_type_id", editFormData.inst_type_id);
      formDataToSend.append("address", editFormData.address);
      formDataToSend.append("client_type_id", editFormData.client_type_id);
      formDataToSend.append("fil_cat_id", editFormData.fil_cat_id);
      formDataToSend.append("contact_person", editFormData.contact_person);
      formDataToSend.append("contact_number", editFormData.contact_number);

      // Append the file if it exists
      if (editFormData.file) {
        formDataToSend.append("file", editFormData.file);
      }

      // Make the API call to update the client details
      const response = await axios.put(
        `http://localhost:8081/updateClient/${editFormData.inst_id}`,
        formDataToSend
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
  const [showForm, setShowForm] = useState(false);

  // const[showInstitutionList, setShowInstitutionListButton]= useState(true);  sa admin ra ni
 

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
// for file in the add form only
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: selectedFile,
    }));
  };
  
  // sa pang search filter sa inst_ID
  const handleSearchIDChange = (e) => {
    setSearchQueryID(e.target.value);
  };
 // sa pang search filter sa inst_Name
  const handleSearchNameChange = (e) => {
    setSearchQueryName(e.target.value);
  };

  const handleAddClientClick = () => {
    setShowForm(true);
    // setShowInstitutionListButton(false);
    setFormData((prevData) => ({
      ...prevData,
    }));
  };                        

  const handleHideFormClick = () => {
    setShowForm(false);
    // setShowInstitutionListButton(true);
  };

  const handleClearFormClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      institutionID: "",
      institutionName: "",
      institutionType: "",
      address: "",
      clientType: "",
      contactPerson: "",
      contactNumber: "",
      file: null,
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
  
      const formDataToSend = new FormData();
      formDataToSend.append("seq_no", seq_no);
      formDataToSend.append("institutionID", formData.institutionID);
      formDataToSend.append("institutionName", formData.institutionName);
      formDataToSend.append("institutionType", formData.institutionType);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("clientType", formData.clientType);
      formDataToSend.append("filingCat", formData.filingCat);
      formDataToSend.append("contactPerson", formData.contactPerson);
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("file", formData.file); 
      formDataToSend.append("userID", formData.userID);
  
      const response = await axios.post("http://localhost:8081/addClient", formDataToSend);
  
      if (response.data.Status === "Success") {
        alert("Client added successfully!");
        setFormData((prevData) => ({
          ...prevData,
          institutionID: "",
          institutionName: "",
          institutionType: "",
          address: "",
          clientType: "",
          filingCat: "",
          contactPerson: "",
          contactNumber: "",
          file: null, // Clear the file data
          userID: prevData.userID,
        }));
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
  

  //admin ra maka delete
  // const handleDeleteClick = async (id) => {
  //   // Show a confirmation dialog
  //   const confirmDelete = window.confirm("Are you sure you want to delete this client?");
  
  //   if (confirmDelete) {
  //     try {
  //       // Fetch user information (replace this with your actual method of getting user info)
  //       const userResponse = await axios.get("http://localhost:8081"); 
  //       const { User_ID, First_Name, Last_Name } = userResponse.data;
  
  //       const deleteResponse = await axios.delete(`http://localhost:8081/deleteClient/${id}`, {
  //         headers: {
  //           // Pass user information in headers
  //           User_ID: User_ID,
  //           First_Name: First_Name,
  //           Last_Name: Last_Name,
  //         },
  //       });
  
  //       console.log("delete function call user_id and name: " + User_ID, First_Name, Last_Name);
  
  //       if (deleteResponse.data.Status === "Success") {
  //         alert("Client deleted successfully!");
  //         fetchClients(); // Refresh the client list
  //       } else {
  //         alert("Error deleting client. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred while deleting the client (frontend).");
  //     }
  //   }
  // };


  return (
    <div className="w-screen h-screen mt-2 p-2 ml-4">
      <h1 className="font-semibold text-2xl mb-4">CHED CLIENTS</h1>


     <div className="flex-row gap-2">
      {/* The add form */}
      <ChedClientsNormalAddForm
        formData={formData}
        handleSubmit={handleSubmit}
        showForm={showForm}
        handleAddClientClick={handleAddClientClick}
        handleHideFormClick={handleHideFormClick}
        handleClearFormClick={handleClearFormClick}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
      />
  
      </div>
   
      


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
    // handleDeleteClick={handleDeleteClick}
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
