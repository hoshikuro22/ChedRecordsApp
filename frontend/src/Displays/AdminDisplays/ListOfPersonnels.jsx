import { useState, useEffect } from "react";
import axios from "axios";
import PersonnelAddForm from "./ListOfPersonnelDisplaysComponents/PersonnelAddForm";
import PersonnelTable from "./ListOfPersonnelDisplaysComponents/PersonnelTable";
import PersonnelPagination from "./ListOfPersonnelDisplaysComponents/PersonnelPagination";



export default function ListOfPersonnels() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
  });
 
  
  const [personnels, setPersonnels] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 

  useEffect(() => {
    fetchPersonnels();
  }, []);

  const fetchPersonnels = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getPersonnels");
      console.log(response.data); // Add this line to check the fetched data
      const sortedPersonnels = response.data.sort();
      setPersonnels(sortedPersonnels);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching personnels.");
    }
  };

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
      firstName: "",
      lastName: "",
      position: "",

    });
  };


  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const personnelID = getMaxPersonnelID();
      const response = await axios.post("http://localhost:8081/addPersonnel", {
        ...formData,
        personnelID,
      });
      if (response.data.Status === "Success") {
        alert("Personnel added successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          position: "",
        });
        fetchPersonnels();
        setShowForm(false);
      } else {
        alert("Error adding document. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the document.");
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
    <div className="w-screen h-screen mt-8 p-4 ml-4">
      <h1 className="font-semibold text-2xl mb-4">LIST OF PERSONNELS</h1>

 
 {/* Add Form */}
     <PersonnelAddForm
      formData={formData}
      showForm={showForm}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleHideFormClick={handleHideFormClick}
      handleClearFormClick={handleClearFormClick}
      handleAddPersonnelClick={handleAddPersonnelClick}
    />

      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">List of PERSONNELS</h2>


        {/* Table sa pagtawag sa data gikan sa server */}
        <PersonnelTable
        personnels={personnels}
        handleDeleteClick={handleDeleteClick}
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage}  
/>

        {/* PAGINATION */}
        <PersonnelPagination
         
          currentPage={currentPage}
          itemsPerPage={itemsPerPage} 
          totalItems={personnels.length}
          setCurrentPage={setCurrentPage}
          onPageChange={setCurrentPage}
        />

      </div>
    </div>
  );
}
