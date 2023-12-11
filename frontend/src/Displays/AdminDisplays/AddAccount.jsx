import { useState, useEffect } from "react";
import axios from "axios";


export default function AddAccount() {
  const [formData, setFormData] = useState({
    userType: "",
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    contactNumber: "",
  });

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

      {showForm ? (
        <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Add New Account</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">First Name</label>
              <input
                required
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Last Name</label>
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Email</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Password</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">User Type</label>
              <select
                required
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select User Type</option>
                <option value="0">Admin</option>
                <option value="1">Normal</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold"> ConfirmPassword</label>
              <input
                required
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Contact Number</label>
              <input
                required
                type="text"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          
           

            <div className="col-span-2 ml-auto gap-">
              <button
                type="submit"
                className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Account
              </button>
              <button
                type="button"
                onClick={handleHideFormClick}
                className="w-40 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
              >
                Hide Form
              </button>
              <button
                type="button"
                onClick={handleClearFormClick}
                className="w-40 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Clear Form
              </button>
            </div>
          </form>
          
        </div>
      ) : (
        <button
          onClick={handleAddClientClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2"
        >
          Add New Account
        </button>
      )}

      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">List of ACCOUNTS</h2>

        {/* Table sa pagtawag sa data gikan sa server */}
        <table className="table-auto w-full border-collapse border">
  <thead>
    <tr className="bg-gray-200">
      <th className="px-4 py-2">User ID</th>
      <th className="px-4 py-2">User Type</th>
      <th className="px-4 py-2">Last Name</th>
      <th className="px-4 py-2">First Name</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Password</th>
      <th className="px-4 py-2">Contact Number</th>
      <th className="px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.user_ID}>
        <td className="border px-4 py-2">{user.user_ID}</td>
        <td className="border px-4 py-2">{user.user_type}</td>
        <td className="border px-4 py-2">{user.last_name}</td>
        <td className="border px-4 py-2">{user.first_name}</td>
        <td className="border px-4 py-2">{user.email}</td>
        <td className="border px-4 py-2">{user.password}</td>
        <td className="border px-4 py-2">{user.contact_number}</td>
        <td className="border px-4 py-2">
          <button
            // ang pk sa ChedClients / Institution is "id"
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            // ang pk sa ChedClients / Institution is "id"
            className="text-red-500 hover:underline ml-2"
            onClick={() => handleDeleteClick(user.user_ID)}
          >
            Delete
          </button>
          <button
          className="text-gray-500 hover:underline ml-2"
          // Handle edit logic here
        >
          Info
        </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      </div>
    </div>
  );
}
