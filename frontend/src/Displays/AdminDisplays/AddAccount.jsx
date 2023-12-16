import { useState, useEffect } from "react";
import axios from "axios";
import AddAccountAdminAddForm from "./AddAccountAdminDisplayComponent/AddAccountAdminAddForm";
import AddAccountAdminTable from "./AddAccountAdminDisplayComponent/AddAccountAdminTable";
import AddAccountAdminEditForm from "./AddAccountAdminDisplayComponent/AddAccountAdminEditForm";


export default function AddAccount() {
  const [formData, setFormData] = useState({
    userType: "",
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    contactNumber: "",
  }); console.log("the Add FormData " + JSON.stringify(formData));

  const [editFormData, setEditFormData] = useState({
    userType: "",
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    contactNumber: "",
  }); console.log("the EditformData " + JSON.stringify(editFormData));

 // ---- EDIT ----- //
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (editFormData.password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8081/updateUser/${editFormData.user_ID}`,
        {
          ...editFormData,
        }
      );

      if (response.data.Status === "Success") {
        alert("User updated successfully!");
        setEditFormData({
          userType: "",
          email: "",
          password: "",
          lastName: "",
          firstName: "",
          contactNumber: "",
        });
        setConfirmPassword(""); // Clear confirm password field
        fetchUsers();
        setShowEditModal(false);
      } else {
        alert("Error updating user. Please check the inputs and try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the user.");
    }
  };

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditClick = (user_ID) => {
    // Find the user with the matching user_ID
    const selectedUser = users.find((user) => user.user_ID === user_ID);
    console.log("Selected User Data to edit:", selectedUser);
  
    // Set the edit form data with the selected user's data
    setEditFormData(selectedUser);
    // Show the edit modal
    setShowEditModal(true);
  };
  
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getUsers");
      console.log(response.data); // Add this line to check the fetched data
      const sortedUsers = response.data.sort();
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching users.");
    }
  };

  const getMaxUserID = () => {
    if (users.length === 0) {
      return 1;
    }
    const maxUserID = Math.max(...users.map((user) => parseInt(user.user_ID)));
    return maxUserID + 1;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Check if the changed field is the confirmPassword field and update its state
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };
  


  const handleAddClientClick = () => {
    setShowForm(true);
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleClearFormClick = () => {
    setFormData({
      userType: "",
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      contactNumber: "",

    });
  };


  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }
  
    try {
      const userID = getMaxUserID();
     
      const response = await axios.post("http://localhost:8081/addUser", {
        ...formData,
        userID,
      });
      if (response.data.Status === "Success") {
        alert("Account added successfully!");
        setFormData({
          userType: "",
          email: "",
          password: "",
          lastName: "",
          firstName: "",
          contactNumber: "",
        });
        setConfirmPassword(""); // Clear confirm password field
        fetchUsers();
        setShowForm(false);
      } else {
        alert("Error adding client. Please check the inputs and try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the client.");
    }
  };
  




  const handleDeleteClick = async (id) => {
  // Show a confirmation dialog
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");

  if (confirmDelete) {
    try {
      const response = await axios.delete(`http://localhost:8081/deleteUser/${id}`);
      if (response.data.Status === "Success") {
        alert("User deleted successfully!");
        fetchUsers(); // Refresh the document list
      } else {
        alert("Error deleting user. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the user.");
    }
  }
};


  return (
    <div className="w-screen h-screen mt-8 p-4 ml-4">
      <h1 className="font-semibold text-2xl mb-4">ACCOUNTS</h1>

{/* ADD FORM */}
      <AddAccountAdminAddForm
        showForm={showForm}
        formData={formData}
        confirmPassword={confirmPassword}
        handleChange={handleChange}
        handleAddClientClick={handleAddClientClick}
        handleHideFormClick={handleHideFormClick}
        handleClearFormClick={handleClearFormClick}
        handleSubmit={handleSubmit}
      />

      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">List of ACCOUNTS</h2>

        {/* Table sa pagtawag sa data gikan sa server */}
        <AddAccountAdminTable 
        users={users}
         handleDeleteClick={handleDeleteClick}
         handleEditClick={handleEditClick} />

        {/* EDIT FORM */}
        {showEditModal && (
          <AddAccountAdminEditForm
            editFormData={editFormData}
            confirmPassword={confirmPassword}
            handleChange={handleChange}
            handleHideFormClick={() => setShowEditModal(false)} // Hide the modal
            handleClearFormClick={handleClearFormClick}
            handleEditSubmit={handleEditSubmit}
          />
        )}

      </div>
    </div>
  );
}
