import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileAdminEditForm from './ProfileAdminDisplayComponent/ProfileAdminEditForm';

export default function Profile() {
  const [userData, setUserData] = useState({
    User_ID: '',
    User_type_ID: '',
    First_Name: '',
    Last_Name: '',
    Email: '',
    Password: '',
  });

  // Fetch user data
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8081");
      setUserData({
        User_ID: response.data.User_ID,
        User_type_ID: response.data.User_type_ID,
        First_Name: response.data.First_Name,
        Last_Name: response.data.Last_Name,
        Email: response.data.Email,
        Password: response.data.Password,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setEditFormData(userData);  // Set edit form data to current user data
    setIsModalOpen(true);
  };
  
  const closeModal = () => setIsModalOpen(false);

  // Functions for handling edit form
  const [editFormData, setEditFormData] = useState({
    User_ID: '',
    First_Name: '',
    Last_Name: '',
    Email: '',
    Password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Confirmation dialog
    if (window.confirm("Are you sure you want to save these changes?")) {
      try {
        const response = await axios.put('http://localhost:8081/updateUser', editFormData);
        console.log(response.data);
        closeModal(); // Close the modal after successful update
        const updatedUser = response.data.UpdatedUser;
        setUserData(updatedUser); // Update user data with the received updated data
        alert("Profile edited successfully!");
      } catch (error) {
        console.error('Error updating user:', error);
        // Handle error here
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      <h2 className="text-3xl font-semibold mb-4 text-blue-600">User Profile</h2>
      <div className="w-auto max-w-md bg-white rounded-lg ">
      <table className="">
        <tbody>
          <tr className="bg-gray-100 ">
            <td className="border px-4 py-2 font-semibold ">User ID:</td>
            <td className="border px-4 py-2">{userData.User_ID}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">User Type ID:</td>
            <td className="border px-4 py-2">{userData.User_type_ID}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Email:</td>
            <td className="border px-4 py-2">{userData.Email}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Password:</td>
            <td className="border px-4 py-2">{userData.Password}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">First Name:</td>
            <td className="border px-4 py-2">{userData.First_Name}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Last Name:</td>
            <td className="border px-4 py-2">{userData.Last_Name}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <button onClick={openModal} className="w-20 mt-4 p-2 bg-blue-500 text-white font-bold rounded cursor-pointer">
        EDIT
      </button>
      {isModalOpen && (
        <ProfileAdminEditForm
          editFormData={editFormData}
          handleEditSubmit={handleEditSubmit}
          closeModal={closeModal}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
