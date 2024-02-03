import { useState, useEffect } from "react";

import AddAccountAdminAddForm from "./AddAccountAdminDisplayComponent/AddAccountAdminAddForm";
import AddAccountAdminTable from "./AddAccountAdminDisplayComponent/AddAccountAdminTable";
import AddAccountAdminEditForm from "./AddAccountAdminDisplayComponent/AddAccountAdminEditForm";
import { makeRequest } from "../../../axios";

export default function AddAccount() {
  const [formData, setFormData] = useState({
    userType: "",
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    contactNumber: "",
    userName: "",
  });
  console.log("the Add FormData " + JSON.stringify(formData));

  const [newPassword, setNewPassword] = useState("");
  const [editFormData, setEditFormData] = useState({
    user_type_ID: "",
    email: "",
    password: "",
    last_name: "",
    first_name: "",
    contact_number: "",
    username: "",
    user_ID: "",
  });
  console.log("the EditformData " + JSON.stringify(editFormData));
  const handleEditClick = (user_ID) => {
    // Find the user with the matching user_ID
    setNewPassword("");
    const selectedUser = users.find((user) => user.user_ID === user_ID);
    console.log("Selected User Data to edit:", selectedUser);

    // Set the edit form data with the selected user's data
    setEditFormData(selectedUser);
    // Show the edit modal
    setShowEditModal(true);
  };

  // ---- EDIT ----- //
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Add a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to update this user?"
    );
    if (!isConfirmed) {
      // If the user clicks "Cancel", stop the function
      return;
    }

    try {
      const response = await makeRequest.put(
        `/updateUser/${editFormData.user_ID}`,
        {
          ...editFormData,
          NewPassword: newPassword, // Include the new password
        }
      );

      if (response.data.Status === "Success") {
        alert("User updated successfully!");
        setEditFormData({
          user_type_ID: "",
          email: "",
          password: "",
          last_name: "",
          first_name: "",
          contact_number: "",
          username: "",
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
  ////

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await makeRequest.get("/getUsers");
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

  // submit
  const handleChange = (e) => {
    const { name, value } = e.target;

    let modifiedValue = value;

    // Capitalize the first letter for firstName and lastName
    if (name === "firstName" || name === "lastName") {
      modifiedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: modifiedValue,
    }));

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
      userName: "",
    });
  };

  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== confirmPassword) {
      window.alert("Password and Confirm Password do not match.");
      return;
    }

    // Ask for confirmation before submitting
    if (!window.confirm("Are you sure you want to submit the form?")) {
      return;
    }
    // Validate contact number
    if (formData.contactNumber && formData.contactNumber.length !== 11) {
      alert("Contact number must be 11 digits");
      return; // Do not proceed with submission
    }
    //  // Validate email
    // if (formData.email && !formData.email.includes('.com')) {
    //   alert("Email must contain .com");
    //   return; // Do not proceed with submission
    // }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Email must be in a valid format, and end with .com");
      return; // Do not proceed with submission
    }

    try {
      const userID = getMaxUserID();

      const response = await makeRequest.post("/addUser", {
        ...formData,
        userID,
      });

      if (response.data.Status === "Success") {
        window.alert("Account added successfully!");
        setFormData({
          userType: "",
          email: "",
          password: "",
          lastName: "",
          firstName: "",
          contactNumber: "",
          userName: "",
        });
        setConfirmPassword(""); // Clear confirm password field
        fetchUsers();
        setShowForm(false);
      } else {
        window.alert(
          "Error adding client. Please check the inputs and try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while adding the client.");
    }
  };

  const handleDeleteClick = async (id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      try {
        const response = await makeRequest.delete(`/deleteUser/${id}`);
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
    <div className="h-auto mt-2 p-4">
      <h1 className="font-semibold text-2xl mb-4"></h1>

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

      <div className="border-2 border-black bg-white rounded-lg shadow-md overflow-auto h-[720px]">
        <h2 className="text-xl font-semibold"></h2>

        {/* Table sa pagtawag sa data gikan sa server */}
        <AddAccountAdminTable
          users={users}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
        />

        {/* EDIT FORM */}
        {showEditModal && (
          <AddAccountAdminEditForm
            editFormData={editFormData}
            handleChange={(e) =>
              setEditFormData({
                ...editFormData,
                [e.target.name]: e.target.value,
              })
            }
            handleHideFormClick={() => setShowEditModal(false)} // Hide the modal
            handleClearFormClick={handleClearFormClick}
            handleEditSubmit={handleEditSubmit}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
          />
        )}
      </div>
    </div>
  );
}
