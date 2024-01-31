import axios from "axios";
import { useState, useEffect } from "react";
// import ClientTypesAddForm from "./ClientTypesAdminDisplayComponents/ClientTypesAddForm";

import ClientTypesPagination from "./ClientTypesAdminDisplayComponent/ClientTypesPagination";
import ClientTypesTable from "./ClientTypesAdminDisplayComponent/ClientTypesTable";
import ClientTypesEditForm from "./ClientTypesAdminDisplayComponent/ClientTypesEditForm";
import ClientTypesAddForm from "./ClientTypesAdminDisplayComponent/ClientTypesAddForm";


export default function ClientTypes() {
 
  const [formData, setFormData] = useState({
    clientType: "",
    remarks: "",
    
  });
  console.log("the formData " + JSON.stringify(formData));


  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };
  
  //===== Edit =====//
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    clientType: "",
    remarks: "",
  }); console.log("the EditformData " + JSON.stringify(editFormData));


  const handleEditClick = (Client_type_ID) => {
    const selectedRow = clientTypes.find((clientType) => clientType.Client_type_ID === Client_type_ID);
    if (selectedRow) {
      console.log("Selected Row Data to edit:", selectedRow);
      setEditFormData({
        ...selectedRow,
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
      `http://localhost:8081/updateClientType/${editFormData.client_type_id}`,
      {
        client_type_id: editFormData.client_type_id,
        type: editFormData.type,
        remarks: editFormData.remarks,
      }
    );

    if (response.data.Status === "Success") {
      alert("Client Type edited successfully!");
      setShowEditForm(false);
      fetchClientTypes(); // Refresh the client types list
    } else {
      alert("Error editing client types. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while editing the client types.");
  }
};


  

  const [clientTypes, setClientTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);

    // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;

  useEffect(() => {
    fetchClientTypes();
  }, []);

  const fetchClientTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getClientTypes");
      console.log(response.data); // line to check the fetched data
      const sortedClientTypes = response.data.sort();
      setClientTypes(sortedClientTypes);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching client types.");
    }
  };

  const getMaxClientTypeID = () => {
    if (clientTypes.length === 0) {
      return 1;
    }
    const maxClientTypeID = Math.max(...clientTypes.map((clientType) => parseInt(clientType.Client_type_ID)));
    return maxClientTypeID + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddClientTypeClick = () => {
    setShowForm(true);
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleClearFormClick = () => {
    setFormData({
      clientType: "",
      remarks: "",
    });
  };


  // add client type
 const handleSubmit = async (e) => {
  e.preventDefault();

  // Display a confirmation dialog
  const isConfirmed = window.confirm("Are you sure you want to add this client type?");

  if (!isConfirmed) {
    // If the user cancels the confirmation, do nothing
    return;
  }

  try {
    const clientTypeID = getMaxClientTypeID();
    const response = await axios.post("http://localhost:8081/addClientType", {
      ...formData,
      clientTypeID,
    }); 
    if (response.data.Status === "Success") {
      alert("Client type added successfully!");
      setFormData({
        clientType: "",
        remarks: "",
      });
      fetchClientTypes();
      setShowForm(false);
    } else {
      alert("Error adding client type. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the client type.");
  }
};

  // delete client type
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client type?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8081/deleteClientType/${id}`);
        if (response.data.Status === "Success") {
          alert("Client type deleted successfully!");
          fetchClientTypes();
        } else {
          alert("Error deleting client type. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the client type.");
      }
    }
  };

    
  
//   console.log("the formData " + JSON.stringify(formData));
  return (
    <div className="w-screen h-auto mt-2 p-4 ml-1">
    


    <ClientTypesAddForm 
          formData={formData}
          showForm={showForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleHideFormClick={handleHideFormClick}
          handleClearFormClick={handleClearFormClick}
          handleAddClientTypeClick={handleAddClientTypeClick}
        />
    <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md overflow-auto h-[720px]">
      <h2 className="text-xl font-semibold mb-2"></h2>

      <ClientTypesTable
       clientTypes={clientTypes}
       handleDeleteClick={handleDeleteClick}
       handleEditClick={handleEditClick}
       currentPage={currentPage}
         itemsPerPage={itemsPerPage}
      />


{/* Edit Modal Form */}
{showEditForm && (
    <ClientTypesEditForm
    editFormData={editFormData}
    handleEditSubmit={handleEditSubmit}
    handleCloseEditForm={handleCloseEditForm}
    handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
  />
)}  
   

    </div>
    <ClientTypesPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={clientTypes.length}
        setCurrentPage={setCurrentPage}
        onPageChange={setCurrentPage}
      />
  </div>
  )
}
