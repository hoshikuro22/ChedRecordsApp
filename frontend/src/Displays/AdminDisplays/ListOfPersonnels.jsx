import { useState, useEffect } from "react";
import axios from "axios";
import PersonnelAddForm from "./ListOfPersonnelDisplaysComponents/PersonnelAddForm";
import PersonnelTable from "./ListOfPersonnelDisplaysComponents/PersonnelTable";
import PersonnelPagination from "./ListOfPersonnelDisplaysComponents/PersonnelPagination";
import PersonnelEditForm from "./ListOfPersonnelDisplaysComponents/PersonnelEditForm";



export default function ListOfPersonnels() {
  const [formData, setFormData] = useState({
    unit: "",
    firstName: "",
    lastName: "",
    position: "",
    birthDate: "",
    email: "",
    contactNumber: "",
  });


  //===== Edit =====//
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    unit: "",
    firstName: "",
    lastName: "",
    position: "",
    birthDate: "",
    email: "",
    contactNumber: "",
  }); console.log("the EditformData " + JSON.stringify(editFormData));


  const handleEditClick = (Personnel_ID) => {
    const selectedRow = personnels.find((personnel) => personnel.Personnel_ID === Personnel_ID);
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
      `http://localhost:8081/updatePersonnel/${editFormData.personnel_id}`,
      {
        personnel_id: editFormData.personnel_id,
        unit_ID: editFormData.unit_ID,
        last_name: editFormData.last_name,
        first_name: editFormData.first_name,
        position: editFormData.position,
        birth_date: editFormData.birth_date,
        email: editFormData.email,
        contact_number: editFormData.contact_number,
      }
    );

    if (response.data.Status === "Success") {
      alert("Personnel edited successfully!");
      setShowEditForm(false);
      fetchPersonnels(); // Refresh the personnels list
    } else {
      alert("Error editing personnel. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while editing the personnel.");
  }
};


const handleCloseEditForm = () => {
  setShowEditForm(false);
};


  //====Edit====//
  

 
  
  const [personnels, setPersonnels] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;
 

  // function to get personnels
  useEffect(() => {
    fetchPersonnels();
  }, []);

  const fetchPersonnels = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getPersonnels");
      console.log(response.data); //  line to check the fetched data
      const sortedPersonnels = response.data.sort();
      setPersonnels(sortedPersonnels);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching personnels.");
    }
  };

     // to fetch units for the add and edit form
     const [unitOptions, setUnitOptions] = useState([]);

     useEffect(() => {
    const fetchUnitData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getUnits");
        setUnitOptions(response.data);
        console.log("the units " + JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching units data:", error);
      }
    }; fetchUnitData(); }, []);

  const getMaxPersonnelID = () => {
    if (personnels.length === 0) {
      return 1;
    }
    const maxPersonnelID = Math.max(...personnels.map((personnel) => parseInt(personnel.Personnel_ID)));
    return maxPersonnelID + 1;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddPersonnelClick = () => {
    setShowForm(true);
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleClearFormClick = () => {
    setFormData({
    unit: "",  
    firstName: "",
    lastName: "",
    position: "",
    birthDate: "",
    email: "",
    contactNumber: "",

    });
  };


  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ask for confirmation before submitting
    const isConfirmed = window.confirm("Are you sure you want to add this personnel?");
  
    if (!isConfirmed) {
      return; // Do nothing if not confirmed
    }
    if (formData.contactNumber && formData.contactNumber.length !== 11) {
      alert("Contact number must be 11 digits");
     return; // Do not proceed with submission
    }
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!emailRegex.test(formData.email)) {
    //   alert("Email must be in a valid format, and end with .com");
    //   return; // Do not proceed with submission
    // }
       // Validate email
       if (formData.email && !formData.email.includes('.com')) {
        alert("Email must contain .com");
        return; // Do not proceed with submission
      }
        
  
    try {
      const personnelID = getMaxPersonnelID();
      const response = await axios.post("http://localhost:8081/addPersonnel", {
        ...formData,
        personnelID,
      });
  
      if (response.data.Status === "Success") {
        alert("Personnel added successfully!");
        setFormData({
          unit: "",
          firstName: "",
          lastName: "",
          position: "",
          birthDate: "",
          email: "",
          contactNumber: "",
        });
        fetchPersonnels();
        setShowForm(false);
      } else {
        alert("Error adding personnel. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the personnel.");
    }
  };



  const handleDeleteClick = async (id) => {
  // Show a confirmation dialog
  const confirmDelete = window.confirm("Are you sure you want to delete this client?");

  if (confirmDelete) {
    try {
      const response = await axios.delete(`http://localhost:8081/deletePersonnel/${id}`);
      if (response.data.Status === "Success") {
        alert("Personnel deleted successfully!");
        fetchPersonnels(); // Refresh the document list
      } else {
        alert("Error deleting personnel. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the personnel.");
    }
  }
};


  return (
    <div className="w-screen h-auto mt-2 p-4 ml-1">
 
      {/* Add Form */}
     <PersonnelAddForm
      formData={formData}
      showForm={showForm}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleHideFormClick={handleHideFormClick}
      handleClearFormClick={handleClearFormClick}
      handleAddPersonnelClick={handleAddPersonnelClick}
      unitOptions={unitOptions}
    />

      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md overflow-auto h-[720px]">
        


        {/* Table sa pagtawag sa data gikan sa server */}
        <PersonnelTable
        personnels={personnels}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage}  
      />

  {/* Edit Modal Form */}
    {showEditForm && (
    <PersonnelEditForm
      editFormData={editFormData}
      handleEditSubmit={handleEditSubmit}
      handleCloseEditForm={handleCloseEditForm}
      handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
      unitOptions={unitOptions}
    />
  )}  
       

      </div>
        {/* PAGINATION */}
        <PersonnelPagination
         
          currentPage={currentPage}
          itemsPerPage={itemsPerPage} 
          totalItems={personnels.length}
          setCurrentPage={setCurrentPage}
          onPageChange={setCurrentPage}
        />
    </div>
  );
}
