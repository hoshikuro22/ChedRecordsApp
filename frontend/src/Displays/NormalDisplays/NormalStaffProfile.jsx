import { useState, useEffect } from "react";

import ProfileNormalStaffEditForm from "./ProfileNormalStaffDisplayComponent/ProfileNormalStaffEditForm";
import { makeRequest } from "../../../axios";

export default function NormalStaffProfile() {
  const [userData, setUserData] = useState({
    User_ID: "",
    User_type_ID: "",
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Username: "",
    Contact_Number: "",
  });

  // Fetch user data
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await makeRequest.get("/");
      setUserData({
        User_ID: response.data.User_ID,
        User_type_ID: response.data.User_type_ID,
        First_Name: response.data.First_Name,
        Last_Name: response.data.Last_Name,
        Email: response.data.Email,
        Password: response.data.Password,
        Contact_Number: response.data.Contact_Number,
        Username: response.data.Username,
      });
      console.log("the response " + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setEditFormData(userData); // Set edit form data to current user data
    setNewPassword(""); // Reset newPassword when opening the modal
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Functions for handling edit form
  const [newPassword, setNewPassword] = useState("");
  const [editFormData, setEditFormData] = useState({
    User_ID: "",
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Username: "",
    Contact_Number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "NewPassword") {
      setNewPassword(value);
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Confirmation dialog
    if (window.confirm("Are you sure you want to save these changes?")) {
      try {
        const response = await makeRequest.put("/updateProfile", {
          ...editFormData,
          NewPassword: newPassword, // Include the new password
        });
        console.log(response.data);
        closeModal(); // Close the modal after successful update
        const updatedUser = response.data.UpdatedUser;
        setUserData(updatedUser); // Update user data with the received updated data
        alert("Profile edited successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        // Handle error here
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg overflow-hidden shadow-md w-full max-w-md">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-3xl font-semibold flex justify-center">
            User Profile
          </h2>
        </div>
        <table className="w-full">
          <tbody>
            {/* <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">User ID:</td>
            <td className="border px-4 py-2">{userData.User_ID}</td>
          </tr>
  
          <tr>
            <td className="border px-4 py-2 font-semibold">User Type ID:</td>
            <td className="border px-4 py-2">{userData.User_type_ID}</td>
          </tr> */}

            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">First Name:</td>
              <td className="border px-4 py-2">{userData.First_Name}</td>
            </tr>

            <tr>
              <td className="border px-4 py-2 font-semibold">Last Name:</td>
              <td className="border px-4 py-2">{userData.Last_Name}</td>
            </tr>

            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Email:</td>
              <td className="border px-4 py-2">{userData.Email}</td>
            </tr>

            <tr>
              <td className="border px-4 py-2 font-semibold">Mobile Number:</td>
              <td className="border px-4 py-2">{userData.Contact_Number}</td>
            </tr>

            <tr>
              <td className="border px-4 py-2 font-semibold">Username:</td>
              <td className="border px-4 py-2">{userData.Username}</td>
            </tr>

            <tr>
              <td className="border px-4 py-2 font-semibold">Password:</td>
              <td className="border px-4 py-2">*</td>
            </tr>
          </tbody>
        </table>
        <div className="p-4">
          <button
            onClick={openModal}
            className="w-full bg-blue-500 text-white font-bold rounded py-2 cursor-pointer"
          >
            EDIT
          </button>
          {isModalOpen && (
            <ProfileNormalStaffEditForm
              editFormData={editFormData}
              handleEditSubmit={handleEditSubmit}
              closeModal={closeModal}
              handleChange={handleChange}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
}
